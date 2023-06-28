import axios from "axios";

const updateBio = {
  updateProfile: async (formState, token) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/profile`,
        formState,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { updateBio };
