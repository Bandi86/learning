import React from 'react';
import DeletePostButton from './DeletePostButton';

const Post = ({ id, title, content, authorName }) => {
   
  return (
    <div>
      Post
      <h4>ID: {id}</h4>
      <h4>Title: {title}</h4>
      <h4>Content: {content}</h4>
      <h4>Author Name: {authorName ? authorName : 'No Author Name'}</h4>
      <DeletePostButton postId={id} />
    </div>
  );
};

export default Post;
