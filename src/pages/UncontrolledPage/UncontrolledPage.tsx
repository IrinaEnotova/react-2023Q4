import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Button from '../../components/Button/Button';
import userSchema from '../../validations/uncontrolledValidation';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHook';
import { setUncontrolledState } from '../../store/reducers/uncontrolledSlice';
import { getBase64String } from '../../utils/base64';
import styles from './UncontrolledPage.module.css';
import { ValidationError } from 'yup';
import { initialErrorData } from '../../constants/constants';
import { InputBlock } from '../../components/InputBlock/InputBlock';
import { SelectBlock } from '../../components/SelectBlock/SelectBlock';

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
  const [isCountryList, setIsCountryList] = useState(false);
  const [filterData, setFilterData] = useState<JSX.Element[]>([]);
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.uncontrolledReducer);
  const navigate = useNavigate();
  const [errorsData, setErrorsData] = useState(initialErrorData);

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

  const handleClickOutside = (event: MouseEvent): void => {
    const { current: wrap } = wrapperRef;
    const target = event.target as Node;
    if (wrap && !wrap.contains(target)) {
      setIsCountryList(false);
    }
  };

  const updateCountry = (country: string): void => {
    if (countryRef.current) countryRef.current.value = country;
  };

  const getFilteredData = (): void => {
    setFilterData(
      countries
        .filter((country) => country.toLowerCase().startsWith(countryRef.current!.value))
        .map((country) => (
          <li onClick={() => updateCountry(country)} key={country} value={country}>
            {country}
          </li>
        ))
    );
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
          setUncontrolledState({
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
        <InputBlock inputName="name" placeholder="your name" type="text" errorValue={errorsData.name} ref={nameRef} />
        <InputBlock inputName="age" placeholder="your age" type="number" errorValue={errorsData.age} ref={ageRef} />
        <InputBlock
          inputName="email"
          placeholder="email@email.com"
          type="text"
          errorValue={errorsData.email}
          ref={emailRef}
        />
        <InputBlock
          inputName="password"
          placeholder="password"
          type="text"
          errorValue={errorsData.password}
          ref={passwordRef}
        />
        <InputBlock
          inputName="Confirm password"
          placeholder="password confirmation"
          type="text"
          errorValue={errorsData.confirmPassword}
          ref={confirmPasswordRef}
        />
        <SelectBlock ref={genderRef} errorValue={errorsData.gender} inputName="Gender" />
        <label className={classNames(styles['country-label'], styles['label'])}>
          <span>Country</span>
          <input
            ref={countryRef}
            className={styles.input}
            type="text"
            placeholder="your country"
            onClick={() => {
              setIsCountryList(!isCountryList);
              getFilteredData();
            }}
            onChange={() => {
              getFilteredData();
            }}
          />
          {isCountryList && filterData.length > 0 && <ul className={styles['country-list']}>{filterData}</ul>}
        </label>
        <div className="error-message">{errorsData.country}</div>
        <div>
          <label className={styles['label']}>
            <span className={styles['image-input-btn']}>Upload image</span>
            <input ref={imageRef} className={styles['image-input']} type="file" />
          </label>
          <div className="error-message">{errorsData.image}</div>
        </div>
        <div>
          <label className={styles['checkbox-label']}>
            <input ref={termsRef} type="checkbox" />
            <span>I agree to terms and conditions</span>
          </label>
          <div className="error-message">{errorsData.terms}</div>
        </div>
        <Button className={styles.submit}>Submit</Button>
      </form>
    </div>
  );
};

export default UncontrolledPage;
