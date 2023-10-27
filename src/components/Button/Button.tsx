import { Component, ReactNode } from 'react';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <button {...this.props} className={styles['button']}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
