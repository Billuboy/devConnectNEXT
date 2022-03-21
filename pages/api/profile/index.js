import connect from 'next-connect';

import Profile from '../../../utils/models/profile';
import lodash from 'lodash';
import passport from '../../../utils/startup/passport';
import Validate from '../../../utils/validations/profile/profile';
import { auth, db } from '../../../utils/middleware';

const handler = connect();
handler.use(db);

handler
  .use(auth)
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = await Profile.findOne({
      user: req.user._id,
    })
      .populate('user', ['name'])
      .select({
        user: 1,
        education: 1,
        experience: 1,
      });

    if (!response) return res.json({ data: [], name: req.user.name });

    return res.json(response);
  });

handler
  .use(auth)
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const result = Validate(req.body, res);
    if (result === undefined) return;

    const profileFields = lodash.pick(req.body, [
      'handle',
      'company',
      'website',
      'location',
      'bio',
      'status',
      'githubusername',
    ]);
    profileFields.user = req.user._id;

    if (typeof req.body.skills !== 'undefined') {
      const skills = req.body.skills.split(',');
      const skillsTrim = skills.map(skill => skill.trim());
      const skillsRefined = lodash.remove(skillsTrim, skill => {
        if (skill !== '') return skill;
      });

      profileFields.skills = skillsRefined;
    }

    profileFields.social = lodash.pick(req.body.social, [
      'youtube',
      'twitter',
      'facebook',
      'linkedin',
      'instagram',
    ]);

    const profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      if (profile.handle !== profileFields.handle) {
        const handleCheck = await Profile.findOne({
          handle: profileFields.handle,
        });

        if (handleCheck)
          return res.status(400).json({ handle: 'Handle already exists' });
      }

      const response = await Profile.findOneAndUpdate(
        { user: req.user._id },
        { $set: profileFields },
        { new: true },
      );

      return res.json(response);
    } else {
      const profile = new Profile(profileFields);

      const handleCheck = await Profile.findOne({
        handle: profile.handle,
      });

      if (handleCheck)
        return res.status(400).json({ handle: 'Handle already exists' });

      const response = await profile.save();
      return res.json(response);
    }
  });

handler
  .use(auth)
  .delete(
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      await Profile.findOneAndRemove({ user: req.user._id });

      return res.json({ deleted: true });
    },
  );

export default handler;
