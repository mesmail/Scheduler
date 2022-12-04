import React from "react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/pagination";
import { styled } from "@mui/material/styles";

import { Pagination } from "swiper";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules

import EventCard from "../event-card/event-card.component";
import { selectAllEvents } from "../../redux/eventsSice/eventSlice";

function CarousalComponent() {
  const events = useSelector(selectAllEvents);
  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {events.map((event) => (
        <SwiperSlide key={event.id}>
          <EventCard event={event} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CarousalComponent;
