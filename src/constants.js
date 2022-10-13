import Axios from "axios";

// const publicIP = "https://broadcast-backend.herokuapp.com";

// export const publicIP = "http://localhost:5000";
// export const publicIP = "https://music-apppps.herokuapp.com";
export const publicIP = "http://localhost:5000";
export const base_url = `${publicIP}`;

export const connection_string = `${base_url}`;

export const publicAPI = Axios.create({
  baseURL: process.env.REACT_APP_LOCAL_BASE_URL,
});

export const page = 1;
export const perPage = 10;
