import connect from 'next-connect';

import { dbConnect } from '@utils/startup/db';

const all = connect();

all.use(dbConnect);

export default all;
