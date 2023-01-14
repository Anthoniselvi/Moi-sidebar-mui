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
import { auth } from "./firebase";
import Validation from "./Validation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Home.css";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignUp() {
  const [signupData, setSignupData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateToSignIn = () => {
    navigate("/signin");
  };
  const updateHandleChange = (event) => {
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
  };
  //   const name = e.target[0].value;
  //   const mobile = e.target[1].value;
  //   const email = e.target[2].value;
  //   const password = e.target[3].value;

  //   try {
  //     const res = await createUserWithEmailAndPassword(auth, email, password);
  //     console.log(res);
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //     setErr(true);
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      alert("signup successfully");

      // navigate("/eventslist");
    }
  }, [errors]);

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
            Sign up
          </Typography>
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
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </Grid>
              {/* {errors.name && <p className="error">{errors.name}</p>} */}
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
                />
              </Grid>
              {errors.mobile && <p className="error">{errors.mobile}</p>}
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
                />
              </Grid>
              {errors.email && <p className="error">{errors.email}</p>}
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
                />
              </Grid>
              {errors.password && <p className="error">{errors.password}</p>}
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
                <Link href="#" variant="body2">
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
