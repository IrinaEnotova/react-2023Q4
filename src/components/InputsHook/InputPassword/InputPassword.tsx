import classNames from 'classnames';
import styles from './InputPassword.module.css';
import { FC, useState } from 'react';
import { InputHookProps } from '../InputHookProps.props';
import { definePasswordStrength } from '../../../utils/passStrength';

export const InputPassword: FC<InputHookProps> = ({ register, errors }) => {
  const [passStrength, setPassStrength] = useState('');
  const passwordField = register('password');

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
            {...passwordField}
            onChange={(e) => {
              passwordField.onChange(e);
              setPassStrength(definePasswordStrength(e.target.value));
            }}
            className={classNames(styles.input, { ['error-input']: errors.password })}
            type="text"
            placeholder="password"
            autoComplete="off"
          />
        </div>
      </label>
      <div className="error-message">{errors.password?.message}</div>
    </div>
  );
};
