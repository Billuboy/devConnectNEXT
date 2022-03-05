// import React from 'react';
// import { Box, Heading, Flex, Button, Text, IconButton } from '@chakra-ui/react';
// import Moment from 'react-moment';
// import RouterLink from 'next/link';

// function PostCard({
//   post,
//   // bg,
//   // bgText,
//   // comment,
//   // deletePost,
//   // onLike,
//   // likeColor,
//   // userInfo,
//   // children,
// }) {
//   // const renderDelete = () => {
//   //   if (comment) {
//   //     if (userInfo?._id === post.user) {
//   //       return (
//   //         <IconButton
//   //           variant="outline"
//   //           borderRadius="10px"
//   //           color="red"
//   //           bg="#ebf8f5"
//   //           icon={<i className="fas fa-trash"></i>}
//   //           _focus={{ outlne: 'none' }}
//   //           // onClick={() => deletePost(post._id)}
//   //         />
//   //       );
//   //     }
//   //     return null;
//   //   }

//   //   return null;
//   // };

//   // const renderLike = () => {
//   //   if (post.likes.filter(({ user }) => user === userInfo?._id).length > 0)
//   //     likeColor.current = '#61B15A';
//   //   else likeColor.current = '#000';

//   //   return (
//   //     <Button
//   //       mr="0.75rem"
//   //       bg="#ebf8f5"
//   //       _focus={{ outline: 'none' }}
//   //       color={likeColor.current}
//   //       leftIcon={<i className="fas fa-thumbs-up" />}
//   //       onClick={() => onLike(post._id)}
//   //     >
//   //       {post.likeCount}
//   //     </Button>
//   //   );
//   // };

//   // const renderComment = () => {
//   //   if (comment) {
//   //     return (
//   //       <RouterLink href={`/post/${post._id}`}>
//   //         <Button
//   //           bg="#284E78"
//   //           color="#fff"
//   //           _focus={{ outline: 'none' }}
//   //           _hover={{ background: '#19456b' }}
//   //         >
//   //           Comments {post.commentCount}
//   //         </Button>
//   //       </RouterLink>
//   //     );
//   //   }
//   //   return null;
//   // };

//   console.log('rendering', post._id);

//   return (
//     <Box
//       w="90%"
//       p="1rem"
//       m="1rem"
//       // bg={bg}
//       borderRadius="10px"
//       _hover={{ boxShadow: '5px 5px 13px rgba(71,71,71,0.25)' }}
//       boxShadow="lg"
//     >
//       <Flex justify="space-between" mb="0.75rem">
//         <Heading fontWeight="500" fontSize="1.3rem" color="#11a17c">
//           {post.name}
//         </Heading>
//         <Box fontWeight="600" fontSize="1.1rem" color="#11698e">
//           <Moment format="HH:MM DD-MM-YYYY">{post.date}</Moment>
//         </Box>
//       </Flex>
//       <Flex justify="center" align="bottom">
//         <Box
//           w="100%"
//           border="1px solid #eee"
//           // bg={bgText}
//           borderRadius="10px"
//         >
//           <Text p="0.5rem" fontWeight="500">
//             {post.text}
//           </Text>
//         </Box>
//       </Flex>
//       {/* {userInfo._id ? (
//         <Flex justify="space-between" mt="0.75rem">
//           <Box>
//             <Flex justify="flex-end">
//               {renderLike()}
//               {renderComment()}
//             </Flex>
//           </Box>
//           <Box>{renderDelete()}</Box>
//         </Flex>
//       ) : (
//         <Flex justify="space-between" mt="0.75rem">
//           <Box>
//             <Flex justify="flex-end">
//               {renderLike()}
//               {renderComment()}
//             </Flex>
//           </Box>
//         </Flex>
//       )} */}
//       {/* <Box>{children}</Box> */}
//     </Box>
//   );
// }

// function areEqual(prevProps, currProps) {
//   console.log('prop-checking', prevProps.post === currProps.post);
//   console.log('prev', prevProps, 'curr', currProps);
//   // console.log(
//   //   'id',
//   //   prevProps.post._id,
//   //   'prevProps',
//   //   prevProps.post,
//   //   'currProps',
//   //   currProps.post
//   // );
//   // console.log(
//   //   'like-count check',
//   //   prevProps.post.likeCount === currProps.post.likeCount
//   // );
//   return prevProps.post.likeCount === currProps.post.likeCount;
// }

// export default React.memo(PostCard, areEqual);

import React from 'react';

export default function postCard() {
  return <div>postCard</div>;
}
