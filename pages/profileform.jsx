// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Flex,
//   Heading,
//   Button,
//   Checkbox,
//   Text,
//   useDisclosure,
//   Collapse,
//   ScaleFade,
//   Center,
// } from '@chakra-ui/react';
// import lodash from 'lodash';
// import Router from 'next/router';
// import RouterLink from 'next/link';
// import axios from 'axios';
// import decode from 'jwt-decode';
// import cookie from 'cookie';
// import Head from 'next/head';

// import InputField from '../components/templates/inputField';
// import ImageInputField from '../components/templates/imageInputField';
// import InputTextArea from '../components/templates/inputTextArea';
// import Profile from '../utils/models/profile';
// import dbConnect from '../utils/startup/db';

// export default function ProfileForm(props) {
//   const [fields, setFields] = useState({
//     handle: '',
//     company: '',
//     website: '',
//     location: '',
//     status: '',
//     skills: '',
//     bio: '',
//     githubusername: '',
//     twitter: '',
//     youtube: '',
//     facebook: '',
//     instagram: '',
//     linkedin: '',
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const { data } = props;

//     if (data) {
//       const { social } = data;

//       const res = lodash.pick(data, [
//         'handle',
//         'company',
//         'website',
//         'location',
//         'status',
//         'githubusername',
//         'bio',
//       ]);
//       res.skills = data?.skills.join(',');
//       res.twitter = social.twitter;
//       res.youtube = social.youtube;
//       res.linkedin = social.linkedin;
//       res.instagram = social.instagram;
//       res.facebook = social.facebook;

//       setFields(res);
//     }
//   }, [props]);

//   const onFormSubmit = async e => {
//     e.preventDefault();
//     const data = lodash.pick(fields, [
//       'handle',
//       'company',
//       'website',
//       'location',
//       'status',
//       'skills',
//       'githubusername',
//       'bio',
//     ]);
//     data.social = lodash.pick(fields, [
//       'twitter',
//       'youtube',
//       'facebook',
//       'instagram',
//       'linkedin',
//     ]);

//     try {
//       await axios.post('/api/profile/', data);
//       Router.push('/dashboard');
//     } catch (err) {
//       setErrors(err.response.data);
//     }
//   };

//   const renderSocialLinks = isOpen => {
//     return (
//       <Collapse in={isOpen} animateOpacity>
//         <ScaleFade initialScale={0.9} in={isOpen}>
//           <Flex direction="column">
//             <Box>
//               <ImageInputField
//                 m="1rem"
//                 fontSize="1.2rem"
//                 mb="0.25rem"
//                 label="Twitter"
//                 id="twitter"
//                 isRequired={false}
//                 icon="fab fa-twitter"
//                 placeholder="Twitter ID"
//                 color="#1da1f2"
//                 onChange={e => {
//                   setFields({ ...fields, twitter: e.target.value });
//                 }}
//                 value={fields.twitter}
//                 error={errors?.twitter}
//               />
//               <ImageInputField
//                 m="1rem"
//                 fontSize="1.2rem"
//                 mb="0.25rem"
//                 label="Facebook"
//                 id="facebook"
//                 isRequired={false}
//                 icon="fab fa-facebook"
//                 placeholder="Facebook ID"
//                 color="#4267b2"
//                 onChange={e =>
//                   setFields({ ...fields, facebook: e.target.value })
//                 }
//                 value={fields.facebook}
//                 error={errors?.facebook}
//               />
//               <ImageInputField
//                 m="1rem"
//                 fontSize="1.2rem"
//                 mb="0.25rem"
//                 label="Linkedin"
//                 id="linkedin"
//                 isRequired={false}
//                 icon="fab fa-linkedin"
//                 placeholder="Linkedin ID"
//                 color="#006192"
//                 onChange={e =>
//                   setFields({ ...fields, linkedin: e.target.value })
//                 }
//                 value={fields.linkedin}
//                 error={errors?.linkedin}
//               />
//               <ImageInputField
//                 m="1rem"
//                 fontSize="1.2rem"
//                 mb="0.25rem"
//                 label="Youtube"
//                 id="youtube"
//                 isRequired={false}
//                 icon="fab fa-youtube"
//                 placeholder="Youtube ID"
//                 color="#ff0000"
//                 onChange={e =>
//                   setFields({ ...fields, youtube: e.target.value })
//                 }
//                 value={fields.youtube}
//                 error={errors?.youtube}
//               />
//               <ImageInputField
//                 m="1rem"
//                 fontSize="1.2rem"
//                 mb="0.25rem"
//                 label="Instagram"
//                 id="instagram"
//                 isRequired={false}
//                 icon="fab fa-instagram"
//                 placeholder="Instagram ID"
//                 color="#833ab4"
//                 onChange={e =>
//                   setFields({ ...fields, instagram: e.target.value })
//                 }
//                 value={fields.instagram}
//                 error={errors?.instagram}
//               />
//             </Box>
//           </Flex>
//         </ScaleFade>
//       </Collapse>
//     );
//   };

//   const RenderForm = () => {
//     const { isOpen, onToggle } = useDisclosure();
//     return (
//       <Flex align="center" direction="column">
//         <Box mt="1rem" mb="0.75rem">
//           <Heading fontWeight="700">Profile Form</Heading>
//         </Box>
//         <Box w="90%">
//           <form onSubmit={onFormSubmit}>
//             <InputField
//               m="1rem"
//               fontSize="1.2rem"
//               mb="0.25rem"
//               label="Handle"
//               id="handle"
//               placeholder="Handle"
//               onChange={e => setFields({ ...fields, handle: e.target.value })}
//               isRequired={true}
//               value={fields.handle}
//               error={errors?.handle}
//             />
//             <InputField
//               m="1rem"
//               fontSize="1.2rem"
//               mb="0.25rem"
//               label="Company"
//               id="company"
//               placeholder="Company"
//               onChange={e => setFields({ ...fields, company: e.target.value })}
//               value={fields.company}
//               isRequired={false}
//               error={errors?.company}
//             />
//             <InputField
//               m="1rem"
//               fontSize="1.2rem"
//               mb="0.25rem"
//               label="Website"
//               id="website"
//               placeholder="Website"
//               helperText="eg-https://www.test.com"
//               onChange={e => setFields({ ...fields, website: e.target.value })}
//               value={fields.website}
//               isRequired={false}
//               error={errors?.website}
//             />
//             <InputField
//               m="1rem"
//               fontSize="1.2rem"
//               mb="0.25rem"
//               label="Location"
//               id="location"
//               placeholder="Location"
//               onChange={e => setFields({ ...fields, location: e.target.value })}
//               value={fields.location}
//               isRequired={false}
//               error={errors?.location}
//             />
//             <InputField
//               m="1rem"
//               fontSize="1.2rem"
//               mb="0.25rem"
//               label="Tech Stack"
//               id="status"
//               placeholder="Tech Stack"
//               onChange={e => setFields({ ...fields, status: e.target.value })}
//               isRequired={true}
//               value={fields.status}
//               error={errors?.status}
//             />
//             <InputField
//               m="1rem"
//               fontSize="1.2rem"
//               mb="0.25rem"
//               label="Skills"
//               id="skills"
//               placeholder="Skiils"
//               helperText="values must be comma separated"
//               onChange={e => setFields({ ...fields, skills: e.target.value })}
//               isRequired={false}
//               value={fields.skills}
//               error={errors?.skills}
//             />
//             <InputField
//               m="1rem"
//               fontSize="1.2rem"
//               mb="0.25rem"
//               label="GitHub"
//               id="githubusername"
//               placeholder="GitHub UserName"
//               onChange={e =>
//                 setFields({ ...fields, githubusername: e.target.value })
//               }
//               value={fields.githubusername}
//               isRequired={false}
//               error={errors?.githubusername}
//             />
//             <InputTextArea
//               m="1rem"
//               fontSize="1.2rem"
//               mb="0.25rem"
//               label="Bio"
//               id="bio"
//               placeholder="Bio"
//               onChange={e => setFields({ ...fields, bio: e.target.value })}
//               isRequired={false}
//               value={fields.bio}
//               error={errors?.bio}
//             />

//             <Checkbox
//               m="1rem"
//               onChange={onToggle}
//               value={isOpen}
//               borderColor="#007a5b">
//               <Text fontSize="1.1rem" fontWeight="500" color="#007a5b">
//                 Add Social Media Links
//               </Text>
//             </Checkbox>
//             {isOpen ? renderSocialLinks(isOpen) : null}

//             <Button
//               type="submit"
//               bg="#16c79a"
//               display="block"
//               mx="auto"
//               w="60%"
//               my="2rem"
//               _focus={{ outline: 'none' }}
//               _hover={{ background: '#13b38a' }}>
//               {props.error?.newProfile ? 'Create Profile' : 'Update Profile'}
//             </Button>
//           </form>
//         </Box>
//       </Flex>
//     );
//   };

//   return (
//     <>
//       <Head>
//         <title>Profile Form</title>
//         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       </Head>

//       <Flex justify="center">
//         <Box w="80%" m="1rem">
//           <RouterLink href="/dashboard">
//             <Button
//               bg=" #16c79a"
//               leftIcon={<i className="fas fa-arrow-left" />}
//               _hover={{ background: '#13b38a' }}
//               _focus={{ outline: 'none' }}>
//               Back to DashBoard
//             </Button>
//           </RouterLink>
//           <Center>
//             <Box w="60%" borderRadius="5px" bg="#e7fbff" my="1rem">
//               {RenderForm()}
//             </Box>
//           </Center>
//         </Box>
//       </Flex>
//     </>
//   );
// }

// export async function getServerSideProps(ctx) {
//   await dbConnect();

//   const cookies = ctx.req.headers.cookie;
//   if (cookies) {
//     const { auth } = cookie.parse(ctx.req.headers?.cookie);
//     const { _id } = decode(auth);

//     const response = await Profile.findOne({
//       user: _id,
//     }).select({
//       education: 0,
//       experience: 0,
//     });

//     if (!response)
//       return {
//         props: { error: { newProfile: 'There is no profile for this user' } },
//       };

//     const json = JSON.parse(JSON.stringify(response));
//     return { props: { data: json } };
//   }

//   return { props: { data: {} } };
// }

// ProfileForm.requireAuth = true;

import React from 'react';

export default function profileform() {
  return <div>profileform</div>;
}
