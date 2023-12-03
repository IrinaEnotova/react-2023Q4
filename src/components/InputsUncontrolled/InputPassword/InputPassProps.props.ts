import { InputHTMLAttributes } from 'react';

export interface InputPassProps extends InputHTMLAttributes<HTMLInputElement> {
  errorValue: string;
  passStrength: string;
}
