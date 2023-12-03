import * as yup from 'yup';
import { countryData } from '../constants/constants';
import { MAX_FILE_SIZE, isValidFileType } from '../utils/scheme';

const userSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[А-ЯA-Z][а-яёa-z]*$/, 'first letter must be uppercased')
    .required('name is required'),
  age: yup.number().typeError('must be a number').positive().required('age is required'),
  email: yup
    .string()
    .email('must be in the format example@email.com')
    .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'must be in the format example@email.com')
    .required('email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{4,15}$/,
      'password must contain 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    )
    .min(8, 'length of password must be more than 8')
    .required('password is required'),
  confirmPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{4,15}$/,
      'must contain 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    )
    .oneOf([yup.ref('password')], 'passwords must match')
    .required('password confirmation is required'),
  gender: yup.string().required('gender is required'),
  country: yup
    .string()
    .test('is-full-country-name', 'Enter correct country name from country list', (value: string | undefined) => {
      return countryData.includes(value!);
    })
    .required('country is required'),
  image: yup
    .mixed()
    .test('is-valid-type', 'load image with valid extension - load png or jpeg ', (value) => {
      if (value instanceof File) {
        return isValidFileType(value.name.toLowerCase());
      }
      if (value instanceof FileList) {
        if (value.length === 0) {
          return false;
        }
        return isValidFileType(value[0].name.toLowerCase());
      }
    })
    .test('is-valid-size', 'max allowed size is 100KB', (value) => {
      if (value instanceof File) {
        return value.size <= MAX_FILE_SIZE;
      }
      if (value instanceof FileList) {
        if (value.length === 0) {
          return false;
        }
        return value[0].size <= MAX_FILE_SIZE;
      }
    })
    .required('image is required'),
  terms: yup.boolean().oneOf([true], 'must accept the terms and conditions').required('T&C is required'),
});

export default userSchema;
