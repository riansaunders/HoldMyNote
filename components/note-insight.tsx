import { INote } from "../client/note";

import {
  Grid,
  styled,
  Box,
  Typography,
  Button,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { Cloud, Edit, Launch } from "@material-ui/icons";
import Link from "next/link";
import PlaceholderCloud from "../components/placeholder-cloud";

export interface NoteInsightProps {
  note: INote;
  hideControls?: boolean;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      margin: 0,
    },
    recentInfo: {
      margin: 0,
      color: "rgba(0,0,0,0.4)",
    },
    previewContainer: {
      border: "1px solid #e6e6e6",
      borderRadius: "9px",
      height: "140px",
      overflow: "hidden",
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  })
);

export default function NoteInsight(props: NoteInsightProps) {
  const classes = useStyles();
  const note = props.note;
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <PlaceholderCloud />
        </Grid>
        <Grid item xs={11}>
          <Grid container justify="space-between">
            <Grid item>
              <h3 className={classes.heading}>{note.title}</h3>
            </Grid>
            <Grid item>
              {!props.hideControls && (
                <Grid container>
                  <Grid item>
                    <Link href={`/edit/${note.id}`} passHref>
                      <Button startIcon={<Edit />} size="small">
                        Edit
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Button startIcon={<Launch />} size="small">
                      Share
                    </Button>
                  </Grid>
                  <Grid item>
                    <Link href={`/note/${note.id}`} passHref>
                      <Button size="small">View</Button>
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" className={classes.recentInfo}>
                {note.author}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
