import Layout from "../../components/page-layout";
import NoteEditor from "../../components/note-editor";
import { useRouter } from "next/router";
import { DELETE_NOTE } from "../../client/queries";
import { useQuery, useMutation } from "@apollo/client";
import { CircularProgress, Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LoaderAnimation from "../../components/loader-animation";

export default function Home() {
  if (typeof window === "undefined") {
    return <LoaderAnimation />;
  }
  const router = useRouter();
  const id = router.query.id;

  const [deleteNote, deleteNoteResult] = useMutation<{}>(DELETE_NOTE);

  console.log("Query id: " + id);
  if (!deleteNoteResult.called && id) {
    deleteNote({
      variables: {
        input: {
          id,
        },
      },
    })
      .then((data) => router.push("/"))
      .catch((er) => {
        console.error(er);
        // router.push("/");
      });
  } 
  if(!id) {
    //   router.push("/");
    console.log("NO ID!");
  }
  return (
    <>
      <Layout>
        {!deleteNoteResult.error && <LoaderAnimation />}
        {deleteNoteResult.error && (
          <Box>
            <Alert severity="error">
              Oops! Something went wrong while deleting the note.
            </Alert>
          </Box>
        )}
      </Layout>
    </>
  );
}
