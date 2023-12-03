import { SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  errorValue: string;
  inputName: string;
}
