import connect from 'next-connect';

import Validate from '../../../../utils/validations/objectId';
import Profile from '../../../../utils/models/profile';
import passport from '../../../../utils/startup/passport';
import auth from '../../../../utils/middleware/auth';

export default connect()
  .use(auth)
  .delete(
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const result = Validate(req.query.eduId, res);
      if (result === undefined) return;

      const profile = await Profile.findOne({ user: req.user._id });
      if (!profile) return res.status(404).json({ error: 'Profile not found' });

      const index = profile.education
        .map(item => item.id)
        .indexOf(req.query.eduId);

      if (index < 0)
        return res
          .status(404)
          .json({ error: "Education data with given ID doesn't exist" });

      profile.education.splice(index, 1);

      const response = await profile.save();
      return res.json(response);
    }
  );
