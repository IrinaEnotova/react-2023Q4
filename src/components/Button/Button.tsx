import { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={classNames(styles['button'], className)}>
      {children}
    </button>
  );
};

export default Button;
