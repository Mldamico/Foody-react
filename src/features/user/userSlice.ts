import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

// interface Address {
//   locality: any;
//   city: any;
//   postcode: any;
//   countryName: any;
// }

// function getAddress(position: {
//   latitude: number;
//   longitude: number;
// }): Address {
//   return { locality: "", city: "", postcode: 11, countryName: "" };
// }

interface Position {
  coords: { latitude: number; longitude: number };
}
function getPosition(): Promise<Position> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  const positionObj: Position = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  return { position, address };
});

interface State {
  username: string;
  status: "idle" | "loading" | "error";
  position: {
    latitude?: number;
    longitude?: number;
  };

  address: string;
  error: string;
}

const initialState: State = {
  username: "Unknown",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUsername(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "There was an issue getting your address. Please allow location permissions.";
      }),
});

export const { updateUsername } = userSlice.actions;

export default userSlice.reducer;
