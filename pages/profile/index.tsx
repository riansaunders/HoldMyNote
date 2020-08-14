import Layout from "../../components/page-layout";
import PlaceholderCloud from "../../components/placeholder-cloud";
import NoteFeed from "../../components/note-feed";
import { UserContext } from "../../client/user.context";
import { Grid, Box, Divider, Typography } from "@material-ui/core";
import { useContext } from "react";
import Router from "next/router";

import {Person} from "@material-ui/icons"

export default function ProfilePage() {
  const userContext = useContext(UserContext);

  if (!userContext.signedIn && typeof window !== 'undefined') {
    Router.push("/");
    return <pre>Redirecting...</pre>
  }

  return (
    <>
      {userContext.signedIn && (
        <Layout>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">@{userContext.user?.displayName}</Typography>
              <Box marginBottom={3} />
              <Divider />
              <Box marginBottom={3} />
            </Grid>
            <Grid item xs={12}>
              <NoteFeed targetUser={userContext.user?.uid} />
            </Grid>
          </Grid>
        </Layout>
      )}
    </>
  );
}
