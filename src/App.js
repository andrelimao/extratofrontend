import './App.css';
import TablePagination from '@mui/base/TablePagination';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputMask from 'react-input-mask';
function DateMask(props){
  return(
      <InputMask
        mask = '99/99/9999'
        value = {props.value}
        onChange = {props.onChange}>
        </InputMask>
  )
}
function App() {
  const [nomeOperador, setNomeOperador] = useState('');
  const[saldoPeriodo, setSaldoPeriodo] = useState(0);
  const[transferencias, setTransferencias] = useState([]);
  const[dataInicio, setDataInicio] = useState('');
  const[dataFim, setDataFim] = useState('');

  

    
  
  useEffect(() => {
    setDataInicio(transferencias.data_transferencia)
    setDataFim(transferencias.data_transferencia)
    const fetchData = async () => {
      try {
        const response = await axios.get('/transferencias'); 
        setTransferencias(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const total = transferencias.reduce((acc, transferencia) => {
    return acc + transferencia.valor;},0);
  
    
  const filtrar = () => {
    transferencia.data_transferencia.includes(dataInicio)&&
    transferencia.data_transferencia.includes(dataFim) ||
    transferencia.data_transferencia.includes(dataInicio)&&
    transferencia.data_transferencia.includes(dataFim) &&
    transferencia.nomeOperador.toLowerCase.includes(nomeOperador)

  }
  const totalPeriodo = transferencias.reduce((filtrar, transferencia) =>{
    return filtrar+transferencia.valor;},0);
  }
  

  return (
    <div className='container'>
    <div className='campos_pesquisa'>
      <div className='di'>
      <label for = "Data de Ínicio"></label>
        <DateMask value = {dataInicio}>
                  </DateMask>
        </div>
        <div className='df'>
          <label for = 'Data de Fim'></label>
          <DateMask value = {dataFim}>
                  </DateMask>
        </div>
        <div className='campo_operador'>
          <label for = 'Nome Operador Transacionado'></label>
          <input type = "input" className='caixa_texto' value = {nomeOperador}></input>
        </div>
      </div>
      <button onClick={filtrar} className='botao'></button>

      <div className='tabela'>
        <TableContainer component = {Paper}>
          <Table aria-label = "tabela de valores">
            <TableHead>
              <TableRow>
                <TableCell>Saldo total: R${soma}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Saldo no período: R$ {totalPeriodo} </TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell align = "left">Data</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align = "left">Valor</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align = "left">Tipo</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align = "left">Operador</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transferencias.map((transferencia) =>(
              <TableRow key = {transferencia.id}>
                <TableCell component = "th" scope = "id"></TableCell>
              </TableRow>
              <TableCell align = "left">{transferencia.data_transferencia}</TableCell>
              <TableCell align = "left">{transferencia.valor}</TableCell>
              <TableCell align = "left">{transferencia.tipo}</TableCell>
              <TableCell align = "left">{transferencia.nome_operador_transacao}</TableCell>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
      </div>

      </div>>
  );
}

export default App;
