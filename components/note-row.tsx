import {
  Grid,
  makeStyles,
  createStyles,
  IconButton,
  Checkbox as MuiCheckbox,
  InputBase as MuiInputBase,
} from "@material-ui/core";

import {
  Close
} from "@material-ui/icons"

import {
  useState
} from "react"

import { INoteItem } from "../client/note"

interface NoteRowProps {
  item: INoteItem;
  onDeleteClicked: Function;
  onCheckClicked: Function;
  onContentChanged: Function;
}

const noteStyles = makeStyles((theme) =>
  createStyles({
    deleteButton: {
      // visibility: "hidden",
    },
    completed: {
      textDecoration: "line-through"
    },
    noteRow: {
      "&:hover + .deleteButton": {
        visibility: "visible",
      },
    },
  })
);

export const NoteItem = (props: NoteRowProps) => {
  const classes = noteStyles();

  const todo = props.item;
  const [content, setContent] = useState(todo.content);
  const [completed, setCompleted] = useState(todo.complete);
  const [deleted, setDeleted] = useState(false);
  return (
    <>
      {!deleted && (
        <Grid container className={classes.noteRow}>
          <Grid item xs={1}>
            <MuiCheckbox
              onClick={() => {
                setCompleted(!completed);
                // Nope, totally not hacky at all. Nope. But more performant
                todo.complete = !completed;

                props.onCheckClicked();
              }}
              size="small"
              checked={completed === true}
            />
          </Grid>
          <Grid item xs={10}>
            <MuiInputBase
              autoFocus
              value={content}
              className={completed ? classes.completed : ''}
              onChange={(e) => {
                const newContent = e.target.value; 
                if (newContent.length < 1) {
                  setDeleted(true);
                  props.onDeleteClicked();
                  return;
                }

                todo.content = newContent;
                setContent(newContent);
                props.onContentChanged(newContent);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              className={classes.deleteButton}
              tabIndex={-1}
              onClick={() => {
                setDeleted(true);
                props.onDeleteClicked();
              }}
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default NoteItem