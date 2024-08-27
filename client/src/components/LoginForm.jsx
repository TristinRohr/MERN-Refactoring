import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'; // Importing necessary components from React Bootstrap

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; // Importing the GraphQL mutation for logging in a user

import Auth from '../utils/auth'; // Importing the authentication utility

// Component for the login form
const LoginForm = () => {
  // State to manage the user's form input
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  
  // State to manage form validation status
  const [validated] = useState(false);
  
  // State to control the visibility of the alert message
  const [showAlert, setShowAlert] = useState(false);

  // useMutation hook to run the LOGIN_USER mutation
  const [login, { error }] = useMutation(LOGIN_USER);

  // Effect hook to show the alert if there's an error with the login mutation
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  // Function to handle input changes and update state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation(); // Stop further event propagation if the form is invalid
    }

    try {
      // Execute the login mutation and pass the form data as variables
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token); // Log the user in if the mutation is successful
    } catch (e) {
      console.error(e); // Log any errors
    }

    // Clear form values after submission
    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* Form element with no validation applied initially, and a submit handler */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Alert component that shows an error message if login fails */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>

        {/* Form group for the email input field */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        {/* Form group for the password input field */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        {/* Submit button that is disabled unless both fields are filled */}
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;