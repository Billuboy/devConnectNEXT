import cookie from 'cookie';
import connect from 'next-connect';

export default connect().post((req, res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('auth', '', {
      maxAge: -1,
      path: '/',
    })
  );

  return res.json({ msg: 'logged out' });
});
