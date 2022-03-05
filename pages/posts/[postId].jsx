// import React, { useState, useRef } from 'react';
// import {
//   Box,
//   Button,
//   Center,
//   Grid,
//   Heading,
//   createStandaloneToast,
// } from '@chakra-ui/react';
// import axios from 'axios';
// import useSwr, { mutate, trigger } from 'swr';
// import { useRouter } from 'next/router';
// import RouterLink from 'next/link';
// import Head from 'next/head';
// import * as _ from 'lodash';

// import { useAuth } from '../../components/authContext';
// import PostCard from '../../components/post/postCard';
// import CommentCard from '../../components/post/commentCard';
// import CommentCreate from '../../components/post/createPost';
// import dbConnect from '../../utils/startup/db';
// import Post from '../../utils/models/post';

// export default function PostPage(props) {
//   const likeColor = useRef('#000');
//   const Router = useRouter();
//   const [errors, setErrors] = useState({});
//   const { data } = useSwr(`/api/post/${Router.query.postId}`, {
//     initialData: props.data,
//   });

//   const { userInfo, auth } = useAuth();

//   const deleteComment = async commId => {
//     if (
//       window.confirm(
//         'This will delete your account permanently. This cannot be undone!!! '
//       )
//     ) {
//       _.remove(data.comments, ({ _id }) => _id === commId);

//       mutate(`/api/post/${Router.query.postId}`, data, false);
//       await axios.delete(`/api/post/comment/${data._id}/${commId}`);
//       trigger(`/api/post/${Router.query.postId}`);
//     }
//   };

//   const createComment = async comment => {
//     try {
//       data.comments.push({ user: comment.user });

//       mutate(`/api/post/${Router.query.postId}`, data, false);
//       await axios.post(`/api/post/comment/${data._id}`, { text: comment.text });
//       trigger(`/api/post/${Router.query.postId}`);
//     } catch (err) {
//       data.comments.pop();
//       setErrors(err.response.data);
//     }
//   };

//   const loginPopup = () => {
//     const toast = createStandaloneToast();
//     const id = 'remove-duplication';

//     if (toast.isActive(id)) return null;

//     return toast({
//       id,
//       title: 'Unauthorized Access',
//       description: 'Please Login First',
//       position: 'top',
//       status: 'error',
//       duration: 3500,
//       isClosable: true,
//     });
//   };

//   const onLike = async () => {
//     if (auth) {
//       if (data.likes.filter(({ user }) => user === userInfo?._id).length > 0) {
//         likeColor.current = '#61B15A';
//         _.remove(data.likes, ({ user }) => user === userInfo?._id);
//         --data.likeCount;
//       } else {
//         likeColor.current = '#000';
//         data.likes.push({ user: userInfo?._id });
//         ++data.likeCount;
//       }

//       mutate(`/api/post/${Router.query.postId}`, data, false);
//       await axios.post(`/api/post/like/${data._id}`);
//       mutate(`/api/post/${Router.query.postId}`);
//     } else {
//       loginPopup();
//     }
//   };

//   const renderComments = () => {
//     return data.comments.map(comment => {
//       return (
//         <CommentCard
//           comment={comment}
//           bg={'#D0E8F2'}
//           bgText={'#f3fdff'}
//           key={comment._id}
//           deleteComment={deleteComment}
//         />
//       );
//     });
//   };

//   const renderPost = () => {
//     return (
//       <>
//         <PostCard
//           post={data}
//           bg="#cfefe7"
//           bgText="#f0faf7"
//           comment={false}
//           onLike={onLike}
//           likeColor={likeColor}
//           userInfo={userInfo}>
//           <CommentCreate
//             mt="2rem"
//             create={createComment}
//             error={errors}
//             placeholder="Comment"
//           />
//         </PostCard>
//         <Heading m="0.75rem" fontWeight="700" fontSize="1.2rem" color="#fff">
//           Comments
//         </Heading>
//         <Box>{renderComments()}</Box>
//       </>
//     );
//   };

//   if (props.noPost) Router.replace('/404');

//   return (
//     <>
//       <Head>
//         <title>Post</title>
//         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       </Head>

//       <Box minH="calc(100vh - 130px)">
//         <Grid h="100%" placeItems="center">
//           <Box w="80%" m="1rem">
//             <RouterLink href="/">
//               <Button
//                 bg=" #16c79a"
//                 leftIcon={<i className="fas fa-arrow-left" />}
//                 _hover={{ background: '#13b38a' }}
//                 _focus={{ outline: 'none' }}>
//                 Back to Posts
//               </Button>
//             </RouterLink>
//             <Center>
//               <Box w="60%">{renderPost()}</Box>
//             </Center>
//           </Box>
//         </Grid>
//       </Box>
//     </>
//   );
// }

// export async function getStaticProps(ctx) {
//   await dbConnect();

//   const { postId } = ctx.params;
//   const response = await Post.findById(postId);

//   if (!response) return { props: { noPost: 'No post found with given ID' } };

//   const json = JSON.parse(JSON.stringify(response));
//   return { props: { data: json }, revalidate: 10 };
// }

// export async function getStaticPaths() {
//   await dbConnect();

//   const response = await Post.find().select({ _id: 1 });
//   const json = JSON.parse(JSON.stringify(response));

//   const paths = json.map(({ _id }) => {
//     return { params: { postId: _id } };
//   });

//   return {
//     fallback: 'blocking',
//     paths,
//   };
// }

import React from 'react';

export default function PostId() {
  return <div>PostId</div>;
}
