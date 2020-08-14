import { INoteItem, INote } from "../client/note";
import {
  Button,
  Grid,
  Box,
  makeStyles,
  createStyles,
  Tooltip,
  IconButton,
  Checkbox as MuiCheckbox,
  TextField as MuiTextField,
  InputBase as MuiInputBase,
} from "@material-ui/core";
import { Add, Delete, Face, Lock, Notes, Toc, Close } from "@material-ui/icons";
import {
  TextField,
  Checkbox,
  CheckboxWithLabel,
  InputBase,
} from "formik-material-ui";

import { useRouter } from "next/router";
import { ToggleButton } from "./toggle-button";
import { Formik, Form, Field } from "formik";
import { useState, useContext } from "react";

import { Alert } from "@material-ui/lab";

import NoteItem from "./note-row";

import { UserContext } from "../client/user.context";

import { gql, useMutation } from "@apollo/client";

interface NoteEditorProps {
  note?: INote;
}

const useStyles = makeStyles((theme) =>
  createStyles({
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
  })
);

const CREATE_NOTE = gql`
  mutation CreateNote($input: NoteInput!) {
    createNote(input: $input) {
      id
    }
  }
`;
const UPDATE_NOTE = gql`
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      id
    }
  }
`;

export default function NoteEditor(props: NoteEditorProps) {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const [error, setTheError] = useState<string>("");
  const router = useRouter();
  const note = props.note;

  const [theTodos, setTheTodos] = useState<INoteItem[]>([]);
  const [updateNote, updateResult] = useMutation(UPDATE_NOTE);
  const [createNote, createResult] = useMutation(CREATE_NOTE);

  const initTodoString: string =
    note?.items.map((todo) => todo.content + "\n").join() || "";

  return (
    <>
      <Box>
        <Formik
          initialValues={{
            title: note?.title || "",
            todos: note?.items || [],
            isPrivate: note?.isPrivate || false,
            isAnonymous: note?.isAnonymous || false,
            isListView: note?.isListView || true,
            raw: initTodoString,
          }}
          onSubmit={(values, actions) => {
            let items = theTodos;

            // There are no 'cached' items and nothing in the 'raw' input
            if (items.length < 1 && values.raw.length < 1) {
              setTheError("Please add at least one thing to note.");
              actions.setSubmitting(false);
              return;
            }
            // we're working with the raw here
            // Got to parse the raw input :-)
            if (items.length < 1) {
              const nL: INoteItem[] = [];
              values.raw.split("\n").map((val, idx) => {
                const cont = val.trim();
                if (cont.length < 1) return;
                nL.push({
                  id: idx,
                  content: cont.trim(),
                  complete: false,
                });
              });
              items = nL;
            }

            //We had a note, we're updating it.
            //FIXME: Not DRY
            if (note) {
              updateNote({
                variables: {
                  input: {
                    id: note.id,
                    title: values.title || "Untitled",
                    isPrivate: values.isPrivate,
                    isAnonymous: values.isAnonymous,
                    isList: values.isListView,
                    itemsInput: items.map((item) => {
                      return {
                        content: item.content,
                        complete: item.complete,
                      };
                    }),
                  },
                },
              })
                .then((data) => {
                  console.log("DONE");
                  router.push(`/note/${data.data.updateNote.id}`);
                  actions.setSubmitting(false);
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              createNote({
                variables: {
                  input: {
                    title: values.title || "Untitled",
                    isPrivate: values.isPrivate,
                    isAnonymous: values.isAnonymous,
                    isList: values.isListView,
                    itemsInput: items.map((item) => {
                      return {
                        content: item.content,
                        complete: item.complete,
                      };
                    }),
                  },
                },
              })
                .then((data) => {
                  console.log("DONE");
                  console.log(data);
                  router.push(`/note/${data.data.createNote.id}`);
                  actions.setSubmitting(false);
                })
                .catch((error) => {
                  console.error(error);
                });
            }
            actions.setSubmitting(false);
          }}
        >
          {({ errors, values, setFieldValue }) => (
            <Form>
              {error && <Alert severity="error">{error}</Alert>}
              <Grid container>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    className={classes.titleInput}
                    name="title"
                    label="Title"
                    placeholder="Untitled"
                    fullWidth
                    size="large"
                    style={{ flexGrow: 1 }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Box marginTop={1} />
              {!values.isListView && (
                <Box className={classes.contentInputContainer}>
                  <Field
                    component={InputBase}
                    className={classes.contentInput}
                    onBlur={() => alert("hi")}
                    name="raw"
                    rows={5}
                    rowsMax={30}
                    multiline
                    fullWidth
                  />
                </Box>
              )}
              {values.isListView && (
                <>
                  <Box className={classes.noteInputContainer}>
                    {theTodos.map((todo: INoteItem, index: number) => {
                      return (
                        <>
                          <NoteItem
                            key={todo.id}
                            item={todo}
                            onContentChanged={() => {}}
                            onCheckClicked={() => {}}
                            onDeleteClicked={() => {
                              const idx = theTodos.findIndex(
                                (note) => note.id == todo.id
                              );
                              theTodos.splice(idx, 1);
                              // It already is deleted optimistically on the UI
                            }}
                          />
                        </>
                      );
                    })}
                  </Box>
                  <Grid container>
                    <Grid item xs={1}>
                      <Box textAlign="center">
                        <Add fontSize="small" />
                      </Box>
                    </Grid>
                    <Grid item xs={10}>
                      <MuiTextField
                        placeholder="List Item"
                        autoFocus
                        fullWidth
                        onChange={(e) => {
                          const val = e.target.value;
                          setTheTodos([
                            ...theTodos,
                            {
                              id: theTodos.length + 1,
                              content: val,
                              complete: false,
                            },
                          ]);
                          setFieldValue("todos", [
                            ...theTodos,
                            {
                              id: theTodos.length + 1,
                              content: val,
                              complete: false,
                            },
                          ]);
                          e.target.value = "";
                          e.target.blur();
                        }}
                      />
                    </Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                </>
              )}

              <Box marginTop={8} />

              <Grid container justify="space-between">
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Tooltip title="Post In Private" aria-label="private">
                        <span>
                          <ToggleButton
                            selected={values.isPrivate}
                            disabled={!userContext.signedIn}
                            color="primary"
                            onChange={() => {
                              setFieldValue("isPrivate", !values.isPrivate);
                            }}
                          >
                            <Lock fontSize="small" />
                          </ToggleButton>
                        </span>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Show My Name" aria-label="name">
                        <span>
                          <ToggleButton
                            value="true"
                            disabled={!userContext.signedIn}
                            selected={!values.isAnonymous}
                            onChange={() => {
                              setFieldValue("isAnonymous", !values.isAnonymous);
                            }}
                          >
                            <Face fontSize="small" />
                          </ToggleButton>
                        </span>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip
                        title={
                          values.isListView
                            ? "Hide Tick Boxes"
                            : "Show Tick Boxes"
                        }
                        aria-label="change view"
                      >
                        <ToggleButton
                          selected={values.isListView}
                          onClick={() => {
                            if (!values.isListView) {
                              const nL: INoteItem[] = [];
                              values.raw.split("\n").map((val, idx) => {
                                const cont = val.trim();
                                if (cont.length < 1) return;
                                nL.push({
                                  id: idx,
                                  content: cont.trim(),
                                  complete: false,
                                });
                              });
                              setFieldValue("raw", "");
                              setFieldValue("todos", nL);
                              setTheTodos(nL);
                            } else {
                              setFieldValue(
                                "raw",
                                theTodos
                                  .map((todo) => todo.content + "\n")
                                  .join("")
                              );
                            }

                            setFieldValue("isListView", !values.isListView);
                          }}
                        >
                          {values.isListView ? (
                            <Notes fontSize="small" />
                          ) : (
                            <Toc fontSize="small" />
                          )}
                        </ToggleButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Tooltip title="Erase">
                        <IconButton
                          size="small"
                          tabIndex="-1"
                          onClick={() => {
                            setFieldValue("raw", "");
                            setFieldValue("todos", "");
                            setTheTodos([]);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Button size="small" type="submit">
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
