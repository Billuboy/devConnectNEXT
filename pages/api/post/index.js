import connect from 'next-connect';

import Post from '../../../utils/models/post';
import Validate from '../../../utils/validations/post/post';
import passport from '../../../utils/startup/passport';
import { auth, db } from '../../../utils/middleware';

const handler = connect();
handler.use(db);

handler.get(async (req, res) => {
  const response = await Post.find({})
    .sort({ date: -1 })
    .select({ comments: 0, _v: 0 });

  if (response.length === 0) return res.json([]);

  return res.json(response);
});

handler
  .use(auth)
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const result = Validate(req.body, res);
    if (result === undefined) return;

    const post = { text: req.body.text };
    post.user = req.user._id;
    post.name = req.user.name;

    const newPost = new Post(post);

    const response = await newPost.save();
    return res.json(response);
  });

export default handler;
