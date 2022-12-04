import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShareIcon from "@mui/icons-material/Share";

import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function EventCard({ event }) {
  return (
    <Card elevation={3} sx={{ width: "100%" }}>
      <CardHeader
        title={event?.title}
        subheader={new Date(event?.date).toLocaleString()}
        action={
          <Chip
            label={`${event?.price_with_tax?.toFixed(2)}$`}
            size="small"
            color="info"
          ></Chip>
        }
      />
      {event && event.image && (
        <CardMedia
          component="img"
          height="494"
          image={event?.image}
          alt={event?.title}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {event?.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button aria-label="share" endIcon={<LocationOnIcon />}>
          {event?.location_name}
        </Button>
        <Button
          variant="contained"
          aria-label="add to favorites"
          color="info"
          endIcon={<BookmarkAddedIcon />}
          component={Link}
          to={`/events/book/${event?.id}/`}
        >
          Booking Now
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventCard;
