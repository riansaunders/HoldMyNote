import { INote } from "../client/note";
import {
  Grid,
  Box,
  makeStyles,
  createStyles,
  Checkbox,
} from "@material-ui/core";
import NoteInsight from "./note-insight";

export interface NotePreviewProps {
  note: INote;
}

const useStyles = makeStyles((theme) =>
  createStyles({
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

export default function NotePreview(props: NotePreviewProps) {
  const classes = useStyles();
  const note = props.note;

  return (
    <>
      <NoteInsight note={note} />

      <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <Box className={classes.previewContainer}>
            {note.items.map((item) => {
              return (
                <>
                  <Checkbox checked={item.complete} disableRipple />
                  {item.content}
                  <br />
                </>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
