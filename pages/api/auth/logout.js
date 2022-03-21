import cookie from 'cookie';
import connect from 'next-connect';

const handler = connect();

handler.post((req, res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('auth', '', {
      maxAge: -1,
      path: '/',
    }),
  );

  return res.json({ msg: 'logged out' });
});

export default handler;
