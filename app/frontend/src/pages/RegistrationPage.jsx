import { Formik, Form, Field } from 'formik';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { register } from '@services/AuthService';
import CustomContainer from '@common/CustomContainer';
import registrationValidationSchema from '@validations/registrationValidation';

export default function RegistrationPage() {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { user, token } = await register(values);
      localStorage.removeItem('favouriteSongs');
      localStorage.setItem('user_id', user.id);
      localStorage.setItem('token', token);
      window.location.href = '/';
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CustomContainer>
      <Container maxWidth="xs">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Formik
            initialValues={{ email: '', name: '', password: '' }}
            validationSchema={registrationValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form>
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </CustomContainer>
  );
}
