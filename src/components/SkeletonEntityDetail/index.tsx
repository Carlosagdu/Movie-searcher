import React from "react";
import Grid from "@mui/material/Grid2";
import { Container, Skeleton } from "@mui/material";

const SkeletonEntityDetail: React.FC = () => {
  return (
    <Grid flexDirection={"column"} height={"100%"} container spacing={2}>
      <Grid size={12}>
        <Skeleton variant="rounded" width={"100%"} height={"50vh"} />
      </Grid>
      <Container>
        <Grid container spacing={2}>
          <Grid size={9}>
            <Skeleton variant="rounded" width={"100%"} height={"38vh"} />
          </Grid>
          <Grid size={3}>
            <Skeleton variant="rounded" width={"100%"} height={"38vh"} />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default SkeletonEntityDetail;
