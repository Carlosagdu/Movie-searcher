import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { Star } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import { creditType, MovieDetailType, ReviewType } from "../interfaces";
import SkeletonMovieList from "../components/SkeletonMovieList";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

const EntityDetail: React.FC = () => {
  const [crews, setCrews] = useState<creditType[]>([]);
  const [cast, setCast] = useState<creditType[]>([]);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [movie, setMovie] = useState<MovieDetailType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // TODO: Fetch movies or tv show accordingly
    const creditsURL = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    const movieDetailURL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const tvShowURL = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;
    const movieReviewsURL = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.THEMOVIEDBAPI}`,
      },
    };

    fetch(creditsURL, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setCrews(json.crew);
        setCast(json.cast);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error:", err);
        setError(err);
        setLoading(false);
      });

    fetch(movieDetailURL, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setMovie(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error:", err);
        setError(err);
        setLoading(false);
      });

    fetch(movieReviewsURL, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setReviews(json.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error:", err);
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>; // Mensaje de error
  }

  if (loading) {
    return <SkeletonMovieList />;
  }

  if (movie) {
    return (
      <Box sx={{ height: "100%", width: "100%" }}>
        <Grid container spacing={2}>
          <Paper elevation={1}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 2.5 }}>
                <img
                  width="100%"
                  alt="movie poster"
                  height="100%"
                  style={{ borderRadius: "10px" }}
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                />
              </Grid>
              <Grid container spacing={1} py={1} size={{ xs: 12, md: 9.5 }}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant={"h4"}>
                    {`${movie.title} (${new Date(movie.release_date).getFullYear()})`}
                  </Typography>
                </Grid>
                <Grid container size={{ xs: 12 }} alignItems="center">
                  <Typography variant={"body1"}>
                    {movie.release_date}
                  </Typography>
                  <CircleIcon sx={{ fontSize: "5px" }} />
                  <Typography variant={"body1"}>
                    {movie.genres
                      .slice(0, 3)
                      .map((genre) => genre.name)
                      .join(", ")}
                  </Typography>
                  <CircleIcon sx={{ fontSize: "5px", margin: "6px" }} />
                  <Typography
                    variant={"body1"}
                  >{`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}</Typography>
                </Grid>
                <Grid size={12}>
                  <Divider color={"black"} variant="fullWidth" />
                </Grid>
                <Grid
                  container
                  spacing={0}
                  size={{ xs: 6, md: 1.5 }}
                  sx={{ my: 1 }}
                >
                  <Grid size={12}>
                    <Typography variant="h6">Rating</Typography>
                  </Grid>
                  <Grid size={4}>
                    {/* Estrella de calificación */}
                    <Star fontSize={"large"} sx={{ color: "#F5C518" }} />
                  </Grid>
                  <Grid container size={8}>
                    <Grid size={12}>
                      {/* Texto de calificación */}
                      <Typography
                        variant="body1"
                        component="span"
                        fontWeight="bold"
                      >
                        {movie.vote_average.toFixed(2)} {/* Por ejemplo: 7.0 */}
                      </Typography>
                      <Typography variant="body1" component="span" color="gray">
                        /{10}
                      </Typography>
                    </Grid>
                    <Grid size={12}>
                      {/* Número de votos */}
                      <Typography variant="body1" color="gray">
                        {movie.vote_count}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="overline">{movie.tagline}</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6">Overview</Typography>
                  <Typography variant="body1">{movie.overview}</Typography>
                </Grid>
                <Grid container size={{ xs: 12 }}>
                  {crews.slice(0, 10).map((crew, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {crew.name}
                      </Typography>
                      <Typography variant="body2">{crew.department}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Container>
            <Grid container height={"100%"} spacing={1}>
              {/*CAST & REVIEWS SECTION*/}
              <Grid
                container
                size={{ xs: 12, md: 9 }}
                sx={{ border: "red solid" }}
              >
                <Grid size={12}>
                  <Typography variant="h5">Cast</Typography>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    overflowX: "auto",
                  }}
                  py={1}
                  container
                  size={12}
                  spacing={2}
                >
                  {cast.slice(0, 10).map((cast, index) => (
                    <Card key={index} sx={{ width: 140, flex: "0 0 auto" }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="180"
                          src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                          alt="green iguana"
                        />
                        <CardContent sx={{ p: 1 }}>
                          <Typography
                            gutterBottom
                            variant="body1"
                            fontWeight={"bold"}
                            component="p"
                          >
                            {cast.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {cast.character}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
                </Grid>
                <Grid size={12}>
                  <Typography variant="h5">Reviews</Typography>
                </Grid>
                <Grid container spacing={2} size={12}>
                  {reviews.slice(0, 10).map((review, index) => (
                    <ReviewCard key={index} review={review} />
                  ))}
                </Grid>
              </Grid>

              {/*SIDE COLUMN*/}
              <Grid
                container
                size={{ xs: 12, md: 3 }}
                sx={{ border: "red solid" }}
                height={"80%"}
              >
                {/*<Grid flexBasis={"80%"} sx={{ border: "orange solid" }}></Grid>*/}
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Box>
    );
  }
};

export default EntityDetail;
