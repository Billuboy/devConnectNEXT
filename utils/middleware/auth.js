import { getSession } from 'next-auth/react';

export default async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) return res.status(403).send('Unauthenticated');
  req.user = { name: session.user.name, id: session.user.uid };
  next();
};
