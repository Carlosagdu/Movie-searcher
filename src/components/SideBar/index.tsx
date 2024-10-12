import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import {
  ExternalIdType,
  KeywordType,
  MovieDetailType,
  ShowDetailsType,
} from "../../interfaces";
import { Button, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkIcon from "@mui/icons-material/Link";
import { fetchEntityDetails } from "../../utils/fetchAPI";

interface SideBarProps {
  movie?: MovieDetailType;
  show?: ShowDetailsType;
}

const SideBar: React.FC<SideBarProps> = ({ movie, show }) => {
  const [externalIDs, setExternalIDs] = useState<ExternalIdType>();
  const [keywords, setKeywords] = useState<KeywordType[]>([]);

  const { type, id } = useParams();

  const movieExternalIDsURL = `https://api.themoviedb.org/3/movie/${id}/external_ids`;
  const movieKeywordsURL = `https://api.themoviedb.org/3/movie/${id}/keywords`;

  const showExternalIDsURL = `https://api.themoviedb.org/3/tv/${id}/external_ids`;
  const showKeywordsURL = `https://api.themoviedb.org/3/tv/${id}/keywords`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.THEMOVIEDBAPI}`,
    },
  };

  const loadMovieInfo = async () => {
    try {
      const movieExternalIDs = await fetchEntityDetails(
        movieExternalIDsURL,
        options,
      );
      const movieKeywords = await fetchEntityDetails(movieKeywordsURL, options);
      setExternalIDs(movieExternalIDs);
      setKeywords(movieKeywords.keywords);
    } catch (err: any) {
    } finally {
    }
  };

  const loadShowInfo = async () => {
    try {
      const showExternalIDs = await fetchEntityDetails(
        showExternalIDsURL,
        options,
      );
      const showKeywords = await fetchEntityDetails(showKeywordsURL, options);
      setExternalIDs(showExternalIDs);
      setKeywords(showKeywords.results);
    } catch (err) {}
  };

  useEffect(() => {
    if (type === "movie") {
      loadMovieInfo();
    } else {
      loadShowInfo();
    }
  }, [id]);

  if (!keywords || !externalIDs) {
    return <>loading</>;
  }

  if (movie) {
    return (
      <Grid
        container
        alignContent={"flex-start"}
        size={{ xs: 12, md: 3 }}
        height={"fit-content"}
        spacing={2}
      >
        <Grid size={12}>
          <Typography variant="h6">Social Media</Typography>
          <IconButton
            href={`https://www.facebook.com/${externalIDs?.facebook_id}`}
            target={"_blank"}
          >
            <FacebookIcon></FacebookIcon>
          </IconButton>
          <IconButton
            href={`https://www.instagram.com/${externalIDs?.instagram_id}`}
            target={"_blank"}
          >
            <InstagramIcon></InstagramIcon>
          </IconButton>
          <IconButton
            href={`https://www.twitter.com/${externalIDs?.twitter_id}`}
            target="_blank"
          >
            <XIcon></XIcon>
          </IconButton>
          <IconButton
            href={movie.homepage}
            target={"_blank"}
            sx={{ borderLeft: "1px solid #d7d7d7", borderRadius: "0" }}
          >
            <LinkIcon></LinkIcon>
          </IconButton>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Status</Typography>
          <Typography variant="body2">{movie.status}</Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Budget</Typography>
          <Typography variant="body2" component={"p"}>
            {`$${new Intl.NumberFormat("en-US").format(movie.budget)}`}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Original Language</Typography>
          <Typography variant="body2">
            {`${new Intl.DisplayNames(["en-US"], {
              type: "language",
            }).of(movie.original_language)}`}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Revenue</Typography>
          <Typography variant="body2">
            {`$${new Intl.NumberFormat("en-US").format(movie.revenue)}`}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Keywords</Typography>
          {keywords.slice(0, 10).map((keyword, index) => (
            <Button key={index} size={"small"} color={"secondary"}>
              {keyword.name}
            </Button>
          ))}
        </Grid>
      </Grid>
    );
  }
  if (show) {
    return (
      <Grid
        container
        alignContent={"flex-start"}
        size={{ xs: 12, md: 3 }}
        height={"fit-content"}
        spacing={2}
      >
        <Grid size={12}>
          <Typography variant="h6">Social Media</Typography>
          <IconButton
            href={`https://www.facebook.com/${externalIDs?.facebook_id}`}
            target={"_blank"}
          >
            <FacebookIcon></FacebookIcon>
          </IconButton>
          <IconButton
            href={`https://www.instagram.com/${externalIDs?.instagram_id}`}
            target={"_blank"}
          >
            <InstagramIcon></InstagramIcon>
          </IconButton>
          <IconButton
            href={`https://www.twitter.com/${externalIDs?.twitter_id}`}
            target="_blank"
          >
            <XIcon></XIcon>
          </IconButton>
          <IconButton
            href={show.homepage}
            target={"_blank"}
            sx={{ borderLeft: "1px solid #d7d7d7", borderRadius: "0" }}
          >
            <LinkIcon></LinkIcon>
          </IconButton>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Status</Typography>
          <Typography variant="body2">{show.status}</Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Type</Typography>
          <Typography variant="body2">{show.type}</Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Latest air date</Typography>
          <Typography variant="body2">{show.last_air_date}</Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Seasons</Typography>
          <Typography variant="body2" component={"p"}>
            {show.number_of_seasons}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Episodes</Typography>
          <Typography variant="body2" component={"p"}>
            {show.number_of_episodes}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Original Language</Typography>
          <Typography variant="body2">
            {`${new Intl.DisplayNames(["en-US"], {
              type: "language",
            }).of(show.original_language)}`}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Keywords</Typography>
          {keywords.map((keyword, index) => (
            <Button key={index} size={"small"} color={"secondary"}>
              {keyword.name}
            </Button>
          ))}
        </Grid>
      </Grid>
    );
  }
};

export default SideBar;
