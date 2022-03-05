import User from '@utils/models/user';
import { comparePassword } from '@lib/bcrypt';
import { json } from '@lib/parseJSON';
import generate from '@lib/generateUsername';
import dbConnect from '@utils/startup/db';

export async function handleGoogleLogin(email, displayName, avatar) {
  await dbConnect();
  let data;
  const result = await User.findOne(
    { email },
    { avatar: 1, displayName: 1, _id: 1 }
  );

  if (result) data = json(result);
  else {
    const body = {
      username: generate(),
      displayName,
      email,
      avatar,
    };
    const user = new User(body);
    const response = await user.save();
    data = json(response);
  }

  return {
    id: data._id,
    name: data.displayName,
    image: data.avatar,
  };
}

export async function handleCredentialsLogin(username, password) {
  await dbConnect();
  const result = await User.findOne({ username });
  const data = json(result);

  if (!data) throw new Error('Incorrect credentials combination');
  if (!(await comparePassword(password, data.password)))
    throw new Error('Incorrect credentials combination');

  // console.log('processing...');
  // await new Promise((resolve) =>
  //   setTimeout(() => {
  //     resolve('some');
  //   }, 10000)
  // );

  return {
    id: data._id,
    name: data.displayName,
    image: data.avatar,
  };
}
