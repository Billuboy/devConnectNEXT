// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { Box, Flex, Spinner } from '@chakra-ui/react';
// import { useAuth } from './authContext';

// export default function RedirGuard({ children }) {
//   const Router = useRouter();
//   const { init, auth } = useAuth();

//   useEffect(() => {
//     if (!init && auth) Router.push('/dashboard');
//   }, [init, Router, auth]);

//   if (init) {
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

//   if (!init && !auth) {
//     return <>{children}</>;
//   }

//   return (
//     <Box h="calc(100vh - 130px)">
//       <Flex justify="center" align="center" h="100%">
//         <Spinner
//           thickness="4px"
//           speed="0.65s"
//           emptyColor="#f8f1f1"
//           color="#19456b"
//           size="xl"
//         />
//       </Flex>
//     </Box>
//   );
// }

import React from 'react';

export default function redirGuard() {
  return <div>redirGuard</div>;
}
