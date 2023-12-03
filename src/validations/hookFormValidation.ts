import * as yup from 'yup';
import { countryData } from '../constants/constants';
import { MAX_FILE_SIZE, isValidFileType } from '../utils/scheme';

const hookFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('name is required')
    .matches(/^[А-ЯA-Z][а-яёa-z]*$/, 'first letter must be uppercased'),
  age: yup.number().required('age is required').typeError('must be a number').positive(),
  email: yup
    .string()
    .email('must be in the format example@email.com')
    .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'must be in the format example@email.com')
    .required('email is required'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'length of password must be more than 8')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{4,15}$/,
      'password must contain 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    ),
  confirmPassword: yup
    .string()
    .required('password confirmation is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{4,15}$/,
      'must contain 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    )
    .oneOf([yup.ref('password')], 'passwords must match'),
  gender: yup.string().required('gender is required'),
  country: yup
    .string()
    .required('country is required')
    .test('is-full-country-name', 'Enter correct country name from country list', (value: string) => {
      return countryData.includes(value);
    }),
  image: yup
    .mixed()
    .required('image is required')
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
    }),
  terms: yup.boolean().required().oneOf([true], 'must accept the terms and conditions'),
});

export default hookFormSchema;
