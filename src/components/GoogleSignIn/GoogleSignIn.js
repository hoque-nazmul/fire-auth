import {
  Button,
  Card,
  Grid,
  CardContent,
  Typography,
  Box
} from "@material-ui/core";
import firebase from "./../../firebase/init";
import { useState } from "react";
const provider = new firebase.auth.GoogleAuthProvider();

const GoogleSignIn = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    isSignIn: false,
    isError: false,
  });
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        setUser({
          name: user.displayName,
          image: user.photoURL,
          email: user.email,
          isSignIn: true,
          isError: false,
        });
      })
      .catch((error) => {
        setUser({
          name: "",
          image: "",
          email: "",
          isSignIn: false,
          isError: error.message,
        });
      });
  };
  const handleGoogleSignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        setUser({name: '', image: '', email: '', isSignIn: false, isError: false})
      })
      .catch(err => {
        setUser({name: '', image: '', email: '', isSignIn: false, isError: err.message})
      })
  }
  return (
    <Grid item md={6}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Sign In with Google
          </Typography>
          {user.isSignIn ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGoogleSignOut}
            >
              Sign Out With Google
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoogleSignIn}
            >
              Sign In With Google
            </Button>
          )}
          {user.isSignIn && (
            <Box mt={2}>
              <Typography variant="h4">{user.name}</Typography>
              <Typography variant="p">{user.email}</Typography>
              <img
                src={user.image}
                alt="user-photo"
                style={{ display: "block", marginTop: "10px" }}
                width="100px"
                height="100px"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default GoogleSignIn;
