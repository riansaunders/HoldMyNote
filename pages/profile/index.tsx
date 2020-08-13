import Layout from "../../components/page-layout";
import PlaceholderCloud from "../../components/placeholder-cloud";
import NoteFeed from "../../components/note-feed";
import { UserContext } from "../../client/user.context";
import { Grid, Box, Divider } from "@material-ui/core";
import { useContext } from "react";

export default function ProfilePage() {
  const userContext = useContext(UserContext);

  return (
    <>
      {userContext.signedIn && (
        <Layout>
          <Grid container>
            <Grid item xs={1}>
              <PlaceholderCloud />
            </Grid>
            <Grid item xs={11}>
              <h3>{userContext.user?.displayName}</h3>
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
