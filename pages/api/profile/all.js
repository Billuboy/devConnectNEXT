import connect from 'next-connect';

import { db } from '../../../utils/middleware';
import Profile from '../../../utils/models/profile';

const handler = connect();
handler.use(db);

handler.get(async (req, res) => {
  const response = await Profile.find()
    .select({
      _id: 1,
      user: 1,
      handle: 1,
      skills: 1,
      status: 1,
    })
    .populate('user', ['name']);

  if (response.length === 0) return res.json([]);

  return res.json(response);
});

export default handler;
