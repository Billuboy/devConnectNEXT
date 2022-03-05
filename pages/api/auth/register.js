import { hashPassword } from '@lib/bcrypt';

import dbConnect from '@utils/startup/db';
import User from '@utils/models/user';
import validate from '@utils/validations/auth';

export default async (req, res) => {
  await dbConnect();

  const register = async () => {
    const result = await validate(req.body);
    if (!result.valid) return res.status(400).json(result.errors);

    let user = await User.findOne({ username: req.body.username });
    if (user)
      return res
        .status(400)
        .json({ username: 'Username is already registered' });

    const password = await hashPassword(req.body.password);
    user = new User({ username: req.body.username, password, new: false });

    await user.save();
    return res.status(201).json('created');
  };

  switch (req.method) {
    case 'POST':
      await register();
      break;
    default:
      return res.status(405).send('Invalid request method');
  }
};
