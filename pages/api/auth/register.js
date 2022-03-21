import bcrypt from 'bcryptjs';
import _ from 'lodash';
import connect from 'next-connect';

import User from '../../../utils/models/user';
import { auth, db } from '../../../utils/middleware';
import Validate from '../../../utils/validations/auth/auth';

const handler = connect();
handler.use(db);

handler.use(auth).post(async (req, res) => {
  const result = Validate(req.body, res);
  if (result === undefined) return;

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .json({ email: 'User with current email is already registered' });

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const response = await user.save();
  return res.json(_.pick(response, ['_id', 'name', 'email']));
});

export default handler;
