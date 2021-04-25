import React from "react";
import { useState, useEffect } from "react";
import { Link, BrowserRouter as Route, useHistory } from "react-router-dom";
import api from "../../services/api";
//import TABLES... MATERIAL IMPORTS
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import { DataGrid } from '@material-ui/data-grid';

import "./../../global.css";
import { Button, Input, Select } from "@material-ui/core";
export default function DenseTable() {
  const useStyles = makeStyles({
    table: {
      // minWidth: 650,
    },
  });
  
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageRange, setPageRange] = useState(5);
  const [totalEntregas, setTotalEntregas] = useState(1);
  const [totalPages, setTotalPages] = useState(4);
  const [idOperado, setIdOperado] = useState("");
  
  useEffect(()=>{
    async function loadDataTable() {
      const response = await api.get("listar",{
        params:{
          page:`${currentPageNum}`,
          range:`${pageRange}`
        }
      });
      const totalRegisters = response.headers["x-total-count"]
      console.log(response.headers);
      setTotalEntregas(response.data["x-total-count"]);
      let tempTotal = ((response.data["x-total-count"])/(pageRange))
      if(tempTotal%1>0){
        setTotalPages(Math.ceil(tempTotal))
      }else{
        setTotalPages((response.data["x-total-count"])/(pageRange))
      }
      setRows(response.data.dados_entregas);
    } 
    loadDataTable()
  },[currentPageNum,pageRange])
  async function hendlerDelete(id, nome) {
    if (id != ""||id != undefined) {
      let confirmation = window.confirm(
        `Presione enter ou clique em ok para apagar a entrega de ${nome}`
        );
        if (confirmation == 1) {
          try {
            const retorno = await api.delete(`entrega/${id}`);
            console.log(retorno);
            setRows(rows.filter((row) => row.idEntrega !== id));
          } catch (error) {
            return error;
          }
        } else {
          alert(`cancelado`);
        }
      } else {
        alert("operação abortada");
      }
    }
    function handlerPaginationDecrease(e) {
      if(currentPageNum>0){
        setCurrentPageNum(currentPageNum-1)
      }
    }
    function handlerPaginationIncrease(e) {
      if(totalPages>currentPageNum){
        setCurrentPageNum(currentPageNum+1)
      }else{
        alert("fim das PGs")
      }
      // alert(pageRange);
    }
    function handlerPaginationJumpEnd(e) {
      if(totalPages>currentPageNum){
        setCurrentPageNum(totalPages)
      }else{
        alert("fim das PGs")
      }
      // alert(pageRange);
    }
    function handlerPaginationJumpStart(e) {
      if(currentPageNum>1){
        setCurrentPageNum(1)
      }else{
        alert("chegou ao início das PGs")
      }
      // alert(pageRange);
    }
    function handlerPaginationRange(e) {
      if(e){
        setPageRange(e)
      }
    }
    useEffect(()=>{
      handlerPaginationRange(pageRange)
    },[pageRange])
    
    const classes = useStyles();
    return (
      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
      <TableRow>
      <TableCell align="left">ID</TableCell>
      <TableCell align="left">Rotas</TableCell>
      <TableCell align="left">Deletar</TableCell>
      <TableCell align="left">Nome</TableCell>
      <TableCell align="left">Telefone</TableCell>
      <TableCell align="left">Rua</TableCell>
      <TableCell align="left">Numero</TableCell>
      <TableCell align="left">Cep Cliente</TableCell>
      <TableCell align="left">Rua Partida</TableCell>
      <TableCell align="left">Numero Partida</TableCell>
      <TableCell align="left">Cep Partida</TableCell>
      <TableCell align="left">Data Entrega</TableCell>
      </TableRow>
      </TableHead>
      <TableBody>
      {rows.map((row) => (
        <TableRow key={row.idEntrega}>
        <TableCell align="left">{row.idEntrega}</TableCell>
        <TableCell component="th" scope="row">
        {
          <Link
          to={`/Mapa/?origem=${row.ruaPartida},${row.numeroPartida},${row.cepPartida}&destino=${row.rua},${row.numero},${row.cepCliente}`}>
          rota
          </Link>
        }
        </TableCell>
        <TableCell component="th" scope="row">
        {/* {<Link to={`/entrega/:${row.idEntrega}`}>Deletar</Link>} */}
        <button
        className="buttonD"
        type="button"
        onClick={() => {
          hendlerDelete(row.idEntrega, row.nome);
        }}
        >
        APAGAR
        </button>
        </TableCell>
        <TableCell align="left">{row.nome}</TableCell>
        <TableCell align="left">{row.telefone}</TableCell>
        <TableCell align="left">{row.rua}</TableCell>
        <TableCell align="left">{row.numero}</TableCell>
        <TableCell align="left">{row.cepCliente}</TableCell>
        <TableCell align="left">{row.ruaPartida}</TableCell>
        <TableCell align="left">{row.numeroPartida}</TableCell>
        <TableCell align="left">{row.cepPartida}</TableCell>
        <TableCell align="left">{row.dataEntrega}</TableCell>
        </TableRow>
        ))}
        </TableBody>
        </Table>
        <div style={{width: "18%",
        display: "flex",
        justifyContent:"space-between",
        padding: 5,
        marginLeft: "40%"
      }}>
      
      <select defaultValue={5} id={"selectvalue"} onChange={(e)=>handlerPaginationRange(e.target.value)} style={{marginRight:0}}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      </select>
      {/* <Input disabled={0} style={{marginLeft:"8%",width:1900}} value={`${totalEntregas} registros`}></Input> */}
      <span>
      <div style={{color:"#888888",fontWeight:"900",margin:"0px 10px 0px 10px",whiteSpace:"nowrap"}}>{`${totalEntregas} registros`}</div>
      </span>
      <span>
      <div style={{color:"#888888",fontWeight:"900",margin:"0px 10px 0px 10px",whiteSpace:"nowrap"}}>{` total de páginas ${totalPages}`}</div>
      </span>
      <button
      style={{marginLeft:2}}
      className="buttonD"
      type="button"
      onClick={(e) => {
        handlerPaginationJumpStart(e);
      }}
      >
      {"<<|"} 
      </button>
      <button
      style={{marginLeft:2}}
      className="buttonD"
      type="button"
      onClick={(e) => {
        handlerPaginationDecrease(e);
      }}
      >
      {"<"} 
      </button>
      
      <button
      style={{marginLeft:2}}
      className="buttonD"
      type="button"
      onClick={(e) => {
        handlerPaginationIncrease(e);
      }}
      >
      {">"} 
      </button>
      <button
      style={{marginLeft:2}}
      className="buttonD"
      type="button"
      onClick={(e) => {
        handlerPaginationJumpEnd(e);
      }}
      >
      {"|>>"} 
      </button>
      </div>
      </TableContainer>
      );
    }
    