import connect from 'next-connect';

import Post from '@utils/models/post';
import Like from '@utils/models/like';
import Comment from '@utils/models/comment';
import auth from '@utils/middleware/auth';
import dbConnect from '@utils/startup/db';
import validate from '@utils/validations/post';

export default connect()
  .get(async (req, res) => {
    await dbConnect();

    // const posts = await Post.aggregate([
    //   { $limit: 10 },
    //   { $project: { text: 1, author: 1, date: 1 } },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'author',
    //       foreignField: '_id',
    //       as: 'author',
    //       pipeline: [
    //         { $project: { displayName: 1, _id: 1 } },
    //       ],
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'comments',
    //       localField: '_id',
    //       foreignField: 'post',
    //       as: 'comment',
    //       pipeline: [
    //         { $project: { count: 1, _id: 0 } },
    //         // { $unwind: '$comments' },
    //       ],
    //     },
    //   },
    //   {
    //     $replaceRoot: {
    //       newRoot: {
    //         $mergeObjects: [
    //           {
    //             $arrayElemAt: ['$comment', 0],
    //           },
    //           '$$ROOT',
    //         ],
    //       },
    //     },
    //   },
    //   { $project: { comment: 0 } },
    // ]);

    const likes = await Like.aggregate([
      // {
      //   $addFields: {
      //     details: {
      //       $arrayToObject: {
      //         $map: {
      //           input: '$details',
      //           as: 'out',
      //           in: {
      //             k: '$$out.Name',
      //             v: '$$out',
      //           },
      //         },
      //       },
      //     },
      //   },
      // },
      // { $project: { post: 1, likes: 1 } },
      // {
      //   $arrayToObject: {
      //     $map: {
      //       $input: '$ROOT',
      //       as: 'likes',
      //       in: {
      //         k: '$$likes.post',
      //         v: '$$likes.likes',
      //       },
      //     },
      //   },
      // },
    ]);

    // if (!posts.length) return res.json({ posts: [] });

    return res.json(likes);
  })
  .use(auth)
  .post(async (req, res) => {
    await dbConnect();

    const result = await validate(req.body);
    if (!result.valid) return res.status(400).json(result.errors);

    const post = { text: req.body.text };
    post.author = req.user.id;

    const newPost = new Post(post);
    const insertedPost = await newPost.save();
    const newComment = new Comment({ post: insertedPost._id });
    await newComment.save();
    return res.status(201).send('created');
  });
