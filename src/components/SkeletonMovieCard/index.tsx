import React from "react";
import { Box, Skeleton } from "@mui/material";

const SkeletonMovieCard: React.FC = () => {
  return (
    <>
      <Skeleton variant="rounded" width={400} height={200} />
      <Box sx={{ py: 1 }}>
        <Skeleton />
        <Skeleton />
      </Box>
    </>
  );
};

export default SkeletonMovieCard;
