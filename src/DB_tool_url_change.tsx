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

interface DB_tool_url_change_prop{
    removeMain: (url:string) => void;
}


class DB_tool_url_change extends React.Component<DB_tool_url_change_prop>{
    urlFiled: HTMLInputElement | null;

    constructor(props:DB_tool_url_change_prop) {
        super(props);
        this.setUrl = this.setUrl.bind(this);
        this.urlFiled = null;
    }
    render() {
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
                <div>
                    <Box height="100px"/>
                    <Typography component="h1" variant="h5">
                    URLの変更
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.setUrl}
                    >
                        ページへ移動
                    </Button>
                    </form>
                </div>
            </Container>
        );
    }

    private setUrl(){
        if(this.urlFiled != null){   
            if(this.urlFiled.value != ""){
                this.props.removeMain(this.urlFiled.value)
            }
        }
    }
}

export default DB_tool_url_change