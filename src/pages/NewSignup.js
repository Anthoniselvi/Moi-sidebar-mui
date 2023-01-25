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
// import { auth } from "./firebase";
import Validation from "./Validation";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "./Home.css";
import { useUserAuth } from "../Context/UserAuthContext";
import { auth, db, storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
const theme = createTheme();

export default function NewSignUp() {
  const [signupData, setSignupData] = useState({
    name: "",
    // age: "",
    // gender: "",
    // city: "",
    mobile: "",
    email: "",
    // username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [gender, setGender] = useState("");
  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const navigateToSignIn = () => {
    navigate("/signin");
  };
  const updateHandleChange = (event) => {
    // setErrors(Validation(signupData));

    setSignupData({
      ...signupData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    setErrors(Validation(signupData));
    setDataIsCorrect(true);
    setError("");

    // axios
    //   .post("http://localhost:2023/profile", {
    //     // id:
    //     name: signupData.name,
    //     age: signupData.age,
    //     gender: signupData.gender,
    //     city: signupData.city,
    //     mobile: signupData.mobile,
    //     email: signupData.email,
    //     username: signupData.username,
    //     password: signupData.password,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     // navigate("/eventslist");
    //   });

    createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
      .then(async (res) => {
        // setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: signupData.name,
        });
        // create Profile here
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          name: signupData.name,
          mobile: signupData.mobile,
          email: signupData.email,
          password: signupData.password,
        });
        navigate("/signin");
      })
      .catch((err) => {
        // setSubmitButtonDisabled(false);
        setError(err.message);
      });

    // try {
    //   await signUp(signupData.email, signupData.password);
    //   navigate("/");
    // } catch (err) {
    //   console.log(err);
    //   setErr(true);
    //   setLoading(false);
    //   setError(err.message);
    // }
  };
  // const handleSubmitSignup = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     await signUp(email, password);
  //     navigate("/");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && dataIsCorrect) {
  //     alert("signup successfully");
  //     navigate("/signin");
  //   }
  // }, [errors]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            // marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {error && (
            <p className="error" variant="danger">
              {error}
            </p>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitSignup}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={signupData.name}
                  onChange={updateHandleChange}
                  error={errors.name}
                  //   helperText={helperText}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  name="age"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  autoFocus
                  value={signupData.age}
                  onChange={updateHandleChange}
                  error={errors.age}
                  //   helperText={helperText}
                />
                {errors.age && <p className="error">{errors.age}</p>}
              </Grid>
              {/* {errors.name && <p className="error">{errors.name}</p>} */}
              {/* <Grid item xs={12}>
                <div className="radio-box">
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      Gender :
                    </FormLabel>
                    <RadioGroup
                      error={errors.gender}
                      required
                      value={signupData.gender}
                      // onChange={(e) => setSignupData.gender(e.target.value)}
                      onChange={updateHandleChange}
                    > */}
              {/* <div className="radio-button">
                        <FormControlLabel
                          control={<Radio />}
                          label="Male"
                          value="male"
                          checked={signupData.gender === "male"}

                          // onChange={(e) => setSelected(e.target.value)}
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label="Female"
                          value="female"
                          checked={signupData.gender === "female"}

                          // onChange={(e) => setSelected(e.target.value)}
                        />
                      </div> */}
              {/* </RadioGroup>
                  </FormControl>
                </div>
                {errors.gender && <p className="error">{errors.gender}</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  value={signupData.city}
                  onChange={updateHandleChange}
                  error={errors.city}
                />
                {errors.city && <p className="error">{errors.city}</p>}
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
                  autoComplete="mobile-number"
                  value={signupData.mobile}
                  onChange={updateHandleChange}
                  error={errors.mobile}
                />
                {errors.mobile && <p className="error">{errors.mobile}</p>}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={signupData.email}
                  onChange={updateHandleChange}
                  error={errors.email}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={signupData.username}
                  onChange={updateHandleChange}
                  error={errors.username}
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </Grid> */}

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={signupData.password}
                  onChange={updateHandleChange}
                  error={errors.password}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I confirm the above details."
                />
              </Grid>
            </Grid>
            <Button
              // onClick={navigateToSignIn}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
