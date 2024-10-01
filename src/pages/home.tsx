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

const BasicGrid = () => {
  const [movies, setMovies] = useState<MoviesDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [RecommendedMovies, setRecommendedMovies] = useState<MoviesDataType[]>(
    []
  );
  const [RecomendedLoading, setRecommededLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const [searchList, setSearchList] = useState<MoviesDataType[]>([]);

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
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
        setMovies(json.results); // Asumimos que el array de resultados está en `json.results`
        setLoading(false);
        // console.log('results:',json.results)
      })
      .catch((err) => {
        console.error("error:", err);
        setError(err);
        setLoading(false);
      });

    const url2 = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
    const options2 = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.THEMOVIEDBAPI}`,
      },
    };

    fetch(url2, options2)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setRecommendedMovies(json.results); // Asumimos que el array de resultados está en `json.results`
        setRecommededLoading(false);
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

  if (RecomendedLoading || loading) {
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
      console.log(encodedQuery);
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
                  isTrendingList={true}
                  title="Trending"
                  movies={movies}
                />
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              {!RecomendedLoading && !error && (
                <MovieList
                  isTrendingList={false}
                  title="Recommended for you"
                  movies={RecommendedMovies}
                />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default BasicGrid;
