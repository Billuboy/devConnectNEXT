import connect from 'next-connect';

import { db } from '../../../../utils/middleware';
import Profile from '../../../../utils/models/profile';

const handler = connect();
handler.use(db);

handler.get(async (req, res) => {
  const response = await Profile.findOne({
    handle: req.query.handle,
  }).populate('user', ['name']);

  if (!response)
    return res
      .status(404)
      .json({ noProfile: 'There is no profile for this user' });

  return res.json(response);
});

export default handler;
