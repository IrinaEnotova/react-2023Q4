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
  contry: '',
  countries: countryData,
};

export const uncontrolledSlice = createSlice({
  name: 'uncontrolledUser',
  initialState,
  reducers: {
    setUncontrolledState(
      state,
      action: PayloadAction<{
        name: string;
        age: number;
        email: string;
        password: string;
        gender: string;
        isAcceptTerms: boolean;
        image: string;
        contry: string;
      }>
    ) {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.gender = action.payload.gender;
      state.isAcceptTerms = action.payload.isAcceptTerms;
      state.image = action.payload.image;
      state.contry = action.payload.contry;
    },
  },
});

export default uncontrolledSlice.reducer;
export const { setUncontrolledState } = uncontrolledSlice.actions;
