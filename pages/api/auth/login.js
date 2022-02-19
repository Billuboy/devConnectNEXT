import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import connect from 'next-connect';

import auth from '../../../utils/middleware/auth';
import User from '../../../utils/models/user';

export default connect()
  .use(auth)
  .post(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(404)
        .json({ auth: 'Invalid Username/Password Combination' });

    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordValid)
      return res
        .status(400)
        .json({ auth: 'Invalid Username/Password Combination' });

    var token;
    if (req.body.remMe) {
      token = user.getRemToken();

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('session_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600 * 24 * 5,
          path: '/',
        })
      );
    } else {
      token = user.getToken();

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('session_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600 * 24,
          path: '/',
        })
      );
    }

    return res.json({ token });
  });
