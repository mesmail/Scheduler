import { toast } from "react-toastify";

export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const toastOnError = (error) => {
  if (error.response) {
    if (error.response.data.non_field_errors) {
      toast.error(error.response.data.non_field_errors[0]);
    } else if (error.response.data.password) {
      toast.error(JSON.stringify("password invalid"));
    } else if (error.response.data.email) {
      toast.error(JSON.stringify("invalid email"));
    } else if (error.response.data.username) {
      toast.error(JSON.stringify("invalid username"));
    } else {
      toast.error(JSON.stringify(error.response.data));
    }
    // known error
  } else if (error.message) {
    toast.error(JSON.stringify(error.message));
  } else {
    toast.error(JSON.stringify(error));
  }
};

let baseURL;
let socketUrl;

if (window.location.origin === "http://localhost:3000") {
  baseURL = "http://127.0.0.1:8000/";
} else {
  baseURL = `${window.location.origin}/`;
}

export { baseURL, socketUrl };
