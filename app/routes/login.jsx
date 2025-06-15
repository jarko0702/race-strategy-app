import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Header from "../components/header";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  // Syles for sign in card
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const [emailState, setEmail] = useState();
  const [passwordState, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const auth = getAuth();

  function onSignInClick(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(error.message);
        // ..
      });
  }

  function Error({ errorMessage }) {
    if (!errorMessage) {
      return <></>;
    } else {
      return <Alert severity="error">{errorMessage}</Alert>;
    }
  }

  return (
    <>
      <Header />
      <Error errorMessage={errorMessage} />
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <TextField
            margin="dense"
            label="Username"
            placeholder="Enter username"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={() => onSignInClick(emailState, passwordState)}
          >
            Sign in
          </Button>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
