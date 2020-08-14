import Head from "next/head";
import NoteEditor from "../components/note-editor";
import Sidebar from "../components/sidebar";
import NavBar from "../components/navbar";
import { Box, makeStyles, createStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      // margin: `0 auto`,
    },
    content: {
      margin: '0 auto',
      maxWidth: "600px",
      // width: "600px",
      // maxWidth: "600px",
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
    <>
    <NavBar />
      <Box className={classes.container}>
        <Head>
          <title>HoldMyNote</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box className={classes.content}>{props.children}</Box>
      </Box>
    </>
  );
}
