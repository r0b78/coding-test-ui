import React from 'react';
import './styles.css';

import P from 'prop-types';

export const PostCard = ({ name, description, file, id }) => (
  <div id={id} className="post">
    <div className="post-content">
      <h3>{name}</h3>
      <p>{description}</p>
      {file && (
        <a href={file} target="_blank" rel="noreferrer">
          Open file
        </a>
      )}
    </div>
  </div>
);

PostCard.propTypes = {
  name: P.string.isRequired,
  description: P.string.isRequired,
  file: P.string.isRequired,
  id: P.number.isRequired,
};
