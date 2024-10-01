import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import MovieList from "../components/MovieList";
import ClearIcon from "@mui/icons-material/Clear";
import { MoviesDataType } from "../interfaces/movies";
import SkeletonMovieList from "../components/SkeletonMovieList";
import { IconButton } from "@mui/material";

const TVSeriesPage = () => {
  const [shows, setShows] = useState<MoviesDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [error, setError] = useState(null);

  const [searchList, setSearchList] = useState<MoviesDataType[]>([]);

  useEffect(() => {
    const url =
      'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.THEMOVIEDBAPI}`, // Reemplaza con tu API key
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
        setShows(json.results); // Asumimos que el array de resultados está en `json.results`
        setLoading(false);
        // console.log('results:',json.results)
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      setSearchList([]);
      return;
    }
    try {
      const encodedQuery = encodeURIComponent(searchValue);
      const url = `https://api.themoviedb.org/3/search/multi?query=${encodedQuery}&include_adult=false&language=en-US&page=1`;
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
          setSearchList(json.results); // Asumimos que el array de resultados está en `json.results`
        })
        .catch((err) => {
          console.error("error:", err);
          setError(err);
        });
    } catch (error) {}
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12 }}>
          <FormControl fullWidth>
            <OutlinedInput
              sx={{ color: "black" }}
              placeholder="Search for tv series or movies"
              value={searchValue}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setSearchValue("");
                      setSearchList([]);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        {searchList.length > 0 ? (
          <Grid size={{ xs: 12, md: 12 }}>
            <MovieList
              isTrendingList={false}
              title={`Found ${searchList.length} results for '${searchValue}'`}
              movies={searchList}
            />
          </Grid>
        ) : (
          <>
            <Grid size={{ xs: 12, md: 12 }}>
              {!loading && !error && (
                <MovieList
                  isTrendingList={false}
                  title="TV Series"
                  movies={shows}
                />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default TVSeriesPage;
