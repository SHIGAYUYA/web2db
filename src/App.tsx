import React from 'react';
import './App.css';
import DB_tool_header from './DB_tool_header'
import DB_tool_iframe from './DB_tool_iframe'
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import InputLabel from '@material-ui/core/InputLabel';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
interface IDBAppProps extends WithStyles<typeof styles> {
  header_data:string[];
  url:string; 
}
interface IDBAppState {
  textValues: {[key: string]: string;};
  textForcus: string; 
  header_data:string[];
  url:string; 
  rows: {[key: string]: string;}[];
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  open: boolean,
}


const styles = (theme:Theme) => ({
  toolbar: theme.mixins.toolbar,
  appbar_root: {
    flexGrow: 1,
  },
  appbar_menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar_title: {
    flexGrow: 1,
  },
})

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderColor: theme.palette.primary.main,
      },
    },
  }),
)(InputBase);

class App extends React.Component<IDBAppProps, IDBAppState>{
  db_iframe: DB_tool_iframe | null;

  constructor(props:IDBAppProps) {
    super(props);
    var textValues:{[key: string]: string;} = {};
    for(var i=0; i < props.header_data.length; i++){
        textValues[props.header_data[i]] = ""
    }
    this.state = {
      textValues:textValues,
      textForcus:this.props.header_data[0],
      header_data:props.header_data,
      url:props.url,
      rows:[],
      open: false,
      anchorEl: null,
    };
    this.chengeForcus = this.chengeForcus.bind(this)
    this.setText = this.setText.bind(this)
    this.pushDatum = this.pushDatum.bind(this)
    this.createCSV = this.createCSV.bind(this)
    this.handleDownload = this.handleDownload.bind(this)
    this.db_iframe=null
  }

  chengeForcus(target:string){
    this.setState({
      textForcus: target
    });
  }

  pushDatum(datum:{[key: string]: string;}){
    const rows = this.state.rows;
    rows.push(datum);
    this.setState({
      rows:rows
    });
  }

  handleClick = (event:any) => { // 引数追加
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false, anchorEl: null }); // 追加
  };

  private setText(nextTextValues: {[key: string]: string;}) {
    if(nextTextValues[""]){
      if(this.db_iframe){
        var textValues = this.state.textValues;
        var sel = this.db_iframe.selectText();
        if (sel != null){
          textValues[this.state.textForcus] =  textValues[this.state.textForcus] + sel;
          this.setState({textValues: textValues});
        }
      }
      return;
    }
    this.setState({textValues: nextTextValues});
  }


  

  render(){
    const classes = this.props.classes;
    const menuItems = ["メニューサンプル1", "メニューサンプル2", "メニューサンプル3"];
    return (
      <div>
        <div className={classes.appbar_root}>
          <CssBaseline />
          {/* <Login /> は削除 */}
          {/* <Navbar /> は削除 */}
          <AppBar>
            <Toolbar>
            <IconButton edge="start" className={classes.appbar_menuButton} color="inherit" aria-label="Menu" onClick={this.handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu"
              open={Boolean(this.state.anchorEl)} // 追加
              anchorEl={this.state.anchorEl} // 追加
              onClose={this.handleClose}
        >
              {menuItems.map((item, index) => (
                <MenuItem key={item} onClick={this.handleClose}>
                  {item}
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="h6" className={classes.appbar_title}>
              Web2DB
            </Typography>
            <a id="download" href="#" download="test.txt">
              <IconButton onClick={this.handleDownload} aria-label="Delete">
                <ArrowDownwardIcon fontSize="large"/>
              </IconButton>
            </a>
            </Toolbar>
          </AppBar>
          <div className={classes.toolbar} />  {/* #1 */}
        </div>
        <DB_tool_header 
          header_data={this.state.header_data} 
          textValues={this.state.textValues} 
          textForcus={this.state.textForcus} 
          chengeForcus={this.chengeForcus}
          setText={this.setText}
          rows={this.state.rows}
          pushDatum={this.pushDatum}
          />
        <DB_tool_iframe ref={(db_iframe: DB_tool_iframe) => { this.db_iframe = db_iframe } } url={this.state.url}/>
      </div>
    );
  }
  private createCSV(){
    var content = "";
    console.log(this.state.header_data)
    console.log(this.state.rows)
    for(var i = 0; i < this.state.header_data.length; i++){
      content +=  this.state.header_data[i] + ',';
    }
    content += "\n"
    for(var j = 0; j < this.state.rows.length; j++){
      for(var i = 0; i < this.state.header_data.length; i++){
        if(this.state.rows[i][this.state.header_data[i]]){
          content +=  this.state.rows[i][this.state.header_data[i]];
        }
      }
      content += "\n"
    }
    return content;
  }

  private handleDownload() {
    var content:string = this.createCSV();
    var blob = new Blob([ content ], { "type" : "text/plain" });

    if (window.navigator.msSaveBlob) { 
        window.navigator.msSaveBlob(blob, "test.txt"); 

        // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        window.navigator.msSaveOrOpenBlob(blob, "test.txt"); 
    } else {
      var a = document.getElementById("download") as HTMLAnchorElement
      if(a){
        a.href = window.URL.createObjectURL(blob);
      }
    }
  }
}

export default withStyles(styles)(App);
