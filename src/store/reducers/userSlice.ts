import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { countryData } from '../../constants/constants';
import { FormState } from '../../interfaces/interfaces';

const initialState: { cards: FormState[]; countries: string[] } = { cards: [], countries: countryData };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsersState(state, action: PayloadAction<FormState>) {
      state.cards = [
        {
          name: action.payload.name,
          age: action.payload.age,
          email: action.payload.email,
          password: action.payload.password,
          gender: action.payload.gender,
          isAcceptTerms: action.payload.isAcceptTerms,
          image: action.payload.image,
          country: action.payload.country,
        },
        ...state.cards,
      ];
    },
    setClearData(state) {
      state.cards = [];
    },
  },
});

export default userSlice.reducer;
export const { setUsersState, setClearData } = userSlice.actions;
