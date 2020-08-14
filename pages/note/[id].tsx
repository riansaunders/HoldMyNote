import Layout from "../../components/page-layout";
import NoteInsight from "../../components/note-insight";
import { Box, CircularProgress, Checkbox } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Alert } from "@material-ui/lab";
import { FIND_NOTE } from "../../client/queries";
import LoaderAnimation from "../../components/loader-animation";
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
          {loading && <LoaderAnimation />}
          {error && <Alert severity="error">Oops! Something went wrong!</Alert>}
          {data && (
            <>
              <NoteInsight note={data.note} hideView/>
              {data.note.items.map((im: any) => {
                return (
                  <>
                    {/* Not Dry */}
                    <Checkbox
                      checked={im.complete}
                      disableRipple
                      style={{
                        textDecoration: im.complete ? "line-through" : "none",
                      }}
                    />
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
