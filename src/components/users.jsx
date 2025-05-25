import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {supabase, supaAdmin} from '../utils/config';
import {useEffect, useState , useContext} from 'react';
import { Badge } from 'react-bootstrap';
import { CompleteDataContext } from '../context/completeData';
import { Button } from '@mui/material';
import useLoanRequestSubscription from '../utils/realtime';







export default function  Allusers() {

  const [usersdata,setusersdata]=useState([])
  const{fetchusersData}=  useContext(CompleteDataContext)

  useEffect(()=>{
    fetchusersData()
  },[])
 
 const {allusersData}= useContext(CompleteDataContext)
 
 
console.log(allusersData)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow > 
            <TableCell align="center">EMAIL</TableCell>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">ACTION</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {allusersData.map((val) => (
            <TableRow
              key={val.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  align="center">{val.email}</TableCell >
              <TableCell  align="center">{val.id}</TableCell >
              <TableCell  align="center"><Button variant='outlined' onClick={async()=>{
try {
      const { data, error } = await supaAdmin.auth.admin.deleteUser(
    val.id
  )

  if(data){
    console.log(data)
      fetchusersData()
  }

  } catch (error) {
    
  }
  
              }}>DELETE</Button></TableCell >
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




