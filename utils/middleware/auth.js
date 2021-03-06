import connect from 'next-connect';

import passport from '../startup/passport';

const handler = connect();
handler.use(passport.initialize());

export default handler;
