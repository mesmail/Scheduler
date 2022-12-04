import { Box, Container, Grid, Typography } from "@mui/material";

import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllUserEvents,
  selectAllUserEvents,
} from "../redux/userEventSlice/userEvents";
import EventCard from "../components/event-card/event-card.component";

const BarBox = styled(Box)(({ theme }) => ({
  background: `${theme.palette.action.hover}`,
  width: "100%",
  height: "100%",
  padding: "15px 10px",
  borderRadius: "10px",
  marginBottom: 30,
}));
function UserEvents() {
  const dispatch = useDispatch();
  const userEvents = useSelector(selectAllUserEvents);

  useEffect(() => {
    dispatch(GetAllUserEvents());
  }, []);
  return (
    <Box sx={{ mt: "100px" }}>
      <Container maxWidth="xl">
        <BarBox>
          <Typography variant="h4" color="text.secondary">
            Previous Booking
          </Typography>
        </BarBox>
        <Grid container spacing={2}>
          {userEvents.map((event) =>
            event.event ? (
              <Grid item lg={3} md={3} sm={6} xs={12} key={event.id}>
                <EventCard event={event?.event} />
              </Grid>
            ) : null
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default UserEvents;
