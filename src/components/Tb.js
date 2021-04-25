import React, {useEffect,useState} from 'react';
import {useCountries} from './useCountries';
// import { useQuery } from "@apollo/react-hooks";
// import {gql} from "graphql-tag";

export default function TableData() {
    const {data} = useCountries();
    useEffect(() => {
      console.log(data)
    }, [data])
    return data.countries.map((Country)=>(
        <div>
            <p>
                {Country.name}
            </p>
        </div>
    ))
}

// return data.rates.map(({ currency, rate }) => (
//     <div key={currency}>
//       <p>
//         {currency}: {rate}
//       </p>
//     </div>
//   ));