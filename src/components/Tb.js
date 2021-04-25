import React, {useEffect} from 'react';
import {useCountries} from './useCountries';
import {TableContainer, TableHead, TableRow, Paper, TableCell, TableBody} from '@material-ui/core';
import Emoji from './Emoji';

export default function TableData() {
    const {countries, error, loadingRequest, searchCountries} = useCountries();
    
    useEffect(() => {
        searchCountries()
        // eslint-disable-next-line
    }, [])

    if (loadingRequest) return 'Carregando...';
       
    if (!countries.length ) return "Não há dados";

    const renderContent = () => {
        if(error) {
            return 'Error'
        }
        // U+1F1E7 U+1F1F7
        if(countries.length) {
            return countries.map((country,index)  => {
                return (
                    <TableRow key={index.toString()}>
                        <TableCell align="left">{country.name}</TableCell>
                        <TableCell>{country.capital}</TableCell>
                        <TableCell><Emoji symbol={country.emojiU}/></TableCell>
                        <TableCell>{country.code}</TableCell>
                        <TableCell>{country.languages.name}</TableCell>
                        <TableCell>{country.currency}</TableCell>
                    </TableRow>
                )
            })
        }
    }


    return (
        <TableContainer component={Paper}>
            <TableHead>
                <TableRow>
                    <TableCell align="left">Nome do Pais</TableCell>
                    <TableCell>CAPITAL</TableCell>
                    <TableCell>BANDEIRA</TableCell>
                    <TableCell>CODE</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Moeda</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {renderContent()}
            </TableBody>    
        </TableContainer>
    )
}