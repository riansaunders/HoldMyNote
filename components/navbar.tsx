import React, { useState, useContext } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
  IconButton,
  Theme,
  Tooltip,
  Menu,
  MenuItem,
  Box,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import {
  NoteAdd,
  History,
  ExitToApp,
  PersonAdd,
  AccountCircle,
} from "@material-ui/icons";
import { ToggleButton, Alert } from "@material-ui/lab";
import {
  TextField,
  Checkbox,
  CheckboxWithLabel,
  InputBase,
} from "formik-material-ui";
import { mixed, object, string } from "yup";
import { Formik, Form, Field } from "formik";
import { UserContext } from "../client/user.context";

import Link from "next/link";
import firebase from "firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: "black",
    },
    grow: {
      flexGrow: 1,
    },
    icon: {
      color: "white",
      "&:hover": {
        color: "black",
        backgroundColor: "white",
      },
    },
    toolbar: {
      justifyContent: "space-between",
    },
    toolbarCt: {
      //   margin: "0 auto",
      maxWidth: "1100px",
      justifyContent: "center",
      justifyItems: "center",
      display: "flex",
    },
  })
);

export const NavBar: React.FC = () => {
  const classes = useStyles();

  const userContext = useContext(UserContext);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <a style={{color: "white", textDecoration: "none"}}>
              <Typography variant="h6" noWrap>
                HoldMyNote
              </Typography>
            </a>
          </Link>
          <div className={classes.grow} />
          <Link href="/">
            <a>
              <Tooltip title="Add Note">
                <IconButton className={classes.icon}>
                  <NoteAdd />
                </IconButton>
              </Tooltip>
            </a>
          </Link>
          <Link href="/feed">
            <a>
              <Tooltip title="Feed">
                <IconButton className={classes.icon}>
                  <History />
                </IconButton>
              </Tooltip>
            </a>
          </Link>
          {!userContext.signedIn && (
            <>
              <Tooltip title="Sign In">
                <IconButton
                  className={classes.icon}
                  onClick={() => setSignInOpen(true)}
                >
                  <ExitToApp />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sign Up">
                <IconButton
                  className={classes.icon}
                  onClick={() => setSignUpOpen(true)}
                >
                  <PersonAdd />
                </IconButton>
              </Tooltip>
            </>
          )}
          {userContext.signedIn && (
            <>
              <Tooltip title="My Account">
                <IconButton className={classes.icon} onClick={handleMenuOpen}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                open={menuOpen}
                onClose={handleMenuClose}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                // transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Link href="/profile">
                  <a style={{ textDecoration: "none", color: "black" }}>
                    <MenuItem>{userContext.user?.displayName}</MenuItem>
                  </a>
                </Link>
                <Divider />
                <MenuItem onClick={() => firebase.auth().signOut()}>
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Dialog open={signUpOpen} onClose={() => setSignUpOpen(false)}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              username: "",
              password: "",
              email: "",
            }}
            validationSchema={object().shape({
              username: string()
                .min(3, "Minimum length of 3")
                .required("Please enter a username"),
              password: string().required("Please enter a password"),
              email: string().email().required("Please enter a valid email"),
            })}
            onSubmit={(values, actions) => {
              setErrorMessage("");
              firebase
                .auth()
                .createUserWithEmailAndPassword(values.email, values.password)
                .then((creds) => {
                  if (creds?.user) {
                    creds.user.updateProfile({
                      displayName: values.username,
                    });
                    setSignUpOpen(false);
                  }
                })
                .catch((error) => {
                  const code = error.code;
                  const message = error.message;

                  console.log(code);
                  console.log(message);

                  setErrorMessage(message);

                  actions.setSubmitting(false);
                });
            }}
          >
            <Form>
              {errorMessage && (
                <>
                  <Box marginBottom={2}>
                    <Alert severity="error">{errorMessage}</Alert>
                  </Box>
                </>
              )}

              <Field
                component={TextField}
                name="username"
                fullWidth
                label="Username"
                type="text"
              />
              <Field
                component={TextField}
                name="email"
                fullWidth
                label="Email"
                type="email"
              />

              <Field
                component={TextField}
                fullWidth
                name="password"
                label="Password"
                type="password"
              />
              <DialogActions>
                <Button
                  onClick={() => {
                    setSignUpOpen(false);
                    setErrorMessage("");
                  }}
                >
                  Close
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Sign In
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
      <Dialog open={signInOpen} onClose={() => setSignInOpen(false)}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              password: "",
              email: "",
            }}
            validationSchema={object().shape({
              password: string().required("Please enter your password"),
              email: string().email().required("Please enter your email"),
            })}
            onSubmit={(values, actions) => {
              setErrorMessage("");
              firebase
                .auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then(() => {
                  setSignInOpen(false);
                })
                .catch((error) => {
                  const code = error.code;
                  const message = error.message;

                  console.log(code);
                  console.log(message);

                  setErrorMessage(message);

                  actions.setSubmitting(false);
                });
            }}
          >
            <Form>
              {errorMessage && (
                <>
                  <Box marginBottom={2}>
                    <Alert severity="error">{errorMessage}</Alert>
                  </Box>
                </>
              )}
              <Field
                component={TextField}
                name="email"
                fullWidth
                label="Email"
                type="email"
              />

              <Field
                component={TextField}
                fullWidth
                name="password"
                label="Password"
                type="password"
              />
              <DialogActions>
                <Button
                  onClick={() => {
                    setSignInOpen(false);
                    setErrorMessage("");
                  }}
                >
                  Close
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Sign In
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavBar;
