import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SigninValidation from "./SigninValidation";
import { auth, google, facebook } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  // const [helperText, setHelperText] = React.useState("");

  const [err, setErr] = useState(false);

  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  const handleChange = (event) => {
    setSigninData({
      ...signinData,
      [event.target.name]: event.target.value,
    });
  };

  // const login = async (provider) => {
  //   const result = await signInWithPopup(auth, provider);
  //   console.log(result);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(SigninValidation(signinData));
    setDataIsCorrect(true);
    setError("");

    // const email = e.target[0].value;
    // const password = e.target[1].value;
    signInWithEmailAndPassword(auth, signinData.email, signinData.password)
      .then(async (res) => {
        // setSubmitButtonDisabled(false);
        console.log(res);
        navigate("/eventslist");
      })
      .catch((err) => {
        // setSubmitButtonDisabled(false);
        setError(err.message);
      });
    // try {
    //   await signInWithEmailAndPassword(
    //     auth,
    //     signinData.email,
    //     signinData.password
    //   );
    //   navigate("/dashboard");
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     await logIn(email, password);
  //     navigate("/home");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && dataIsCorrect) {
  //     alert("login successfully");
  //     navigate("/eventslist");
  //   }
  // }, [errors]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <p className="error" variant="danger">
              {error}
            </p>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={signinData.email}
              onChange={handleChange}
              error={errors.email}
            />
            {errors.email && <p className="error">{errors.email}</p>}
            {/* /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={signinData.password}
              onChange={handleChange}
              error={errors.password}
            />
            {errors.password && <p className="error">{errors.password}</p>}
            {/* /> */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              // onClick={navigateToEventList}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  Don't have an account?Sign Up
                </Link>
                {/* <Link to="/signup">Don't have an account?Sign Up</Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* {err && <span>Something went wrong</span>} */}
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
