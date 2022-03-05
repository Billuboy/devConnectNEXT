import connect from 'next-connect';

import Post from '../../../../utils/models/post';
import auth from '../../../../utils/middleware/auth';
import passport from '../../../../utils/startup/passport';
import Validate from '../../../../utils/validations/objectId';

export default connect()
  .use(auth)
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const result = Validate(req.query.postId, res);
    if (result === undefined) return;

    const post = await Post.findById(req.query.postId);

    if (!post) return res.status(404).json({ error: 'No post found' });

    if (
      post.likes.filter((like) => String(like.user) === req.user._id).length > 0
    ) {
      const removeIndex = post.likes
        .map((like) => like.user)
        .indexOf(req.user._id);
      post.likes.splice(removeIndex, 1);
      post.likeCount -= 1;

      const response = await post.save();
      return res.json(response);
    }

    const response = await Post.findByIdAndUpdate(
      req.query.postId,
      {
        $push: {
          likes: { user: req.user._id },
        },
        $inc: {
          likeCount: 1,
        },
      },
      { new: true }
    );

    return res.json(response);
  });
