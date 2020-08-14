import Layout from "../../components/page-layout";
import NoteEditor from "../../components/note-editor";
import { useRouter } from "next/router";
import { FIND_NOTE } from "../../client/queries";
import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LoaderAnimation from "../../components/loader-animation";

export default function Home() {
  const router = useRouter();
  const id = router.query.id;

  const { data, loading, error } = useQuery(FIND_NOTE, {
    variables: {
      id: id,
    },
  });

  return (
    <>
      <Layout>
        {loading && <LoaderAnimation />}
        {error && <Alert severity="error">Oops! Something went wrong!</Alert>}
        {data && <NoteEditor note={data.note} />}
      </Layout>
    </>
  );
}
