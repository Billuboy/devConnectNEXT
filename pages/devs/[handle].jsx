// import React from 'react';
// import Head from 'next/head';
// import {
//   Box,
//   Grid,
//   Flex,
//   Heading,
//   Button,
//   Text,
//   Divider,
//   Center,
//   Spinner,
// } from '@chakra-ui/react';
// import { useRouter } from 'next/router';
// import Moment from 'react-moment';
// import RouterLink from 'next/link';
// import useSwr from 'swr';

// import Dev from '../../components/devs/dev';
// import dbConnect from '../../utils/startup/db';
// import Profile from '../../utils/models/profile';

// export default function DevPage(props) {
//   const Router = useRouter();

//   const { data, error } = useSwr(`/api/profile/handle/${props.data.handle}`, {
//     initialData: props.data,
//   });

//   const renderSkills = () => {
//     let a = 0;

//     return data.skills.map(skill => {
//       a = a + 1;
//       if (a > 4) return;
//       return (
//         <Box key={a}>
//           <Flex justify="space-around">
//             <Box mr="0.5rem">
//               <i className="fas fa-check" />
//             </Box>
//             <Text fontWeight="600">{skill.toUpperCase()}</Text>
//           </Flex>
//         </Box>
//       );
//     });
//   };

//   const renderExperience = () => {
//     return data.experience.map(exp => {
//       return (
//         <Box key={exp._id} textAlign="left" p="1rem">
//           <Text fontSize="1.2rem" fontWeight="600" color="#11698e">
//             {exp.company}
//           </Text>
//           <Text fontWeight="500">
//             <Moment format="DD-MM-YYYY">{exp.from}</Moment> -{' '}
//             {exp.current === true ? (
//               'Now'
//             ) : (
//               <Moment format="DD-MM-YYYY">{exp.to}</Moment>
//             )}
//           </Text>
//           <Box mt="0.5rem">
//             <Heading
//               fontSize="1rem"
//               fontWeight="600"
//               display="inline"
//               color="#11698e">
//               Position: {''}
//             </Heading>
//             <Text display="inline" fontWeight="500">
//               {exp.title}
//             </Text>
//           </Box>
//           <Box>
//             <Heading
//               fontSize="1rem"
//               fontWeight="600"
//               display="inline"
//               color="#11698e">
//               Location: {''}
//             </Heading>
//             <Text display="inline" fontWeight="500">
//               {exp.location}
//             </Text>
//           </Box>
//           <Box>
//             {exp.description.length > 1 ? (
//               <>
//                 <Heading
//                   fontSize="1rem"
//                   fontWeight="600"
//                   display="inline"
//                   color="#11698e">
//                   Description: {''}
//                 </Heading>
//                 <Text display="inline" fontWeight="500">
//                   {exp.description}
//                 </Text>
//               </>
//             ) : null}
//           </Box>
//           <Center>
//             <Divider orientation="horizontal" />
//           </Center>
//         </Box>
//       );
//     });
//   };

//   const renderEducation = () => {
//     return data.education.map(edu => {
//       return (
//         <Box key={edu._id} textAlign="left" p="1rem">
//           <Text fontSize="1.2rem" fontWeight="600" color="#11698e">
//             {edu.school}
//           </Text>
//           <Text fontWeight="500">
//             <Moment format="DD-MM-YYYY">{edu.from}</Moment> -{' '}
//             {edu.current === true ? (
//               'Now'
//             ) : (
//               <Moment format="DD-MM-YYYY">{edu.to}</Moment>
//             )}
//           </Text>
//           <Box mt="0.5rem">
//             <Heading
//               fontSize="1rem"
//               fontWeight="600"
//               display="inline"
//               color="#11698e">
//               Degree: {''}
//             </Heading>
//             <Text display="inline" fontWeight="500">
//               {edu.degree}
//             </Text>
//           </Box>
//           <Box>
//             <Heading
//               fontSize="1rem"
//               fontWeight="600"
//               display="inline"
//               color="#11698e">
//               Field Of Study: {''}
//             </Heading>
//             <Text display="inline" fontWeight="500">
//               {edu.fieldofstudy}
//             </Text>
//           </Box>
//           <Box>
//             {edu.description.length > 1 ? (
//               <>
//                 <Heading
//                   fontSize="1rem"
//                   fontWeight="600"
//                   display="inline"
//                   color="#11698e">
//                   Description: {''}
//                 </Heading>
//                 <Text display="inline" fontWeight="500">
//                   {edu.description}
//                 </Text>
//               </>
//             ) : null}
//           </Box>
//           <Center>
//             <Divider orientation="horizontal" />
//           </Center>
//         </Box>
//       );
//     });
//   };

//   const renderProfile = () => {
//     return (
//       <Dev
//         profile={data}
//         renderEducation={renderEducation}
//         renderSkills={renderSkills}
//         renderExperience={renderExperience}
//       />
//     );
//   };

//   if (!data && !error) {
//     return (
//       <Box h="calc(100vh - 130px)">
//         <Flex justify="center" align="center" h="100%">
//           <Spinner
//             thickness="4px"
//             speed="0.65s"
//             emptyColor="#f8f1f1"
//             color="#19456b"
//             size="xl"
//           />
//         </Flex>
//       </Box>
//     );
//   }

//   if (props.noProfile) Router.replace('/404');

//   return (
//     <>
//       <Head>
//         <title>{Router.query.handle}</title>
//         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       </Head>

//       <Box minH="calc(100vh - 130px)">
//         <Grid h="100%" placeItems="center">
//           <Box w="80%" m="1rem">
//             <RouterLink href="/devs">
//               <Button
//                 bg=" #16c79a"
//                 leftIcon={<i className="fas fa-arrow-left" />}
//                 _hover={{ background: '#13b38a' }}
//                 _focus={{ outline: 'none' }}>
//                 Back to Profiles
//               </Button>
//             </RouterLink>
//             <Box>{renderProfile()}</Box>
//           </Box>
//         </Grid>
//       </Box>
//     </>
//   );
// }

// export async function getStaticProps(ctx) {
//   await dbConnect();
//   require('../../utils/models/user');

//   const { handle } = ctx.params;
//   const response = await Profile.findOne({
//     handle,
//   }).populate('user', ['name']);

//   if (!response)
//     return {
//       props: { noProfile: 'There is no profile for this user' },
//     };
//   const json = JSON.parse(JSON.stringify(response));
//   return { props: { data: json }, revalidate: 1800 };
// }

// export async function getStaticPaths() {
//   await dbConnect();

//   const response = await Profile.find().select({
//     handle: 1,
//     _id: 0,
//   });
//   const json = JSON.parse(JSON.stringify(response));

//   const paths = json.map(({ handle }) => {
//     return { params: { handle } };
//   });

//   return {
//     fallback: 'blocking',
//     paths,
//   };
// }

import React from 'react';

export default function Handle() {
  return <div>Handle</div>;
}
