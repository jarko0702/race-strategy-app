import { Button } from "@mui/material";
import Header from "../components/header";
import { auth, db } from "../root";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

export function meta({}) {
  return [
    { title: "Race Strategy App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Profile() {
  let navigate = useNavigate();
  const user = auth.currentUser;
  const [userRole, setUserRole] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        return navigate("/signin");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (user == null) {
    return (
      <>
        <Header />
        <h1>No user signed in</h1>
      </>
    );
  } else {
    useEffect(
      () =>
        getDoc(doc(db, "Users", user.uid))
          .then((querySnapshot) => {
            const docData = querySnapshot.data();
            setUserRole(docData.role);
          })
          .catch((error) => {
            console.log(error);
          }),
      []
    );
    return (
      <>
        <Header />
        <h1>{user.uid}</h1>
        <h1>{user.email}</h1>
        <h1>{user.displayName}</h1>
        <h1>{userRole}</h1>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </>
    );
  }
}
