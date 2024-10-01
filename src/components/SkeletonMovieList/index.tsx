import React from "react";
import Grid from "@mui/material/Grid2";
import SkeletonMovieCard from "../SkeletonMovieCard";

const SkeletonMovieList: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(16)).map((item, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <SkeletonMovieCard />
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonMovieList;
