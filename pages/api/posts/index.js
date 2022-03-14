import connect from 'next-connect';

import { Post, Like, Comment } from '@utils/models';
import { validatePost } from '@utils/validations';
import { all, auth } from '@utils/middleware';

const handler = connect();
handler.use(all);

handler.get(async (req, res) => {
  const posts = await Post.aggregate([
    { $limit: 10 },
    { $project: { text: 1, author: 1, date: 1 } },
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
      $addFields: {
        author: {
          $arrayElemAt: ['$author', 0],
        },
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'post',
        as: 'comment',
        pipeline: [{ $project: { count: 1, _id: 0 } }],
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              $arrayElemAt: ['$comment', 0],
            },
            '$$ROOT',
          ],
        },
      },
    },
    { $project: { comment: 0 } },
  ]);

  // const likes = await Like.aggregate([
  //   // {
  //   //   $addFields: {
  //   //     details: {
  //   //       $arrayToObject: {
  //   //         $map: {
  //   //           input: '$details',
  //   //           as: 'out',
  //   //           in: {
  //   //             k: '$$out.Name',
  //   //             v: '$$out',
  //   //           },
  //   //         },
  //   //       },
  //   //     },
  //   //   },
  //   // },
  //   // { $project: { post: 1, likes: 1 } },
  //   // {
  //   //   $arrayToObject: {
  //   //     $map: {
  //   //       $input: '$ROOT',
  //   //       as: 'likes',
  //   //       in: {
  //   //         k: '$$likes.post',
  //   //         v: '$$likes.likes',
  //   //       },
  //   //     },
  //   //   },
  //   // },
  // ]);

  // if (!posts.length) return res.json({ posts: [] });

  return res.json(posts);
});

handler.use(auth).post(async (req, res) => {
  const result = await validatePost(req.body);
  if (!result.valid) return res.status(400).json(result.errors);

  const newLike = new Like();
  const insertedLike = await newLike.save();

  const post = {
    text: req.body.text,
    like: insertedLike._id,
    author: req.user.id,
  };

  const newPost = new Post(post);
  const insertedPost = await newPost.save();
  const newComment = new Comment({ post: insertedPost._id });
  await newComment.save();
  return res.status(201).send('created');
});

export default handler;
