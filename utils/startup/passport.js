import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import cookie from 'cookie';

function cookieExtractor(req) {
  var jwt = null;

  if (req.headers?.cookie) {
    const cookies = cookie.parse(req.headers?.cookie);
    if (cookies?.auth) jwt = cookies.auth;
  }

  return jwt;
}

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromExtractors([cookieExtractor]);
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(
  'jwt',
  new JwtStrategy(opts, async (jwt_payload, done) => done(null, jwt_payload))
);

export default passport;
