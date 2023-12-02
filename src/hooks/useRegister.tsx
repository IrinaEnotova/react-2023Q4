import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitData } from '../interfaces/interfaces';
import userSchema from '../validations/uncontrolledValidation';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, useForm } from 'react-hook-form';
import { ObjectSchema } from 'yup';

export default function useRegister(): [
  register: UseFormRegister<{
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    country: string;
    image: FileList;
    terms: boolean;
  }>,
  errors: FieldErrors<{
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    country: string;
    image: FileList;
    terms: boolean;
  }>,
  handleSubmit: UseFormHandleSubmit<
    {
      name: string;
      age: number;
      email: string;
      password: string;
      confirmPassword: string;
      gender: string;
      country: string;
      image: FileList;
      terms: boolean;
    },
    undefined
  >,

  isValid: boolean,
] {
  const mySchema = userSchema as unknown;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver<SubmitData>(mySchema as ObjectSchema<SubmitData>),
    mode: 'onChange',
  });

  return [register, errors, handleSubmit, isValid];
}
