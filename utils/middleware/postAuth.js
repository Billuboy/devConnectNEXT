import { getSession } from 'next-auth/react';

export default async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) return next();
  req.user = { name: session.user.name, id: session.user.uid };
  return next();
};
