import connect from 'next-connect';
import decode from 'jwt-decode';
import cookie from 'cookie';

export default connect().get((req, res) => {
  if (req.headers?.cookie) {
    const cookies = cookie.parse(req.headers.cookie);

    if (cookies?.auth) {
      const auth = cookies['auth'];
      const payload = decode(auth);

      return res.json({ payload });
    }
  }

  return res.json({ access: false });
});
