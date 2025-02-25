import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "./DB_tool_table.css"
import { Rnd } from 'react-rnd';
import Box from '@material-ui/core/Box';
import common from '@material-ui/core/colors/common';


interface DB_tool_table_prop{
    header_data: string[];
    data: {[key: string]: string;}[];
}

class DB_tool_table extends React.Component<DB_tool_table_prop> {
  render(){
    const style = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "solid 1px #ddd",
      background: "#f0f0f0"
    };
    return (
        <Rnd
          style={style} 
          default={{
              x: 0,
              y: 0,
              width: "800px",
              height: "200px",
            }} 
          >
          <Box component="div" width="100%" height="100%" overflow="auto" bgcolor="background.paper">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{
                    backgroundColor: common.black,
                    color: common.white,
                    position: "sticky",
                    top: 0
                  }} >
                      {this.props.header_data[0]}
                  </TableCell>
                  {this.props.header_data.slice(1, this.props.header_data.length).map(colume => (
                      <TableCell align="right" style={{
                        backgroundColor: common.black,
                        color: common.white,
                        position: "sticky",
                        top: 0
                      }} >{colume}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.data.map(row => (
                  <TableRow key={row[this.props.header_data[0]]}>
                      <TableCell component="th" scope="row">
                          {row[this.props.header_data[0]]}
                      </TableCell>
                      {this.props.header_data.slice(1, this.props.header_data.length).map(colume => (
                          <TableCell align="right">{row[colume]}</TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Rnd>
      );
  }
}

export default DB_tool_table;