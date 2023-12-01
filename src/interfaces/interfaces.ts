export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  isAcceptTerms: boolean;
  image: string;
  country: string;
  countries: string[];
}

export interface SubmitData {
  terms: boolean;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  image: FileList;
}
