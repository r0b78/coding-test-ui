import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { HOME } from '../../routes';

import { useAuth } from '../../shared/context/auth.context';

import './style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      history.push(HOME);
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  }

  return (
    <Container fluid="md">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={loading}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
