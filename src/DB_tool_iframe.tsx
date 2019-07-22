import React from 'react';
import './DB_tool_iframe.css'
import { request } from 'http';
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
import Box from '@material-ui/core/Box';
import Iframe from 'react-iframe'

interface IDBToolIframeProps {
    url:string;
}
interface IDBToolIframeState {
    innerhtml:string;
    lastUrl:string;
}

class DB_tool_iframe extends React.Component<IDBToolIframeProps, IDBToolIframeState>{   
    private iframeRef: HTMLIFrameElement | null;
    private timerId:number;
    constructor(props:IDBToolIframeProps) {
        super(props);
        this.iframeRef = null;
        this.timerId = 0
        this.state = {
            innerhtml:"",
            lastUrl:props.url
        }
    }
    
    componentDidMount () {
        if (this.iframeRef !== null){
            var data:any;
            var self = this;
            axios.get('https://web2db-server.herokuapp.com/url2html/get',{
                    params: {
                        // ここにクエリパラメータを指定する
                        url: self.props.url
                    }
                })
                .then(function (response) {
                    data = response.data;
                    self.setState({
                        innerhtml:data
                    })
                })
                　//chachでエラーの挙動を定義
                .catch(function (error) {
                    console.log(error);
                    self.setState({
                        innerhtml:"<p>ページが読み込めませんでした</p>"
                    })
                });
            if(this.iframeRef.contentDocument != null){
                var els = this.iframeRef.contentDocument.querySelectorAll('a');
                for (var i=0, l=els.length; i<l; i++) {
                    var el = els[i];
                    el.className="nav";
                }
            }
        }
    }

    shouldComponentUpdate(nextProps:IDBToolIframeProps, nextState:IDBToolIframeState){
        if(this.iframeRef){
            if(this.iframeRef.srcdoc === nextState.innerhtml && this.props.url === this.state.lastUrl){
                return false;
            }
            if(this.props.url != this.state.lastUrl){
                var data:string;
                var self = this;
                axios.get('https://web2db-server.herokuapp.com/url2html/get',{
                        params: {
                            // ここにクエリパラメータを指定する
                            url: self.props.url
                        }
                    })
                    .then(function (response) {
                        data = response.data;
                        self.setState({
                            innerhtml:data,
                            lastUrl:self.props.url
                        })
                    })
                    　//chachでエラーの挙動を定義
                    .catch(function (error) {
                        console.log(error);
                        self.setState({
                            innerhtml:"<p>ページが読み込めませんでした</p>",
                            lastUrl:self.props.url
                        })
                    });
                return false;
            }
            this.iframeRef.srcdoc = nextState.innerhtml;
        }
        return true;
    }
    
    render(){
        return (
            <Box flexDirection="row">
                <iframe id='tst' sandbox="allow-forms allow-same-origin" ref={(iframe: HTMLIFrameElement) => { this.iframeRef = iframe} } className='DB_iframe'></iframe>
            </Box> 
        );
    }

    public selectText(){    
        if(this.iframeRef != null && this.iframeRef.contentDocument!=null){
            var sel = this.iframeRef.contentDocument.getSelection()
            if (sel != null){
                return sel.toString()
            }
        }
    }
}

export default DB_tool_iframe;