import connect from 'next-connect';
import _ from 'lodash';

import Validate from '../../../../utils/validations/experience';
import Profile from '../../../../utils/models/profile';
import passport from '../../../../utils/startup/passport';
import auth from '../../../../utils/middleware/auth';

export default connect()
  .use(auth)
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const result = Validate(req.body, res);
    if (result === undefined) return;

    const experience = _.pick(req.body, [
      'title',
      'company',
      'location',
      'from',
      'to',
      'current',
      'description',
    ]);
    if (experience.current) {
      experience.to = null;
    }

    const response = await Profile.findOneAndUpdate(
      { user: req.user._id },
      {
        $push: {
          experience,
        },
      },
      { new: true }
    );

    return res.json(response);
  });
