import React from 'react';

import parseDate from '@lib/parseDate';

export default function PostCard({ post }) {
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
    </div>
  );
}
