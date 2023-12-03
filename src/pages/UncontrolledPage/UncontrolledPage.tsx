import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Button from '../../components/Button/Button';
import userSchema from '../../validations/uncontrolledValidation';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHook';
import { setUsersState } from '../../store/reducers/userSlice';
import { getBase64String } from '../../utils/base64';
import styles from './UncontrolledPage.module.css';
import { ValidationError } from 'yup';
import { initialErrorData } from '../../constants/constants';
import { SelectBlock } from '../../components/InputsUncontrolled/SelectBlock/SelectBlock';
import useCountries from '../../hooks/useCountries';
import { InputUnName } from '../../components/InputsUncontrolled/InputName/InputName';
import { InputUnAge } from '../../components/InputsUncontrolled/InputAge/InputAge';
import { InputUnEmail } from '../../components/InputsUncontrolled/InputEmail/InputEmail';
import { InputUnPassword } from '../../components/InputsUncontrolled/InputPassword/InputPassword';
import { InputUnConfirmation } from '../../components/InputsUncontrolled/InputConfirmation/InputConfirmation';
import { InputUnUpload } from '../../components/InputsUncontrolled/InputUpload/InputUpload';
import { InputUnCheckbox } from '../../components/InputsUncontrolled/InputCheckbox/InputCheckbox';
import { definePasswordStrength } from '../../utils/passStrength';

const UncontrolledPage: FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [errorsData, setErrorsData] = useState(initialErrorData);
  const [passStrength, setPassStrength] = useState('');
  const [filterData, isCountryList, handleClickOutside, getFilteredData, changeIsCountryList] = useCountries(
    wrapperRef,
    countryRef,
    countries
  );

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

  const handleCountryClick = (isCountryList: boolean): void => {
    changeIsCountryList(!isCountryList);
    getFilteredData();
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const file = imageRef.current!.files![0];
    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      country: countryRef.current?.value,
      image: file,
      terms: termsRef.current?.checked,
    };
    await userSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        setErrorsData(initialErrorData);
        dispatch(
          setUsersState({
            name: nameRef.current!.value,
            age: +ageRef.current!.value,
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
            gender: genderRef.current!.value,
            isAcceptTerms: termsRef.current!.checked,
            image: await getBase64String(file),
            country: countryRef.current!.value,
          })
        );
        navigate('/');
      })
      .catch((err) => {
        setErrorsData(initialErrorData);
        setPassStrength(definePasswordStrength(passwordRef.current!.value));
        if (err instanceof ValidationError) {
          err.inner.forEach((e) => {
            setErrorsData((prev) => ({ ...prev, [e.path!]: [e.message] }));
          });
        }
      });
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <h1 className={styles['heading']}>Uncontrolled components approach</h1>
      <Link className={styles['to-main']} to="/">
        <Button>To main</Button>
      </Link>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputUnName errorValue={errorsData.name} ref={nameRef} />
        <InputUnAge errorValue={errorsData.age} ref={ageRef} />
        <InputUnEmail errorValue={errorsData.email} ref={emailRef} />
        <InputUnPassword passStrength={passStrength} errorValue={errorsData.password} ref={passwordRef} />
        <InputUnConfirmation errorValue={errorsData.confirmPassword} ref={confirmPasswordRef} />
        <SelectBlock ref={genderRef} errorValue={errorsData.gender} inputName="Gender" />
        <label className={classNames(styles['country-label'], styles['label'])}>
          <span>Country</span>
          <input
            ref={countryRef}
            className={classNames(styles.input, { ['error-input']: errorsData.country })}
            type="text"
            placeholder="your country"
            onClick={() => {
              handleCountryClick(isCountryList);
            }}
            onChange={getFilteredData}
          />
          {isCountryList && filterData.length > 0 && <ul className={styles['country-list']}>{filterData}</ul>}
        </label>
        <div className="error-message">{errorsData.country}</div>
        <InputUnUpload ref={imageRef} errorValue={errorsData.image} />
        <InputUnCheckbox ref={termsRef} errorValue={errorsData.terms} />
        <Button className={styles.submit}>Submit</Button>
      </form>
    </div>
  );
};

export default UncontrolledPage;
