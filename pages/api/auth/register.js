import connect from 'next-connect';

import { hashPassword } from '@lib/bcrypt';
import { all } from '@utils/middleware';
import { User } from '@utils/models';
import { validateAuth } from '@utils/validations';

const handler = connect();
handler.use(all);

handler.post(async (req, res) => {
  const result = await validateAuth(req.body);
  if (!result.valid) return res.status(400).json(result.errors);

  let user = await User.findOne({ username: req.body.username });
  if (user)
    return res.status(400).json({ username: 'Username is already registered' });

  const password = await hashPassword(req.body.password);
  user = new User({ username: req.body.username, password, new: false });

  await user.save();
  return res.status(201).json('created');
});

export default handler;
