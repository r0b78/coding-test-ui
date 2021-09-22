import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

import { HOME } from '../../routes';
import { useAuth } from '../../shared/context/auth.context';
import { uploadFile } from '../../shared/services/uploadFile';
import { GET_POSTS } from '../Home';

import './style.css';

const SAVE_POST = gql`
  mutation savePost($name: String!, $description: String!, $filePath: String) {
    savePost(data: { name: $name, description: $description, filePath: $filePath }) {
      id
      name
      description
      filePath
    }
  }
`;

export const SavePost = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inform, setInform] = useState('');

  const [savePost] = useMutation(SAVE_POST);

  const { currentUser } = useAuth();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || description === '') alert('Please add a name and description');

    try {
      const uploadedFile = file ? await uploadFile(currentUser, file) : null;
      setLoading(true);
      await savePost({
        variables: {
          name,
          description,
          filePath: uploadedFile,
        },
        refetchQueries: [
          {
            query: GET_POSTS,
          },
        ],
      });
      setInform('Saved succesfully');
    } catch (e) {
      console.log('error', e);
      setError('Failed to Save it');
    }
    setName('');
    setDescription('');
    setFile(null);
    setLoading(false);
  };

  const backToPosts = async () => {
    history.push(HOME);
  };

  return (
    <Container fluid="md">
      {inform && <Alert variant="success">{inform}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" size="lg" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <Row>
          <Button className="save-button" block size="lg" type="submit" disabled={loading}>
            Save
          </Button>
        </Row>
      </Form>
      <Row>
        <Button className="back-home-button" onClick={backToPosts}>
          Back to Posts
        </Button>
      </Row>
    </Container>
  );
};
