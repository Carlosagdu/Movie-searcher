import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TheatersIcon from "@mui/icons-material/Theaters";
import TvIcon from "@mui/icons-material/Tv";
import ExplicitIcon from "@mui/icons-material/Explicit";

import { MoviesDataType } from "../../interfaces";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: MoviesDataType;
  isTrending: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isTrending }) => {
  const navigate = useNavigate();
  if (!isTrending) {
    return (
      <Card
        variant="elevation"
        sx={{
          bgcolor: "transparent",
          color: "black",
          p: 1,
          height: "100%",
          border: "none",
        }}
      >
        <CardActionArea
          onClick={() => {
            if (movie.media_type === "movie") {
              navigate(`/movie/${movie.id}`);
            } else {
              navigate(`/tv-serie/${movie.id}`);
            }
          }}
          sx={{ height: "100%" }}
        >
          <CardMedia
            component="img"
            // height="140"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="movie poster"
          />
          <CardContent sx={{ p: 0, position: "relative" }}>
            <Grid sx={{ py: 1 }} container spacing={1}>
              <Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid>
                    <Typography variant="caption" aria-label="year of movie">
                      {movie.release_date || movie.first_air_date}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Box
                      sx={{
                        width: "4px",
                        height: "4px",
                        background: "#BDBDBD",
                        borderRadius: "50%",
                      }}
                    />
                  </Grid>
                  <Grid>
                    {movie.media_type === "movie" ? (
                      <TheatersIcon sx={{ fontSize: "18px" }} />
                    ) : (
                      <TvIcon sx={{ fontSize: "18px" }} />
                    )}
                  </Grid>
                  <Grid>
                    <Typography variant="caption" aria-label="media type">
                      {movie.media_type === "movie" ? "Movie" : "TV Show"}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Box
                      sx={{
                        width: "4px",
                        height: "4px",
                        background: "#BDBDBD",
                        borderRadius: "50%",
                      }}
                    />
                  </Grid>
                  <Grid>{movie.adult && <ExplicitIcon />}</Grid>
                </Grid>
                <Typography pt={1} variant="body1" aria-label="movie rating">
                  {movie.title || movie.name}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card
      // variant="elevation"
      sx={{
        bgcolor: "transparent",
        color: "black",
        height: "330px",
        border: "none",
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/movie/${movie.id}`)}
        sx={{ height: "100%" }}
      >
        <CardContent sx={{ height: "100%", p: 0 }}>
          <Grid
            container
            sx={{ height: "100%" }}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Grid>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt=""
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Grid>
            <Grid>
              <Typography variant="caption" align="center">
                {movie.release_date || movie.first_air_date}
              </Typography>
            </Grid>
            <Grid pt={1}>
              <Typography variant="body1" align="center">
                {movie.title || movie.name}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
