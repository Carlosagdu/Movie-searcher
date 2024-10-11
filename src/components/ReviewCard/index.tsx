import React from "react";
import { Avatar, Button, Paper } from "@mui/material";
import { ReviewType } from "../../interfaces";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import { format } from "date-fns";

interface ReviewCardProps {
  review: ReviewType;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Paper elevation={2} sx={{ p: 1, width: "100%" }}>
      <Grid container spacing={1} alignItems={"center"}>
        <Grid>
          {review.author_details.avatar_path ? (
            <Avatar
              alt={`${review.author} avatar`}
              src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`}
            />
          ) : (
            <Avatar
              sx={{ bgcolor: "secondary.main" }}
              alt={`${review.author} avatar`}
            >
              {review.author.slice(0, 1).toUpperCase()}
            </Avatar>
          )}
        </Grid>
        <Grid container alignItems={"center"} spacing={0} size={11}>
          <Grid size={12}>
            <Typography
              variant="h6"
              component={"p"}
            >{`A review by ${review.author}`}</Typography>
          </Grid>
          <Grid>
            <Button size={"small"} variant="contained" startIcon={<StarIcon />}>
              {`${review.author_details.rating * 10}%`}
            </Button>
          </Grid>
          <Grid size={10} ml={1}>
            <Typography
              variant="body2"
              component={"p"}
            >{`Written by ${review.author} on ${format(new Date(review.created_at), "MMMM dd, yyyy")}`}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={12}>
        <Typography
          dangerouslySetInnerHTML={{
            __html: `${review.content.slice(0, 350)}...`,
          }}
          variant="body1"
          component={"p"}
        ></Typography>
      </Grid>
    </Paper>
  );
};

export default ReviewCard;
