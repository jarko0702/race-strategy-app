import { Box, Typography } from "@mui/material";
import Header from "../components/header";
import { auth, db } from "../root";
import FullFeaturedCrudGrid from "../components/userList";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export function meta({}) {
  return [
    { title: "Admin | Race Strategy App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Admin() {
  const [userRole, setUserRole] = useState();

  if (auth.currentUser !== null) {
    getDoc(doc(db, "Users", auth.currentUser.uid))
      .then((querySnapshot) => {
        const docData = querySnapshot.data();
        setUserRole(docData.role);
      })
      .catch((error) => {
        console.log(error);
      });
    if (userRole == "admin") {
      return (
        <>
          <Header />
          <Box padding={2}>
            <Typography variant="h4" component="h4">
              Admin page
            </Typography>
            <Typography variant="subtitle1" marginBottom={2}>
              Admin can make changes to every users role. Personal details e.g.
              name and email adress can only be changed by the user them self.
            </Typography>
            <FullFeaturedCrudGrid />
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Header />
          <Typography>You do not have the admin role</Typography>
        </>
      );
    }
  } else {
    return (
      <>
        <Header />
        <Typography>you are not logged in</Typography>
      </>
    );
  }
}
