import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Organization {
  id: number;
  organizationName: string;
  subscriptionPlan: string;
  createdAt: string; // ISO format from backend
  nextRenewalDate: string | null;
  subdomain: string;
  portalUrl: string;
  maxMemberCount: number;
  currentMemberCount: number;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | string; // add other statuses as needed
  isDeleted: boolean;
}

interface Admin {
  id: number;
  name: string;
  email: string;
  nic: string;
  phone: string;
  emailVerified: boolean;
  createdAt: string;
}

interface UserState {
  admin: Admin | null;
  organization: Organization | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  admin: null,
  organization: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ admin: Admin; organization: Organization }>) {
      state.admin = action.payload.admin;
      state.organization = action.payload.organization;
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      state.admin = null;
      state.organization = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
