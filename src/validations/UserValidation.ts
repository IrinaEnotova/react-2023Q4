import * as yup from 'yup';
import { countryData } from '../constants/constants';
export const MAX_FILE_SIZE = 102400; //100KB

export const validFileExtensions: string[] = ['png', 'jpeg'];

export function isValidFileType(fileName: string): boolean {
  return !!fileName && validFileExtensions.indexOf(fileName.split('.').pop()!) > -1;
}

const userSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[А-ЯA-Z][а-яёa-z]*$/, 'first letter must be uppercased')
    .required('name is required'),
  age: yup.number().min(1, 'age value must be positive').required('age is required'),
  email: yup.string().email('must be a valid email').required('email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      'password must contain 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    )
    .required('password is required'),
  confirmPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      'must contain 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    )
    .oneOf([yup.ref('password')], 'passwords must match')
    .required('password confirmation is required'),
  gender: yup.string().required(),
  country: yup
    .string()
    .required('country is required')
    .test('is-full-country-name', 'Enter correct country name from country list', (value: string) => {
      return countryData.includes(value);
    }),
  image: yup
    .mixed()
    .required('image is required')
    .test('is-valid-type', 'not a valid image extension - load png or jpeg ', (value) => {
      if (value instanceof File) {
        return isValidFileType(value.name.toLowerCase());
      }
    })
    .test('is-valid-size', 'max allowed size is 100KB', (value) => {
      if (value instanceof File) {
        return value.size <= MAX_FILE_SIZE;
      }
    }),
  terms: yup.boolean().oneOf([true], 'must accept the terms and conditions'),
});

export default userSchema;
