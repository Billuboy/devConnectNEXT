// import React from 'react';
// import {
//   Heading,
//   Flex,
//   Box,
//   Button,
//   Text,
//   Center,
//   Grid,
//   Tag,
//   TagLabel,
//   Spinner,
// } from '@chakra-ui/react';
// import RouterLink from 'next/link';

// export default function DevCard({ dev }) {
//   const renderSkills = () => {
//     let a = 0;

//     return (
//       <>
//         <Text fontWeight="600" fontSize="1.3rem" mb="0.75rem">
//           Skills
//         </Text>
//         <Box>
//           <Grid templateColumns="repeat(2, 1fr)" gap={5}>
//             {dev.skills.map(skill => {
//               a += 1;
//               if (a > 4) return;

//               return (
//                 <Tag
//                   key={a}
//                   bg="#b4f4d7"
//                   color="#456268"
//                   h="1.1rem"
//                   borderRadius="30px">
//                   <Grid w="100%" placeItems="center">
//                     <TagLabel
//                       lineHeight="1.1rem"
//                       fontWeight="600"
//                       fontSize="1.1rem"
//                       ml="1px"
//                       p="0.5rem">
//                       {skill.toUpperCase()}
//                     </TagLabel>
//                   </Grid>
//                 </Tag>
//               );
//             })}
//           </Grid>
//         </Box>
//       </>
//     );
//   };

//   if (!dev) {
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

//   return (
//     <Box
//       textAlign="center"
//       bg="#e3f7f2"
//       p="1rem"
//       m="1.5rem"
//       borderRadius="10px"
//       boxShadow="lg"
//       w="550px"
//       h="253px"
//       position="relative">
//       <Flex>
//         <Box textAlign="left" mt="1.5rem" ml="1.5rem" w="50%">
//           <Heading mb="0.5rem" fontWeight="600" fontSize="1.95rem">
//             {dev.user.name}
//           </Heading>
//           <Text fontSize="1.3rem" mb="0.5rem" fontWeight="600">
//             @{dev.handle}
//           </Text>
//           <Text fontSize="1.1rem" fontWeight="500">
//             {dev.status}
//           </Text>
//         </Box>
//         <Box m="1.2rem" ml="2.75rem">
//           {dev.skills.length > 0 ? renderSkills() : null}
//         </Box>
//       </Flex>
//       <RouterLink href={`/devs/${dev.handle}`}>
//         <Center>
//           <Button
//             position="absolute"
//             bottom="0"
//             bg="#16c79a"
//             mb="1rem"
//             _hover={{ background: '#13b38a' }}
//             _focus={{ outline: 'none' }}>
//             View Profile
//           </Button>
//         </Center>
//       </RouterLink>
//     </Box>
//   );
// }

import React from 'react';

export default function devCard() {
  return <div>devCard</div>;
}
