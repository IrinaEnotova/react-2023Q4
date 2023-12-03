import { forwardRef } from 'react';
import classNames from 'classnames';
import { InputPassProps } from './InputPassProps.props';
import styles from './InputPassword.module.css';

export const InputUnPassword = forwardRef<HTMLInputElement, InputPassProps>(function MyInput(
  { errorValue, passStrength },
  ref
) {
  return (
    <div>
      <label className={styles['label']}>
        <span>Password</span>
        <div className={styles['pass-wrapper']}>
          {passStrength ? (
            <div
              className={classNames(styles['strength'], {
                [styles['weak']]: passStrength === 'weak',
                [styles['medium']]: passStrength === 'medium',
                [styles['strong']]: passStrength === 'strong',
              })}
            >
              {passStrength} pass
            </div>
          ) : (
            <></>
          )}
          <input
            ref={ref}
            className={classNames(styles.input, { ['error-input']: errorValue })}
            type="text"
            placeholder="your password"
            autoComplete="off"
          />
        </div>
      </label>
      <div className="error-message">{errorValue}</div>
    </div>
  );
});
