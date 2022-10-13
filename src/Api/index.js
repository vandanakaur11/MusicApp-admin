import Swal from "sweetalert2";
import { publicAPI } from "../constants";
import { getUserTrial } from "../redux/reducers/userReducer";

export const fetchUsers = async (page, perPage) => {
  try {
    const res = await publicAPI.get(
      `/admin/users?page=${page ? page : 1}&perPage=${perPage ? perPage : 10}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTrialUsers = async (page, perPage) => {
  console.log("called");
  try {
    const res = await publicAPI.get(
      `/admin/trial-users?page=${page ? page : 1}&perPage=${
        perPage ? perPage : 10
      }`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const revokeAccess = async (id) => {
  try {
    const res = await publicAPI.get(`/admin/revoke?id=${id}`);
    console.log(res);
    Swal.fire(res?.data?.message, "", "success").then(() => {
      getUserTrial();
    });
  } catch (error) {
    console.log(error);
  }
};

export const generateCode = async (body) => {
  try {
    const res = await publicAPI.post(`/admin/codes`, body);
    console.log(res);
    Swal.fire(res?.data?.message, "", "success").then(() => {
      getUserTrial();
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllGeneratedCodes = async () => {
  try {
    const res = await publicAPI.get(`/admin/codes`);
    console.log(res);

    Swal.fire(res?.data?.message, "", "success").then(() => {
      getUserTrial();
    });
    return res.data.data.codes;
  } catch (error) {
    console.log(error);
  }
};
export const addDuration = async (body) => {
  try {
    const res = await publicAPI.post(`/admin/durations`, body);
    console.log(res);

    Swal.fire(res?.data?.message, "", "success").then(() => {
      getUserTrial();
    });
    return res.data.data.codes;
  } catch (error) {
    console.log(error);
  }
};
// export const getAlbum = async () => {
//   try {
//     const res = await publicAPI.get(`/admin/album`);
//     console.log(res);

//     Swal.fire(res?.data?.message, "", "success").then(() => {
//       getUserTrial();
//     });
//     return res.data.data.codes
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getDuration = async () => {
//   try {
//     const res = await publicAPI.get(`/admin/durations`);
//     console.log(res);

//     Swal.fire(res?.data?.message, "", "success").then(() => {
//       getUserTrial();
//     });
//     return res.data.data.codes
//   } catch (error) {
//     console.log(error);
//   }
// };
