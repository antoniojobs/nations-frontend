import { useLazyQuery, gql } from '@apollo/client';
import  {useEffect, useState} from 'react';

const QUERY_COUNTRIES = gql`
query paises{
	countries{
    name,
    capital,
    emojiU,
    code,
    languages{
      name,
      native
    },
    currency
  }
}
`;

const  useCountries = () => {
  const [getCountries, { error, data }] = useLazyQuery(QUERY_COUNTRIES);
  const [countries, setCountries] = useState([]);
  const [loadingRequest, setLoadingRequest] = useState(false);

  const  searchCountries = () => {
    setLoadingRequest(true)
    getCountries()
  }

  useEffect(() => {
    if(data !== undefined && data.countries) {
      setCountries(data.countries)
      setLoadingRequest(false)
    }
  }, [data])

  return {
    error, countries, loadingRequest, searchCountries
  }
}

export { useCountries };