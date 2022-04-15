import React, { memo } from 'react';

import { parseDate } from '@lib/dateFns';

function PostCard({ post, onLike }) {
  const { date, time } = parseDate(post.date);
  return (
    <div className="h-200px border border-solid border-white">
      <div>{post.title}</div>
      <div>{post.desc}</div>
      <div>
        <p>{date}</p>
        <p>{time}</p>
      </div>
      <div>Comments: {post.comments.count}</div>
      <div>Likes: {post.likes.count}</div>
      <div>isLiked: {post.likes.isLiked ? 'yes' : 'no'}</div>
      <button onClick={() => onLike(post.date)} type="button">
        Like
      </button>
    </div>
  );
}

const arePropsEqual = (prevProps, currProps) => {
  console.log(prevProps.likes === currProps.likes);
  return prevProps.likes === currProps.likes;
};

export default memo(PostCard, arePropsEqual);
