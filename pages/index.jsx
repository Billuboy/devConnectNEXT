import React, { useEffect, useRef } from 'react';

import { useInfinitePosts, useIntersection } from '@hooks/index';
import Post from '@components/post/postCard';

export default function Index() {
  const ref = useRef();
  const isVisible = useIntersection(ref);
  const PAGE_LIMIT = 10;
  const { data, error, size, setSize, isValidating } =
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
    if (isVisible && !isReachingEnd && !isRefreshing)
      setSize((_size) => _size + 1);
  }, [isVisible, isRefreshing]);

  const renderPosts = () => {
    const posts = data?.flat(1);
    return posts?.map((post) => <Post post={post} key={post._id} />);
  };

  if (isEmpty) return <div>No posts yet. Create one</div>;
  return (
    <div>
      <div>Index</div>
      {renderPosts()}
      <div ref={ref}>{isLoadingMore ? 'loading...' : null}</div>
    </div>
  );
}
