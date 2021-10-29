import connect from 'next-connect';
import _ from 'lodash';

import Validate from '../../../../utils/validations/profile/education';
import Profile from '../../../../utils/models/profile';
import passport from '../../../../utils/startup/passport';
import auth from '../../../../utils/middleware/auth';

export default connect()
  .use(auth)
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const result = Validate(req.body, res);
    if (result === undefined) return;

    const education = _.pick(req.body, [
      'school',
      'degree',
      'fieldofstudy',
      'from',
      'to',
      'current',
      'description',
    ]);
    if (education.current) {
      education.to = null;
    }
    const response = await Profile.findOneAndUpdate(
      { user: req.user._id },
      {
        $push: {
          education,
        },
      },
      { new: true }
    );

    return res.json(response);
  });
