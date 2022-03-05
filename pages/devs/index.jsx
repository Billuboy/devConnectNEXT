// import React from 'react';
// import Head from 'next/head';
// import { Box, Grid, Flex, Spinner, Heading, Text } from '@chakra-ui/react';
// import useSwr from 'swr';

// import DevCard from '../../components/devs/devCard';
// import dbConnect from '../../utils/startup/db';
// import Profile from '../../utils/models/profile';

// export default function Devs(props) {
//   const { data } = useSwr('/api/profile/all', {
//     initialData: props.data,
//   });

//   const renderProfiles = () => {
//     return data.map(dev => {
//       return (
//         <Flex direction="column" key={dev._id}>
//           <DevCard dev={dev} />
//         </Flex>
//       );
//     });
//   };

//   if (data.length === 0) {
//     return (
//       <>
//         <Head>
//           <title>Devs</title>
//           <meta
//             name="viewport"
//             content="initial-scale=1.0, width=device-width"
//           />
//         </Head>

//         <Box h="calc(100vh - 130px)">
//           <Flex justify="center" align="center" h="100%" direction="column">
//             <Heading fontWeight="500" fontSize="3rem" mb="1.5rem" color="#fff">
//               No Profiles Made Yet
//             </Heading>
//             <Text fontWeight="400" fontSize="1.4rem" color="#fff">
//               To make a profile go to dashboard and create your profile.
//             </Text>
//           </Flex>
//         </Box>
//       </>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>Devs</title>
//         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       </Head>

//       <Box minH="calc(100vh - 130px)">
//         <Grid placeItems="center">
//           <Heading mb="1.5rem" mt="1rem" fontWeight="700" color="#e9f5f9">
//             Developer Profiles
//           </Heading>
//           <Box>{renderProfiles()}</Box>
//         </Grid>
//       </Box>
//     </>
//   );
// }

// export async function getStaticProps() {
//   await dbConnect();
//   require('../../utils/models/user');

//   const response = await Profile.find({})
//     .select({
//       _id: 1,
//       user: 1,
//       handle: 1,
//       skills: 1,
//       status: 1,
//     })
//     .populate('user', ['name']);

//   if (!response) return { props: { data: [] } };

//   const json = JSON.parse(JSON.stringify(response));
//   return { props: { data: json }, revalidate: 1800 };
// }

import React from 'react';

export default function Index() {
  return <div>Index</div>;
}
