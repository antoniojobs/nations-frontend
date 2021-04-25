import { useQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
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






export default function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.countries.map(({ name, index }) => (
    <div key={name}>
      <p>
        {index}: {name}
      </p>
    </div>
  ));
}