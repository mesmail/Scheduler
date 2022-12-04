import {
  Button,
  Chip,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { styled } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import InventoryIcon from "@mui/icons-material/Inventory";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CustomModal from "../modal/custom-modal.component";
import { useDispatch, useSelector } from "react-redux";
import { BookEvent } from "../../redux/eventsSice/eventSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const ImageBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const DetailBox = styled(Box)(({ theme }) => ({
  background: `${theme.palette.action.hover}`,
  width: "100%",
  height: "100%",
  padding: "15px 10px",
  borderRadius: "10px",
}));

function EventDetail({ event, eventId }) {
  const add_load = useSelector((state) => state.events.add_load);
  const [data, setData] = React.useState({
    reason: "",
    quantity: 0,
  });
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const item = {
      event_id: eventId,
      reason: data.reason,
      quantity: data.quantity,
    };
    try {
      const res = await dispatch(BookEvent(item));
      unwrapResult(res);
      toast.success("Event Booked success");
      setData({
        reason: "",
        quantity: 0,
      });
    } catch (e) {}
  };
  return (
    <Box sx={{ mt: "80px", borderRadius: "20px" }}>
      <Grid container spacing={4}>
        <Grid item lg={6} sm={12}>
          <DetailBox>
            <Grid container spacing={3} justifyContent="center">
              <Grid item sm={12} justifyContent="center">
                <Typography variant="h4">{event.title}</Typography>
                <Typography variant="body1">
                  {new Date(event.date).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="h5">
                  <LocationOnIcon sx={{ mr: 1 }} color="info" />
                  {event.location_name}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="h5">
                  <CurrencyExchangeIcon sx={{ mr: 1 }} color="info" />
                  {event.price_with_tax.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="h5">
                  <InventoryIcon sx={{ mr: 1 }} color="info" />
                  {event.inventory}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">{event.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <CustomModal
                  btnText="Booking Now"
                  variant="contained"
                  aria-label="add to favorites"
                  color="info"
                  endIcon={<BookmarkAddedIcon />}
                >
                  <Box onSubmit={onSubmit} component="form" autoComplete="off">
                    <TextField
                      fullWidth
                      name="reason"
                      value={data.reason}
                      required
                      onChange={onChange}
                      sx={{ mb: 1 }}
                      label="Booking Reason"
                    />
                    <TextField
                      fullWidth
                      name="quantity"
                      type="number"
                      value={data.quantity}
                      required
                      onChange={onChange}
                      label="Quantity"
                    />
                    <Button
                      sx={{ mt: 2 }}
                      fullWidth
                      variant="contained"
                      type="submit"
                      disabled={add_load}
                    >
                      Booking
                    </Button>
                  </Box>
                </CustomModal>
              </Grid>
            </Grid>
          </DetailBox>
        </Grid>
        <Grid item lg={6} sm={12}>
          <ImageBox>
            <img src={event.image} />
          </ImageBox>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EventDetail;
