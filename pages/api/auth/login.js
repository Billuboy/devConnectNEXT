import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import connect from 'next-connect';

import { auth, db } from '../../../utils/middleware';
import User from '../../../utils/models/user';

const handler = connect();
handler.use(db);

handler.use(auth).post(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(404)
      .json({ email: "User with given email doesn't exist" });

  const passwordValid = await bcrypt.compare(req.body.password, user.password);

  if (!passwordValid)
    return res.status(400).json({ password: 'Incorrect Combination' });

  var token;
  if (req.body.remMe) {
    token = user.getRemToken();

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
      }),
    );
  } else {
    token = user.getToken();

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      }),
    );
  }

  return res.json({ token });
});

export default handler;
