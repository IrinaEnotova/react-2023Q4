import { FC, useEffect, useRef, useState } from 'react';
import styles from './HookFormPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import classNames from 'classnames';
import { SubmitData } from '../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHook';
import { setUsersState } from '../../store/reducers/userSlice';
import { getBase64String } from '../../utils/base64';
import useRegister from '../../hooks/useRegister';

const HookFormPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { countries } = useAppSelector((state) => state.userReducer);
  const [filterData, setFilterData] = useState<JSX.Element[]>([]);
  const [isCountryList, setIsCountryList] = useState(false);
  const [countryValue, setCountryValue] = useState('');
  useEffect(() => {
    window.addEventListener('mousedown', (event) => {
      handleClickOutside(event);
    });
    return () => {
      window.removeEventListener('mousedown', (event) => {
        handleClickOutside(event);
      });
    };
  });
  const [register, errors, handleSubmit, isValid] = useRegister();

  const handleClickOutside = (event: MouseEvent): void => {
    const { current: wrap } = wrapperRef;
    const target = event.target as Node;
    if (wrap && !wrap.contains(target)) {
      setIsCountryList(false);
    }
  };
  const updateCountry = (country: string): void => {
    setCountryValue(country);
  };
  const getFilteredData = (): void => {
    setFilterData(
      countries
        .filter((country) => country.toLowerCase().startsWith(countryValue))
        .map((country) => (
          <li onClick={() => updateCountry(country)} key={country} value={country}>
            {country}
          </li>
        ))
    );
  };

  const submitForm = async (data: SubmitData): Promise<void> => {
    dispatch(
      setUsersState({
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        gender: data.gender,
        isAcceptTerms: data.terms,
        image: await getBase64String(data.image[0]),
        country: data.country,
      })
    );
    navigate('/');
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <h1 className={styles['heading']}>React Hook Form approach</h1>
      <Link className={styles['to-main']} to="/">
        <Button>To main</Button>
      </Link>
      <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
        <div>
          <label className={styles['label']}>
            <span>Name</span>
            <input
              {...register('name')}
              className={classNames(styles.input, { ['error-input']: errors.name })}
              type="text"
              placeholder="your name"
            />
          </label>
          <div className="error-message">{errors.name?.message}</div>
        </div>
        <div>
          <label className={styles['label']}>
            <span>Age</span>
            <input
              {...register('age')}
              className={classNames(styles.input, { ['error-input']: errors.age })}
              type="number"
              placeholder="your age"
            />
          </label>
          <div className="error-message">{errors.age?.message}</div>
        </div>
        <div>
          <label className={styles['label']}>
            <span>Email</span>
            <input
              {...register('email')}
              className={classNames(styles.input, { ['error-input']: errors.email })}
              type="text"
              placeholder="email@email.com"
            />
          </label>
          <div className="error-message">{errors.email?.message}</div>
        </div>
        <div>
          <label className={styles['label']}>
            <span>Password</span>
            <input
              {...register('password')}
              className={classNames(styles.input, { ['error-input']: errors.password })}
              type="text"
              placeholder="password"
            />
          </label>
          <div className="error-message">{errors.password?.message}</div>
        </div>
        <div>
          <label className={styles['label']}>
            <span>Confirm password</span>
            <input
              {...register('confirmPassword')}
              className={classNames(styles.input, { ['error-input']: errors.confirmPassword })}
              type="text"
              placeholder="confirmation"
            />
          </label>
          <div className="error-message">{errors.confirmPassword?.message}</div>
        </div>
        <div>
          <label className={styles['label']}>
            <span>Gender</span>
            <select {...register('gender')} className={classNames(styles.input, { ['error-input']: errors.gender })}>
              <option value="">-- Choose gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <div className="error-message">{errors.gender?.message}</div>
        </div>
        <div>
          <label className={classNames(styles['country-label'], styles['label'])}>
            <span>Country</span>
            <input
              {...register('country')}
              value={countryValue}
              placeholder="your country"
              className={classNames(styles.input, { ['error-input']: errors.country })}
              type="text"
              onClick={() => {
                setIsCountryList(!isCountryList);
                getFilteredData();
              }}
              onChange={(event) => {
                setCountryValue(event.target.value);
                getFilteredData();
              }}
            />
            {isCountryList && filterData.length > 0 && <ul className={styles['country-list']}>{filterData}</ul>}
          </label>
          <div className="error-message">{errors.country?.message}</div>
        </div>
        <div>
          <label className={styles['label']}>
            <span className={styles['image-input-btn']}>Upload image</span>
            <input
              {...register('image')}
              className={classNames(styles.input, { ['error-input']: errors.image })}
              type="file"
            />
          </label>
          <div className="error-message">{errors.image?.message}</div>
        </div>
        <div className={styles['checkbox-block']}>
          <label className={styles['checkbox-label']}>
            <input
              {...register('terms')}
              className={classNames(styles.input, { ['error-input']: errors.terms })}
              type="checkbox"
            />
            <span>I agree to terms and conditions</span>
          </label>
          <div className="error-message">{errors.terms?.message}</div>
        </div>
        <Button disabled={!isValid} className={styles.submit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default HookFormPage;
