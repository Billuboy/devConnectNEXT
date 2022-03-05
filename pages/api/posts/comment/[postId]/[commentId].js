import connect from 'next-connect';

import Post from '../../../../../utils/models/post';
import Validate from '../../../../../utils/validations/objectId';
import auth from '../../../../../utils/middleware/auth';
import passport from '../../../../../utils/startup/passport';

export default connect()
  .use(auth)
  .delete(
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      let result = Validate(req.query.postId, res);
      if (result === undefined) return;

      result = Validate(req.query.commentId, res);
      if (result === undefined) return;

      const post = await Post.findById(req.query.postId);
      if (!post) return res.status(404).json({ post: 'No post found' });

      if (String(post.user) !== req.user._id)
        return res.status(401).json({ error: 'Unauthorized user' });

      if (
        post.comments.filter(
          (comment) => String(comment._id) === req.query.commentId
        ).length === 0
      ) {
        return res.status(404).json({ error: 'Comment does not exist' });
      }

      const removeIndex = post.comments
        .map((comment) => comment._id)
        .indexOf(req.query.commentId);

      post.comments.splice(removeIndex, 1);
      post.commentCount -= 1;

      const response = await post.save();
      return res.json(response);
    }
  );
