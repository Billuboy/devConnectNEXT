// import {
//   Box,
//   FormControl,
//   Input,
//   FormLabel,
//   Button,
//   InputGroup,
//   InputRightElement,
//   FormErrorMessage,
// } from '@chakra-ui/react';

// export default function PasswordField(props) {
//   return (
//     <Box m="1.5rem">
//       <FormControl isRequired={props.isRequired} isInvalid={props.error}>
//         <FormLabel
//           htmlFor="password"
//           fontSize="1.3rem"
//           mb="0.75rem"
//           color="#007a5b"
//         >
//           {props.label}
//         </FormLabel>
//         <InputGroup size="md">
//           <Input
//             borderColor="#00a37a"
//             color="#11698e"
//             _hover={{ borderColor: '#00a37a' }}
//             type={props.show ? 'text' : 'password'}
//             placeholder="Enter Password"
//             fontWeight="500"
//             autoComplete="off"
//             value={props.value}
//             onChange={props.onChange}
//           />
//           <InputRightElement width="4.5rem">
//             <Button
//               className="showIcon"
//               h="1.75rem"
//               size="sm"
//               bg="transparent"
//               _focus={{ outline: 'none' }}
//               onClick={props.onClick}
//             >
//               <i className={`far fa-eye${props.show ? '' : '-slash'}`}></i>
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//         <FormErrorMessage>{props.error}</FormErrorMessage>
//       </FormControl>
//     </Box>
//   );
// }

import React from 'react';

export default function passwordField() {
  return <div>passwordField</div>;
}
