import { Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomSignIn from "./components/CustomSignIn/CustomSignIn";
import GoogleSignIn from "./components/GoogleSignIn/GoogleSignIn";


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
      <Grid container spacing={2}>
        <GoogleSignIn />
        <CustomSignIn />
      </Grid>
    </Container>
  );
};

export default App;
