import React from 'react';
import { PostCard } from '../PostCard';
import './styles.css';

import P from 'prop-types';

export const Posts = ({ posts }) => (
  <div className="posts">
    {posts.map(({ id, name, description, filePath }) => (
      <PostCard key={id} id={id} name={name} description={description} file={filePath} />
    ))}
  </div>
);

Posts.propTypes = {
  posts: P.array.isRequired,
};
