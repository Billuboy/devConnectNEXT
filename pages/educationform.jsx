// import React, { useState } from 'react';
// import {
//   Box,
//   Heading,
//   Flex,
//   Checkbox,
//   Button,
//   Text,
//   Center,
// } from '@chakra-ui/react';
// import axios from 'axios';
// import Router from 'next/router';
// import RouterLink from 'next/link';
// import Head from 'next/head';

// import InputField from '../components/templates/inputField';
// import InputTextArea from '../components/templates/inputTextArea';

// export default function EducationForm() {
//   const [fields, setFields] = useState({
//     school: '',
//     degree: '',
//     fieldofstudy: '',
//     from: '',
//     to: '',
//     current: false,
//     description: '',
//   });
//   const [errors, setErrors] = useState({});

//   const onFormSubmit = async e => {
//     e.preventDefault();

//     if (!fields.current) {
//       fields.to = fields.to;
//     }

//     try {
//       await axios.post('/api/profile/education/', fields);
//       Router.push('/dashboard');
//     } catch (err) {
//       setErrors(err.response.data);
//     }
//   };

//   const renderForm = () => {
//     return (
//       <Flex align="center" direction="column">
//         <Box mt="1rem" mb="0.75rem">
//           <Heading fontWeight="700">Education Form</Heading>
//         </Box>
//         <Box w="90%">
//           <form onSubmit={onFormSubmit}>
//             <InputField
//               m="1rem"
//               fontSize="1.2rem"
//               mb="0.25rem"
//               label="School"
//               placeholder="Enter school name"
//               isRequired={true}
//               onChange={e => setFields({ ...fields, school: e.target.value })}
//               value={fields.school}
//               error={errors?.school}
//             />
//             <InputField
//               m="1rem"
//               fontSize="1.2rem"
//               mb="0.25rem"
//               label="Degree"
//               placeholder="Enter degree"
//               isRequired={true}
//               onChange={e => setFields({ ...fields, degree: e.target.value })}
//               value={fields.degree}
//               error={errors?.degree}
//             />
//             <InputField
//               m="1rem"
//               fontSize="1.2rem"
//               mb="0.25rem"
//               label="Field Of Study"
//               placeholder="Enter the field in which you've got the degree"
//               isRequired={true}
//               onChange={e =>
//                 setFields({ ...fields, fieldofstudy: e.target.value })
//               }
//               value={fields.fieldofstudy}
//               error={errors?.fieldofstudy}
//             />
//             <Flex>
//               <InputField
//                 m="1rem"
//                 fontSize="1.2rem"
//                 mb="0.25rem"
//                 label="From"
//                 type="date"
//                 isRequired={true}
//                 onChange={e => setFields({ ...fields, from: e.target.value })}
//                 value={String(fields.from)}
//                 error={errors?.from}
//               />

//               <InputField
//                 m="1rem"
//                 fontSize="1.2rem"
//                 mb="0.25rem"
//                 label="To"
//                 type="date"
//                 isDisabled={fields.current}
//                 isRequired={false}
//                 onChange={e => setFields({ ...fields, to: e.target.value })}
//                 value={String(fields.to)}
//                 error={errors?.to}
//               />
//             </Flex>
//             <Checkbox
//               mx="1rem"
//               my="0.25rem"
//               borderColor="#007a5b"
//               onChange={e => {
//                 setFields({
//                   ...fields,
//                   current: !fields.current,
//                 });
//               }}
//               defaultIsChecked={fields.current}
//               value={fields.current}
//               _focus={{ outline: 'none' }}>
//               <Text fontSize="1.1rem" fontWeight="500" color="#007a5b">
//                 Currently doing your degree.
//               </Text>
//             </Checkbox>

//             <InputTextArea
//               m="1rem"
//               fontSize="1.2rem"
//               mb="0.25rem"
//               label="Description"
//               placeholder="Tell us about yourself"
//               onChange={e =>
//                 setFields({ ...fields, description: e.target.value })
//               }
//               value={fields.description}
//               isRequired={false}
//               error={errors?.description}
//             />

//             <Button
//               type="submit"
//               w="60%"
//               mx="auto"
//               mb="2rem"
//               display="block"
//               bg="#16c79a"
//               _hover={{ background: '#13b38a' }}
//               _focus={{ outline: 'none' }}>
//               Add Education Info
//             </Button>
//           </form>
//         </Box>
//       </Flex>
//     );
//   };

//   return (
//     <>
//       <Head>
//         <title>Login</title>
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
//             <Box
//               w="60%"
//               border="solid 1px #eee"
//               borderRadius="5px"
//               bg="#e7fbff"
//               my="1rem">
//               {renderForm()}
//             </Box>
//           </Center>
//         </Box>
//       </Flex>
//     </>
//   );
// }

// EducationForm.requireAuth = true;

import React from 'react';

export default function educationform() {
  return <div>educationform</div>;
}
