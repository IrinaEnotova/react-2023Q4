import { InputHTMLAttributes } from 'react';

export interface InputUncontrolledProps extends InputHTMLAttributes<HTMLInputElement> {
  errorValue: string;
}
