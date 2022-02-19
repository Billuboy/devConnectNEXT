import connect from 'next-connect';

import passport from '../startup/passport';
import dbConnect from '../startup/db';

export default connect()
  .use(async (req, res, next) => {
    try {
      await dbConnect();
      console.log('connected to db');
      next();
    } catch (err) {
      throw new Error('Error connecting to MongoDB');
    }
  })
  .use(passport.initialize());
