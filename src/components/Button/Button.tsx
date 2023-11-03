import classNames from 'classnames';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={classNames(styles['button'], className)}>
      {children}
    </button>
  );
};

export default Button;
