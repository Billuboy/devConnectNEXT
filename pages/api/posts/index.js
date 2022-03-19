import connect from 'next-connect';
import { Types } from 'mongoose';

import { Post, Like, Comment } from '@utils/models';
import { validatePost } from '@utils/validations';
import { all, auth, postAuth } from '@utils/middleware';

const handler = connect();
handler.use(all);

handler.use(postAuth).get(async (req, res) => {
  const userId = req.user ? new Types.ObjectId(req.user.id) : null;
  const fromDate = req.query.from ? new Date(req.query.from) : new Date();
  const limit = parseInt(req.query.limit, 10);
  const posts = await Post.aggregate([
    { $match: { date: { $lte: fromDate } } },
    { $sort: { date: -1 } },
    { $limit: limit },
    { $project: { title: 1, desc: 1, author: 1, date: 1 } },
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
        pipeline: [{ $project: { displayName: 1, _id: 1 } }],
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'post',
        as: 'comments',
        pipeline: [{ $project: { _id: 0, count: 1 } }],
      },
    },
    {
      $lookup: {
        from: 'likes',
        localField: '_id',
        foreignField: 'post',
        as: 'likes',
        pipeline: [
          {
            $project: {
              _id: 0,
              count: 1,
              isLiked: {
                $in: [userId, '$likes'],
              },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        author: {
          $arrayElemAt: ['$author', 0],
        },
        comments: {
          $arrayElemAt: ['$comments', 0],
        },
        likes: {
          $arrayElemAt: ['$likes', 0],
        },
      },
    },
  ]);
  return res.json(posts);
});

handler.use(auth).post(async (req, res) => {
  const result = await validatePost(req.body);
  if (!result.valid) return res.status(400).json(result.errors);

  const post = {
    title: req.body.title,
    desc: req.body.desc,
    author: req.user.id,
  };

  const newPost = new Post(post);
  const insertedPost = await newPost.save();
  const newLike = new Like({ post: insertedPost._id });
  await newLike.save();
  const newComment = new Comment({ post: insertedPost._id });
  await newComment.save();
  return res.status(201).send('created');
});

export default handler;
