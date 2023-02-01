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
import { useNavigate, useSearchParams } from "react-router-dom";
import SigninValidation from "./SigninValidation";
import { auth, google, facebook } from "./firebase";

import { signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useUserAuth } from "../Context/UserAuthContext";
import axios from "axios";

const theme = createTheme();

export default function SignIn() {
  const { googleSignIn, user } = useUserAuth();
  const navigate = useNavigate();
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const [value, setValue] = useState();
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  // const [helperText, setHelperText] = React.useState("");

  const [err, setErr] = useState(false);

  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");

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

  const handleClick = async () => {
    try {
      await googleSignIn();
      axios
        .post("http://localhost:2023/profile", {
          id: user.uid,
          name: user.displayName,
          email: user.email,
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          console.log(response.data.id);
          navigate(`/eventslist?id=${id}`);
        });

      // signInWithPopup(auth, provider).then((data) => {
      //   setValue(data.user.email);
      // localStorage.setItem("email", data.user.email);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(SigninValidation(signinData));
    setDataIsCorrect(true);
    setError("");

    signInWithEmailAndPassword(auth, signinData.email, signinData.password)
      .then(async (res) => {
        console.log(res);
        navigate(`/eventslist?id=${res.user.uid}`);
      })
      .catch((err) => {
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
          <Button
            onClick={handleClick}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In with Google
          </Button>
        </Box>
        {/* {err && <span>Something went wrong</span>} */}
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
