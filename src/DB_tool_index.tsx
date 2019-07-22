import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { threadId } from 'worker_threads';

interface DB_tool_index_prop{
    moveMain: (head:string, url:string) => void;
}


class DB_tool_index extends React.Component<DB_tool_index_prop>{
    urlFiled: HTMLInputElement | null;
    headerFiled : HTMLInputElement | null;

    constructor(props:DB_tool_index_prop) {
        super(props);
        this.setHeaderAndUrl = this.setHeaderAndUrl.bind(this);
        this.urlFiled = null;
        this.headerFiled = null;
    }
    render() {
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
                <div>
                    <Box height="100px"/>
                    <Typography component="h1" variant="h5">
                    URLとヘッダーの指定
                    </Typography>
                    <form noValidate>
                    <TextField
                        inputRef={(input:HTMLInputElement)=>{this.urlFiled = input}}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="URL"
                        label="URL"
                        id="URL"
                        autoFocus
                    />
                    <TextField
                        inputRef={(input:HTMLInputElement)=>{this.headerFiled = input}}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Header"
                        label="Header"
                        id="Header"
                    />
                    <Typography component="h1" variant="h6">
                    ※Headerは "," 区切り
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.setHeaderAndUrl}
                    >
                        ページへ移動
                    </Button>
                    </form>
                </div>
            </Container>
        );
    }

    private setHeaderAndUrl(){
        if(this.headerFiled != null && this.urlFiled != null){   
            if(this.headerFiled.value != "" && this.urlFiled.value != ""){
                this.props.moveMain(this.headerFiled.value, this.urlFiled.value)
            }
        }
    }
}

export default DB_tool_index