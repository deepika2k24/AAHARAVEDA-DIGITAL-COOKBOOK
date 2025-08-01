import { Loader } from "@mantine/core";
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box sx={{ marginTop: "6rem" }}>
      <Loader color="dark" size="xl" />;
    </Box>
  );
};

export default Loading;
