
import { Box, CircularProgress } from "@material-ui/core";

export const LoaderAnimation = () => {
  return (
    <>
      <Box textAlign="center">
        <CircularProgress />
      </Box>
      ;
    </>
  );
};

export default LoaderAnimation;
