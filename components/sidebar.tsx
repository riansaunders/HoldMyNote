import {
  Button,
  Grid,
  Box,
  makeStyles,
  createStyles,
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
import Link from "next/link";

import { Formik, Form, Field } from "formik";

import { useState, useContext } from "react";

import firebase from "firebase";

import { UserContext } from "../client/user.context";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      margin: `0 50px`,
      display: "flex",
    },
    sidebarItem: {
      height: "60px",
      width: "226px",
      borderRadius: "20px",
      "& .MuiButton-label": {
        marginLeft: "1em",
        justifyContent: "normal",
        fontSize: "14px",
      },
    },
    content: {
      // left: "226px",
      width: "600px",
      maxWidth: "600px",
      marginLeft: theme.spacing(30),
      marginTop: theme.spacing(10),
    },
    sidebar: {
      position: "fixed",
      height: "100%",
    },
    sidebarContainer: {
      maxWidth: theme.spacing(28),
      borderRight: "1px solid #e6e6e6",
      width: "270px",
      height: "100vh",
      paddingTop: theme.spacing(4),
    },
    noteInputContainer: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      overflowY: "auto",
      maxHeight: "400px",
    },
    titleInput: {
      position: "sticky",
      zIndex: 1000,
      fontSize: "30px",
    },

    contentInputContainer: {
      border: "1px solid #e6e6e6",
      borderRadius: "5px",
    },
    contentInput: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      fontSize: "18px",
      lineHeight: "1.5em",
    },

    editor: {
      // border: "1px solid #ebebeb"
    },

    [theme.breakpoints.up("xl")]: {
      container: {
        margin: "0 300px",
      },
    },
  })
);

export function Sidebar() {
  const classes = useStyles();

  const userContext = useContext(UserContext);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  return (
    <>
      <aside className={classes.sidebar}>
        <nav>
          <h3>HoldMyNote</h3>
        </nav>

        <Box className={classes.sidebarContainer}>
          <Grid container direction="row">
            <Grid item md={12}>
              <Link href="/" passHref>
                <Button className={classes.sidebarItem} startIcon={<NoteAdd />}>
                  New Note
                </Button>
              </Link>
            </Grid>
            <Grid item md={12}>
              <Link href="/feed" passHref>
                <Button className={classes.sidebarItem} startIcon={<History />}>
                  Feed
                </Button>
              </Link>
            </Grid>

            {!userContext.user && (
              <>
                <Grid item md={12}>
                  <Button
                    className={classes.sidebarItem}
                    startIcon={<ExitToApp />}
                    onClick={() => setSignInOpen(true)}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid item md={12}>
                  <Button
                    className={classes.sidebarItem}
                    startIcon={<PersonAdd />}
                    onClick={() => setSignUpOpen(true)}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </>
            )}

            {userContext.user && (
              <>
                <Grid item md={12}>
                  {/* FIXME: This is null immediately after signing in, not a big deal. */}
                  <Link href={`/profile/`} passHref>
                    <Button
                      className={classes.sidebarItem}
                      startIcon={<AccountCircle />}
                    >
                      Profile
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={12}>
                  <Box marginTop={5} />
                  <Divider />
                </Grid>
                <Grid item md={12}>
                  <Box marginTop={1} />
                  <Button
                    className={classes.sidebarItem}
                    onClick={() => firebase.auth().signOut()}
                  >
                    Sign Out
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box marginTop={2} />
            <a href="https://riansaunders.com">
              Made by Rian Saunders
            </a>

          </Grid>
        </Box>
      </aside>
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
}

export default Sidebar;
