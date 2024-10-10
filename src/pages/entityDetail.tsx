import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { Star } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import { creditType } from "../interfaces";
import SkeletonMovieList from "../components/SkeletonMovieList";

const EntityDetail: React.FC = () => {
  const [crews, setCrews] = useState<creditType[]>([]);
  const [cast, setCast] = useState<creditType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/917496/credits?language=en-US";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.THEMOVIEDBAPI}`,
      },
    };

    fetch(url, options)
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
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Mensaje de error
  }

  if (loading) {
    return <SkeletonMovieList />;
  }

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2.5 }} sx={{ border: "red solid" }}>
          <img
            width="100%"
            alt="movie poster"
            height="100%"
            src={
              "https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
            }
          />
        </Grid>
        <Grid
          container
          size={{ xs: 12, md: 9 }}
          sx={{ border: "red solid", height: "100%" }}
        >
          <Grid size={{ xs: 12 }} sx={{ border: "pink solid", height: "100%" }}>
            <Typography variant={"h4"}>Deadpool & Wolverine (2024)</Typography>
            <div
              style={{
                marginBottom: "5px",
                marginTop: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant={"body1"}>09/06/2024</Typography>
              <CircleIcon sx={{ fontSize: "5px", margin: "6px" }} />
              <Typography variant={"body1"}>Action, Comedy, Fantasy</Typography>
              <CircleIcon sx={{ fontSize: "5px", margin: "6px" }} />
              <Typography variant={"body1"}>1h 30m</Typography>
            </div>
            <Divider sx={{ my: 1 }} variant="fullWidth" />
            <Typography variant="overline" sx={{ my: 1 }}>
              The ghost with the most is back.
            </Typography>
            <Typography variant="h6" sx={{ my: 1 }}>
              Overview
            </Typography>
            <Typography variant="body1">
              After a family tragedy, three generations of the Deetz family
              return home to Winter River. Still haunted by Betelgeuse, Lydia's
              life is turned upside down when her teenage daughter, Astrid,
              accidentally opens the portal to the Afterlife.
            </Typography>
          </Grid>
          <Grid container size={{ xs: 12 }} sx={{ border: "darkorange solid" }}>
            {crews.slice(0, 6).map((crew) => (
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {crew.name}
                </Typography>
                <Typography variant="body2">{crew.department}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }} sx={{ border: "red solid" }}></Grid>
        <Grid size={{ xs: 12, md: 2 }} sx={{ border: "red solid" }}></Grid>
        <Grid size={{ xs: 12, md: 2 }} sx={{ border: "red solid" }}></Grid>
      </Grid>
    </Box>
  );
};

export default EntityDetail;
