import { Button, Card, Grid, CardContent, Typography, TextField } from "@material-ui/core";
import './CustomSignIn.css';
import firebase from "./../../firebase/init";
import { makeStyles } from '@material-ui/styles';
import { useState } from "react";

const useStyles = makeStyles({
  inputBox: {
    marginBottom: "12px",
    width: '100%'
  },
});

const CustomSignIn = () => {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    isSignIn: false,
    isError: false
  })

  const handleInput = (event) => {
    console.log(event.target.name, event.target.value);
  }
  return (
    <Grid item md={6}>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ marginBottom: "20px" }}
          >
            Sign In with Email & Password
          </Typography>
          <form autoComplete="off">
            <TextField
              id="outlined-basic"
              className={classes.inputBox}
              label="Email"
              variant="outlined"
              type="text"
              name="email"
              onBlur={handleInput}
            />
            <TextField
              id="outlined-basic"
              className={classes.inputBox}
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              onBlur={handleInput}
            />
            <Button variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CustomSignIn;
