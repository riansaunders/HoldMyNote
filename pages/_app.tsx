import React, {  useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../client/theme";
import * as firebase from "firebase";
import { UserContext } from "../client/user.context";

const firebaseConfig = {
  apiKey: "AIzaSyDSgfivx0hHAty0ike8NeaeneaJFRJqCLQ",
  authDomain: "holdmynote.firebaseapp.com",
  databaseURL: "https://holdmynote.firebaseio.com",
  projectId: "holdmynote",
  storageBucket: "holdmynote.appspot.com",
  messagingSenderId: "53203351444",
  appId: "1:53203351444:web:d006bd8cc46a9a10164181",
  measurementId: "G-5XJ86FWHWB",
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default function MyApp(props: any) {
  const { Component, pageProps } = props;
  const [_user, _setUser] = useState<firebase.User>();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        _setUser(user);
      } else {
        _setUser(undefined);
      }
    });
  });

  const httpLink = createHttpLink({
    uri:
      process.env.NODE_ENV === "production"
        ? "https://holdmynote.com/api/graphql"
        : "http://localhost:3000/api/graphql",
  });

  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = firebase.auth().currentUser
      ? await firebase.auth().currentUser?.getIdToken()
      : "";
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <React.Fragment>
      <Head>
        <title>Hold My Note</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserContext.Provider
          value={{
            user: _user,
            signedIn: typeof _user !== "undefined",
          }}
        >
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </UserContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
