import { Button, Card, Grid, CardContent, Typography, TextField, FormControlLabel, Checkbox } from "@material-ui/core";
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
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    isSignIn: '',
    isError: ''
  });

  let isValid = false;
  const handleInput = (event) => {
    if (event.target.name === 'email') {
      isValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      isValid = event.target.value.length >= 6;
    }
    if (isValid) {
      const newUser = { ...user }
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogged) {
      if (user.email && user.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
              const newUser = { ...user };
              newUser.isSignIn = "User Sign in Successfully!";
              setUser(newUser);
              e.target.reset();
            })
            .catch((error) => {
              const newUser = { ...user };
              newUser.isSignIn = false;
              newUser.isError = error.message;
              setUser(newUser);
            });
      }
    } else {
      if (user.email && user.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password)
          .then((userCredential) => {
            const newUser = { ...user };
            newUser.isSignIn = "User Created Successfully!";
            setUser(newUser);
            e.target.reset();
          })
          .catch((error) => {
            const newUser = { ...user };
            newUser.isSignIn = false;
            newUser.isError = error.message;
            setUser(newUser);
          });
      }
    }
  }
  return (
    <Grid item md={6}>
      <Card>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            style={{ marginBottom: "15px" }}
          >
            Sign In with Email & Password
          </Typography>
          {user.isSignIn && (
            <Typography
              variant="p"
              style={{ marginBottom: "10px", color: "green", display: 'block' }}
            >
              {user.isSignIn}
            </Typography>
          )}
          {user.isError && (
            <Typography
              variant="p"
              style={{ marginBottom: "10px", color: "red", display: 'block' }}
            >
              {user.isError}
            </Typography>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={isLogged}
                onChange={() => setLogged(!isLogged)}
                name="checkedB"
                color="primary"
              />
            }
            label="Already Have an Account!"
          />
          <form onSubmit={handleSubmit}>
            {!isLogged && (
              <TextField
                id="outlined-basic"
                className={classes.inputBox}
                label="Name"
                variant="outlined"
                type="text"
                name="name"
                onBlur={handleInput}
              />
            )}
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
            {isLogged ? (
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Sign In
              </Button>
            ) : (
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Sign Up
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CustomSignIn;
