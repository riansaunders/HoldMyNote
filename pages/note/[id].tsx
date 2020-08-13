import Layout from "../../components/page-layout";
import NoteInsight from "../../components/note-insight";
import { Box, CircularProgress, Checkbox } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Alert } from "@material-ui/lab";
import { FIND_NOTE } from "../../client/queries";
export default function NoteView() {
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
        <Box marginTop={3}>
          {loading && <CircularProgress />}
          {error && <Alert severity="error">Oops! Something went wrong!</Alert>}
          {data && (
            <>
              <NoteInsight note={data.note} />
              {data.note.items.map((im: any) => {
                return (
                  <>
                    <Checkbox checked={im.complete} disableRipple />
                    {im.content}
                    <br />
                  </>
                );
              })}
            </>
          )}
        </Box>
      </Layout>
    </>
  );
}
