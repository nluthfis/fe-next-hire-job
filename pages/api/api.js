import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

export const getProfile = async (token) => {
  const response = await axios.patch(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (token, formState) => {
  const response = await axios.patch(`${BASE_URL}/profile`, formState, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfilePicture = async (token, selectedFile) => {
  const formImage = new FormData();
  formImage.append("photo", selectedFile);

  const response = await axios.patch(`${BASE_URL}/profile/picture`, formImage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
