import { useLazyQuery, gql } from '@apollo/client';
import  {useEffect} from 'react';

const QUERY_COUNTRIES = gql`
query paises{
	countries{
    name,
    # capital,
    # emojiU,
    # code,
    # languages{
    #   name,
    #   # native
    # },
    # currency
  }
}
`;

const  useCountries = () => {
  const [getCountries, { loading, error, data }] = useLazyQuery(QUERY_COUNTRIES);

  useEffect(() => {
    getCountries()
  }, [getCountries])

  return {
    data, error, loading
  }
}

export { useCountries };