import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import CarousalComponent from "../components/carousal/carousal.component";
import EventCard from "../components/event-card/event-card.component";
import { selectAllEvents } from "../redux/eventsSice/eventSlice";

function Home() {
  const events = useSelector(selectAllEvents);

  return (
    <Paper
      sx={{
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        <CarousalComponent />
      </Container>
    </Paper>
  );
}

export default Home;
