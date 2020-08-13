import Head from "next/head";
import NoteEditor from "../components/note-editor";
import Sidebar from "../components/sidebar";

import { Box, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      margin: `0 50px`,
      display: "flex",
    },
    content: {
        width: "600px",
        maxWidth: "600px",
        marginLeft: theme.spacing(30),
        marginTop: theme.spacing(10),
      },

    [theme.breakpoints.up("xl")]: {
      container: {
        margin: "0 300px",
      },
    },
  })
);

export interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Head>
        <title>HoldMyNote</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <aside>
        <Sidebar />
      </aside>
      <main>
          <Box className={classes.content}>
          {props.children}
          </Box>
      </main>
    </Box>
  );
}
