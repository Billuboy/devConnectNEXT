import connect from 'next-connect';

import auth from '../../../../utils/middleware/auth';
import User from '../../../../utils/models/user';
import Profile from '../../../../utils/models/profile';

export default connect()
  .use(auth)
  .get(async (req, res) => {
    const response = await Profile.findOne({
      handle: req.query.handle,
    }).populate('user', ['name']);

    if (!response)
      return res
        .status(404)
        .json({ noProfile: 'There is no profile for this user' });

    return res.json(response);
  });
