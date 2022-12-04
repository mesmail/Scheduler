import {
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSettings } from "../../redux/authSlice/login.slice";
import { toast } from "react-toastify";

function UserProfile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [newValues, setNewValues] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_birth: "",
  });

  const onChange = (e) => {
    setNewValues({ ...newValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setNewValues({
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone: user?.phone,
      date_birth: user?.date_birth,
    });
    console.log(newValues);
  }, [user?.first_name]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const new_user_value = {
        first_name: newValues.first_name,
        last_name: newValues.last_name,
        email: newValues.email,
        phone: newValues.phone,
        date_birth: newValues.date_birth,
      };
      const res = await dispatch(updateUserSettings(new_user_value));
      unwrapResult(res);
      toast.success("Update Succuss");
    } catch (e) {}
  };

  return (
    <Box sx={{ width: "100%", height: "100%", mt: "120px" }}>
      <Container>
        <Box component="form" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  mb: 2,
                  flexDirection: "column",
                }}
              >
                <Avatar sx={{ background: "#e91e63" }}>
                  {user?.first_name.slice(0, 2)}
                </Avatar>
                <Typography>
                  {user?.first_name} {user?.last_name}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="first_name"
                value={newValues.first_name}
                onChange={onChange}
                label="First Name"
              />
            </Grid>
            <Grid item lg={6} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="last_name"
                value={newValues.last_name}
                onChange={onChange}
                label="Last Name"
              />
            </Grid>
            <Grid item lg={6} sm={12}>
              <TextField
                fullWidth
                type="email"
                name="email"
                onChange={onChange}
                value={newValues.email}
                label="Email"
              />
            </Grid>
            <Grid item lg={6} sm={12}>
              <TextField
                fullWidth
                type="tel"
                name="phone"
                onChange={onChange}
                value={newValues.phone}
                label="Phone"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="date_birth">Date of Birth</InputLabel>
              <FormControl fullWidth variant="standard">
                <TextField
                  fullWidth
                  id="date_birth"
                  type="date"
                  onChange={onChange}
                  value={newValues.date_birth}
                  name="date_birth"
                  autoComplete="date"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                Change
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default UserProfile;
