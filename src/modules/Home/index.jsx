import React from 'react';
import { Alert, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import { useAuth } from '../../shared/context/auth.context';

import { Posts } from '../../components/Posts';
import { LOGIN, SAVEPOST } from '../../routes';
import './styles.css';

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      name
      description
      filePath
    }
  }
`;

const Home = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_POSTS);

  const { logout } = useAuth();

  const toAddPost = (e) => {
    e.preventDefault();
    history.push(SAVEPOST);
  };

  const logOut = async () => {
    await logout();
    history.push(LOGIN);
  };

  return (
    <>
      <Row>
        <Col>
          <Button onClick={toAddPost}>Add Post</Button>
        </Col>
        <Col>
          <Button onClick={() => logOut()}>Logout</Button>
        </Col>
      </Row>
      {error && <Alert variant="danger">{error.message}</Alert>}
      {!loading && <Posts posts={data.getPosts}></Posts>}
    </>
  );
};

export default Home;
