// import firebase from "firebase/app";
// import "firebase/auth";
import { Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebaseConfig from "./firebase.config";

// firebase.initializeApp(firebaseConfig);

const useStyle = makeStyles({
  header: {
    marginBottom: "20px",
  },
});

const App = () => {
  const classes = useStyle();
  return (
    <Container maxWidth="md" align="center">
      <Typography variant="h4" className={classes.header}>
        Firebase Authentication App
      </Typography>
      <Button variant="contained" color="primary">
        Sign In With Google
      </Button>
    </Container>
  );
};

export default App;
