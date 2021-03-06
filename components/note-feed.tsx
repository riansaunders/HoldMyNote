import NotePreview from "./note-preview";

import { FIND_NOTES } from "../client/queries";
import { useQuery } from "@apollo/client";

import { Box, CircularProgress, Checkbox } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LoaderAnimation from "./loader-animation";
import Link from "next/link";
export interface NoteFeedProps {
  targetUser?: string;
}

export default function NoteFeed(props: NoteFeedProps) {
  const { loading, error, data } = useQuery(FIND_NOTES, {
    // variables: {
    //   userID: props.targetUser,
    // },
  });
  Checkbox;
  const vn = {
    title: "Something cool",
    id: "",
    author: "Rian Saunders",
    when: "5 Minutes Ago",
    isPrivate: true,
    isAnonymous: true,
    isListView: true,
    items: [],
  };
  return (
    <>
      {loading && <LoaderAnimation />}
      {error && (
        <Alert severity="error">
          Oops! Cannot load the feed! That sucks :-(
        </Alert>
      )}

      {data && data.notes.length === 0 && (
        <>
          <Alert severity="info">
            We don't have any notes yet!{" "}
            <Link href="/">
              <a>Create One</a>
            </Link>
          </Alert>
        </>
      )}
      {data && data.notes.length > 0 && (
        <>
          {data.notes.map((im: any) => {
            return (
              <>
                <NotePreview note={im} />
                <Box marginBottom={5} />
              </>
            );
          })}
        </>
      )}
    </>
  );
}
