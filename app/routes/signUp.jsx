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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../root";
import { useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  let navigate = useNavigate();

  // Syles for sign in card
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  //State initialzation
  const [nameState, setNameState] = useState();
  const [emailState, setEmail] = useState();
  const [passwordState, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  function onSignUpClick(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // TODO upate displayName
        await updateProfile(auth.currentUser, { displayName: nameState });
        console.log(user.uid);
        console.log(user.displayName);
        await setDoc(doc(db, "Users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          role: "guest",
        });
        return navigate("/profile");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // Error alert component
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
            <h2>Create account</h2>
          </Grid>
          <TextField
            margin="dense"
            label="Name"
            placeholder="Enter name"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => {
              setNameState(e.target.value);
              console.log(nameState);
            }}
          />
          <TextField
            margin="dense"
            label="Email"
            placeholder="Enter Email"
            variant="outlined"
            type="email"
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
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={() => onSignUpClick(emailState, passwordState)}
          >
            Sign up
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default SignUp;
