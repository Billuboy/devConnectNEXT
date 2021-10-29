import connect from 'next-connect';

import Post from '../../../utils/models/post';
import Validate from '../../../utils/validations/objectId';
import passport from '../../../utils/startup/passport';
import auth from '../../../utils/middleware/auth';

export default connect()
  .use(auth)
  .get(async (req, res) => {
    const result = Validate(req.query.postId, res);
    if (result === undefined) return;

    const response = await Post.findById(req.query.postId).select({
      _v: 0,
    });

    if (!response)
      return res.status(404).json({ post: 'No post found with given ID' });

    return res.json(response);
  })
  .delete(
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const result = Validate(req.query.postId, res);
      if (result === undefined) return;

      const post = await Post.findById(req.query.postId);
      if (!post)
        return res.status(404).json({ post: 'No post found with given id' });

      if (String(post.user) !== req.user._id)
        return res.status(401).json({ error: 'Unauthorized user' });

      await post.remove();

      return res.json({ deleted: true });
    }
  );
