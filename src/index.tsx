import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var header=["職業", "HP", "MP"]
var url='https://wikiwiki.jp/seikai/%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0/%E8%BB%A2%E8%81%B7'

ReactDOM.render(<App header_data={header} url={url}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// ./node_modules/.bin/tsc --jsx react src/index.tsx --esModuleInterop
