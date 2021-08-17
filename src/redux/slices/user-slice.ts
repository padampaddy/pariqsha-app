import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, signup } from "../../api/user-api";
import {
  SignupRequest,
  SignupSigninResponse,
  UserState,
} from "../../types/User";

export const loginAction = createAsyncThunk(
  "users/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await login({
      email,
      password,
    });
    return (await response.json()) as SignupSigninResponse;
  }
);

export const signupAction = createAsyncThunk(
  "users/signup",
  async (data: SignupRequest) => {
    const response = await signup(data);
    return (await response.json()) as SignupSigninResponse;
  }
);

export function saveEntities(entities: SignupSigninResponse) {
  localStorage.setItem("entities", JSON.stringify(entities));
}

export function getEntities(): SignupSigninResponse | undefined {
  const entities = localStorage.getItem("entities");
  if (entities) {
    return JSON.parse(entities) as SignupSigninResponse;
  } else {
    return undefined;
  }
}

const userSlice = createSlice<
  UserState,
  {
    saveToken: (state: UserState, { payload }: PayloadAction<string>) => void;
    logout: (state: UserState) => void;
  },
  "user"
>({
  name: "user",
  initialState: { entities: getEntities(), loading: "idle" },
  reducers: {
    saveToken: (state: UserState, { payload }: PayloadAction<string>) => {
      state.entities!.token = payload;
      saveEntities(state.entities!);
    },
    logout: (state: UserState) => {
      state.entities = undefined;
      state.loading = "idle";
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      loginAction.fulfilled,
      (state, { payload }: PayloadAction<SignupSigninResponse>) => {
        state.loading = "succeeded";
        saveEntities(payload);
        state.entities = payload;
      }
    );
    builder.addCase(loginAction.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(signupAction.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      signupAction.fulfilled,
      (state, { payload }: PayloadAction<SignupSigninResponse>) => {
        state.loading = "succeeded";
        saveEntities(payload);
        state.entities = payload;
      }
    );
    builder.addCase(signupAction.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export default userSlice;
