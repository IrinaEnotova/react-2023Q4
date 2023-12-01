import { RefObject, useState } from 'react';

export default function useCountries(
  wrapperRef: RefObject<HTMLDivElement>,
  countryRef: RefObject<HTMLInputElement>,
  countries: string[]
): [
  filterData: JSX.Element[],
  isCountryList: boolean,
  handleClickOutside: (event: MouseEvent) => void,
  getFilteredData: () => void,
  changeIsCountryList: (value: boolean) => void,
] {
  const [filterData, setFilterData] = useState<JSX.Element[]>([]);
  const [isCountryList, setIsCountryList] = useState(false);

  const changeIsCountryList = (value: boolean): void => {
    setIsCountryList(value);
  };

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

  return [filterData, isCountryList, handleClickOutside, getFilteredData, changeIsCountryList];
}
