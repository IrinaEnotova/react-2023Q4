import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { countryData } from '../../constants/constants';
import { FormState } from '../../interfaces/interfaces';

const initialState: FormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: '',
  isAcceptTerms: false,
  image: '',
  country: '',
  countries: countryData,
};

export const hookFormSlice = createSlice({
  name: 'hookFormUser',
  initialState,
  reducers: {
    setHookFormState(
      state,
      action: PayloadAction<{
        name: string;
        age: number;
        email: string;
        password: string;
        gender: string;
        isAcceptTerms: boolean;
        image: string;
        country: string;
      }>
    ) {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.gender = action.payload.gender;
      state.isAcceptTerms = action.payload.isAcceptTerms;
      state.image = action.payload.image;
      state.country = action.payload.country;
    },
  },
});

export default hookFormSlice.reducer;
export const { setHookFormState } = hookFormSlice.actions;
