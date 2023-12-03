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
import { InputName } from '../../components/InputsHook/InputName/InputName';
import { InputAge } from '../../components/InputsHook/InputAge/InputAge';
import { InputEmail } from '../../components/InputsHook/InputEmail/InputEmail';
import { InputPassword } from '../../components/InputsHook/InputPassword/InputPassword';
import { InputConfirmation } from '../../components/InputsHook/InputConfirmation/InputConfirmation';
import { SelectGender } from '../../components/InputsHook/SelectGender/SelectGender';
import { InputUpload } from '../../components/InputsHook/InputUpload/InputUpload';
import { InputCheckbox } from '../../components/InputsHook/InputCheckbox/InputCheckbox';

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
        <InputName register={register} errors={errors} />
        <InputAge register={register} errors={errors} />
        <InputEmail register={register} errors={errors} />
        <InputPassword register={register} errors={errors} />
        <InputConfirmation register={register} errors={errors} />
        <SelectGender register={register} errors={errors} />
        <div>
          <label className={classNames(styles['country-label'], styles['label'])}>
            <span>Country</span>
            <input
              {...register('country')}
              value={countryValue}
              placeholder="your country"
              autoComplete="off"
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
        <InputUpload register={register} errors={errors} />
        <InputCheckbox register={register} errors={errors} />
        <Button disabled={!isValid} className={styles.submit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default HookFormPage;
