import { Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import EventDetail from "../components/event-detail/event-detail.component";
import { selectEventById } from "../redux/eventsSice/eventSlice";

function EventBooking({ match }) {
  const { eventId } = match.params;
  const event = useSelector((state) => selectEventById(state, eventId));

  return (
    <div>
      {event ? (
        <Container maxWidth="xl">
          <EventDetail eventId={eventId} event={event} />
        </Container>
      ) : (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            color: "black",
            flexDirection: "column",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="h3"> Event No Found</Typography>
          <Link to="/"> Back Home </Link>
        </Box>
      )}
    </div>
  );
}

export default withRouter(EventBooking);
