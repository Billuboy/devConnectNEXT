import connect from 'next-connect';

import { dbConnect } from '../startup/db';

const handler = connect();
handler.use(dbConnect);

export default handler;
