import { SelectHTMLAttributes } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface SelectHookProps extends SelectHTMLAttributes<HTMLSelectElement> {
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
  }>;
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
  }>;
}
