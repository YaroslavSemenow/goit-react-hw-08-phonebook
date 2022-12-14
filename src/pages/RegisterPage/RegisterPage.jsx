import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authOperations, authSelectors } from 'redux/auth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Avatar,
  CssBaseline,
  TextField,
  Grid,
  Container,
  Typography,
  Box,
} from '@mui/material';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector(authSelectors.getIsLoading);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (password.length < 7) {
      toast.error('Password is shorter than the minimum allowed length (7).');
      return;
    }

    await dispatch(authOperations.register({ name, email, password })).unwrap();

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                autoComplete="given-name"
                name="name"
                value={name}
                type="text"
                required
                fullWidth
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                type="email"
                label="Email"
                name="email"
                value={email}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                name="password"
                value={password}
                label="Password"
                type="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            loading={isLoading}
            loadingIndicator="Please wait..."
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create your account
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="../login" style={{ color: 'rgb(22, 102, 183)' }}>
                <Typography variant="body2" component="span">
                  Already have an account? Log in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
