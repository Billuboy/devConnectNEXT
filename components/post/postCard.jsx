import React, { memo } from 'react';

import { parseDate } from '@lib/dateFns';

function PostCard({ post, isLiked, onLike }) {
  const { date, time } = parseDate(post.date);
  return (
    <div className="h-200px border border-solid border-white">
      <div>{post.title}</div>
      <div>{post.images.length ? post.images[0] : 0}</div>
      <div>{post.images.length ? post.images[1] : 1}</div>
      <div>
        <p>{date}</p>
        <p>{time}</p>
      </div>
      <div>Comments: {post.comments.count}</div>
      <div>Likes: {post.likes.count}</div>
      <div>isLiked: {isLiked ? 'yes' : 'no'}</div>
      <button onClick={() => onLike(post.date)} type="button">
        Like
      </button>
    </div>
  );
}

export default memo(
  PostCard,
  (prevProps, currProps) => prevProps.isLiked === currProps.isLiked
);
