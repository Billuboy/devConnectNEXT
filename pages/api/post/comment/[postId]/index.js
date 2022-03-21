import connect from 'next-connect';

import Post from '../../../../../utils/models/post';
import ValidateObjId from '../../../../../utils/validations/objectId';
import Validate from '../../../../../utils/validations/post/post';
import { auth, db } from '../../../../../utils/middleware';
import passport from '../../../../../utils/startup/passport';

const handler = connect();
handler.use(db);

handler
  .use(auth)
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let result = ValidateObjId(req.query.postId, res);
    if (result === undefined) return;

    result = Validate(req.body, res);
    if (result === undefined) return;

    const post = await Post.findById(req.query.postId);
    if (!post) return res.status(404).json({ post: 'No post found' });

    const comment = { text: req.body.text };
    comment.user = req.user._id;
    comment.name = req.user.name;

    post.comments.unshift(comment);
    post.commentCount += 1;

    const response = await post.save();
    return res.json(response);
  });

export default handler;
