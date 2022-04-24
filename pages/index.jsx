import React, { useEffect, useRef, useCallback, useState } from 'react';

import {
  useInfinitePosts,
  useIntersection,
  useBinSearch,
  useFetch,
} from '@hooks/index';
import Post from '@components/post/postCard';
import PostModal from '@components/modal/postModal';

const PAGE_LIMIT = 10;

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const isVisible = useIntersection(ref);
  const { data, error, size, setSize, isValidating, mutate } =
    useInfinitePosts(PAGE_LIMIT);

  const isInitLoading = !data && !error;
  const isLoadingMore =
    isInitLoading ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[size - 1]?.length < PAGE_LIMIT);
  const isRefreshing = isValidating && data && data.length === size;

  useEffect(() => {
    if (!isInitLoading && isVisible && !isReachingEnd && !isRefreshing)
      setSize((_size) => _size + 1);
  }, [isVisible, isRefreshing]);

  const onLike = useCallback(
    async (timestamp) => {
      const [fIndex, sIndex] = useBinSearch(data, timestamp);
      const post = data[fIndex][sIndex].likes;
      if (post.isLiked) {
        post.isLiked = false;
        post.count -= 1;
      } else {
        post.isLiked = true;
        post.count += 1;
      }
      mutate(data, false);
    },
    [data, mutate]
  );

  const createBlog = async (body, signal) => {
    console.log(body);
    // const mutatedBody = {
    //   title: body.title,

    // }

    // await useFetch('POST', '/api/posts/', controller.current.signal, data);
  };

  const renderPosts = () => {
    if (isEmpty) return <div>No posts yet. Create one</div>;

    const posts = data?.flat(1);
    return posts?.map((post) => {
      const { isLiked } = post;
      return (
        <Post key={post._id} post={post} isLiked={isLiked} onLike={onLike} />
      );
    });
  };

  if (isInitLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>Index</div>
      <div className="w-[160px] h-[40px] bg-purple-500 rounded-[5px] grid place-items-center mt-[1.5rem]">
        <button
          type="button"
          className="font-semibold text-[18px] text-white-basic"
          onClick={() => setIsOpen(true)}
        >
          Create a Blog
        </button>
      </div>
      <PostModal
        buttonText="Create Blog"
        submitCallback={createBlog}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {renderPosts()}
      {!isEmpty && isRefreshing ? (
        <div ref={ref}>{isLoadingMore ? 'loading...' : 'something value'}</div>
      ) : null}
    </div>
  );
}
