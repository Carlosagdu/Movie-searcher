import * as React from "react";
import { MoviesDataType } from "../../interfaces";
import PaperContainer from "../PaperContainer";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MovieCard from "../MovieCard";

interface MovieListProps {
  title?: string;
  movies?: MoviesDataType[];
  isTrendingList: boolean;
}

const MovieList: React.FC<MovieListProps> = ({
  title,
  movies,
  isTrendingList,
}) => {
  return (
    <>
      <Typography variant="h5" component="h1" fontWeight={400}>
        {title}
      </Typography>
      {isTrendingList ? (
        <Box sx={{ height: "340px" }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "scroll",
            }}
          >
            {movies?.map((movie) => (
              <Grid
                sx={{ minWidth: "150px", minHeight: "340px" }}
                key={movie.id}
              >
                <Paper sx={{ backgroundColor: "transparent" }}>
                  <MovieCard isTrending={isTrendingList} movie={movie} />
                </Paper>
              </Grid>
            ))}
          </Box>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {movies?.map((movie) => (
            <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
                <MovieCard isTrending={isTrendingList} movie={movie} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default MovieList;
