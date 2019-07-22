"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
require("./App.css");
var DB_tool_header_1 = __importDefault(require("./DB_tool_header"));
var DB_tool_iframe_1 = __importDefault(require("./DB_tool_iframe"));
var core_1 = require("@material-ui/core");
var AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
var Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
var styles_1 = require("@material-ui/core/styles");
var InputBase_1 = __importDefault(require("@material-ui/core/InputBase"));
var ArrowDownward_1 = __importDefault(require("@material-ui/icons/ArrowDownward"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Menu_1 = __importDefault(require("@material-ui/icons/Menu"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Menu_2 = __importDefault(require("@material-ui/core/Menu"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var DB_tool_index_1 = __importDefault(require("./DB_tool_index"));
var DB_tool_url_change_1 = __importDefault(require("./DB_tool_url_change"));
var styles = function (theme) { return ({
    toolbar: theme.mixins.toolbar,
    appbar_root: {
        flexGrow: 1
    },
    appbar_menuButton: {
        marginRight: theme.spacing(2)
    },
    appbar_title: {
        flexGrow: 1
    }
}); };
var BootstrapInput = styles_1.withStyles(function (theme) {
    return styles_1.createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3)
            }
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
                borderColor: theme.palette.primary.main
            }
        }
    });
})(InputBase_1["default"]);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClick = function (event) {
            _this.setState({ open: true, anchorEl: event.currentTarget });
        };
        _this.handleClose = function () {
            _this.setState({ open: false, anchorEl: null }); // 追加
        };
        _this.moveUrlChange = function () {
            _this.setState({ open: false, anchorEl: null, page: "urlChange" }); // 追加
        };
        var textValues = {};
        for (var i = 0; i < props.header_data.length; i++) {
            textValues[props.header_data[i]] = "";
        }
        _this.state = {
            textValues: textValues,
            textForcus: _this.props.header_data[0],
            header_data: props.header_data,
            url: props.url,
            rows: [],
            open: false,
            anchorEl: null,
            page: "index"
        };
        _this.chengeForcus = _this.chengeForcus.bind(_this);
        _this.setText = _this.setText.bind(_this);
        _this.pushDatum = _this.pushDatum.bind(_this);
        _this.createCSV = _this.createCSV.bind(_this);
        _this.handleDownload = _this.handleDownload.bind(_this);
        _this.moveMain = _this.moveMain.bind(_this);
        _this.removeMain = _this.removeMain.bind(_this);
        _this.moveUrlChange = _this.moveUrlChange.bind(_this);
        _this.removeOnlyMain = _this.removeOnlyMain.bind(_this);
        _this.db_iframe = null;
        return _this;
    }
    App.prototype.chengeForcus = function (target) {
        this.setState({
            textForcus: target
        });
    };
    App.prototype.pushDatum = function (datum) {
        var rows = this.state.rows;
        rows.push(datum);
        this.setState({
            rows: rows
        });
    };
    App.prototype.moveMain = function (head, url) {
        var ary = head.split(',');
        var textValues = {};
        for (var i = 0; i < ary.length; i++) {
            textValues[ary[i]] = "";
        }
        this.setState({
            textValues: textValues,
            textForcus: ary[0],
            header_data: ary,
            url: url,
            rows: [],
            page: "main"
        });
    };
    App.prototype.removeMain = function (url) {
        var textValues = {};
        for (var i = 0; i < this.state.header_data.length; i++) {
            textValues[this.state.header_data[i]] = "";
        }
        this.setState({
            textValues: textValues,
            textForcus: this.state.header_data[0],
            url: url,
            page: "main"
        });
    };
    App.prototype.removeOnlyMain = function () {
        this.setState({
            page: "main"
        });
    };
    App.prototype.setText = function (nextTextValues) {
        if (nextTextValues[""]) {
            if (this.db_iframe) {
                var textValues = this.state.textValues;
                var sel = this.db_iframe.selectText();
                if (sel != null) {
                    textValues[this.state.textForcus] = textValues[this.state.textForcus] + sel;
                    this.setState({ textValues: textValues });
                }
            }
            return;
        }
        this.setState({ textValues: nextTextValues });
    };
    App.prototype.render = function () {
        var _this = this;
        var classes = this.props.classes;
        var menuItems = ["No Item"];
        var menufuncs = [this.handleClose];
        var partial = react_1["default"].createElement("div", null);
        if (this.state.page == "index") {
            partial = react_1["default"].createElement(DB_tool_index_1["default"], { moveMain: this.moveMain });
        }
        else if (this.state.page == "main") {
            menuItems = ["URL変更"];
            menufuncs = [this.moveUrlChange];
            partial = react_1["default"].createElement("div", null,
                react_1["default"].createElement(DB_tool_header_1["default"], { header_data: this.state.header_data, textValues: this.state.textValues, textForcus: this.state.textForcus, chengeForcus: this.chengeForcus, setText: this.setText, rows: this.state.rows, pushDatum: this.pushDatum }),
                react_1["default"].createElement(DB_tool_iframe_1["default"], { ref: function (db_iframe) { _this.db_iframe = db_iframe; }, url: this.state.url }));
        }
        else if (this.state.page == "urlChange") {
            menuItems = ["元のページに戻る"];
            menufuncs = [this.removeOnlyMain];
            partial = react_1["default"].createElement(DB_tool_url_change_1["default"], { removeMain: this.removeMain });
        }
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: classes.appbar_root },
                react_1["default"].createElement(core_1.CssBaseline, null),
                react_1["default"].createElement(AppBar_1["default"], null,
                    react_1["default"].createElement(Toolbar_1["default"], null,
                        react_1["default"].createElement(IconButton_1["default"], { edge: "start", className: classes.appbar_menuButton, color: "inherit", "aria-label": "Menu", onClick: this.handleClick },
                            react_1["default"].createElement(Menu_1["default"], null)),
                        react_1["default"].createElement(Menu_2["default"], { id: "menu", open: Boolean(this.state.anchorEl), anchorEl: this.state.anchorEl, onClose: this.handleClose }, menuItems.map(function (item, index) { return (react_1["default"].createElement(MenuItem_1["default"], { key: item, onClick: menufuncs[index] }, item)); })),
                        react_1["default"].createElement(Typography_1["default"], { variant: "h6", className: classes.appbar_title }, "Web2DB"),
                        react_1["default"].createElement("a", { id: "download", href: "#", download: "data.csv" },
                            react_1["default"].createElement(IconButton_1["default"], { onClick: this.handleDownload, "aria-label": "Delete" },
                                react_1["default"].createElement(ArrowDownward_1["default"], { fontSize: "large" }))))),
                react_1["default"].createElement("div", { className: classes.toolbar }),
                "  "),
            partial));
    };
    App.prototype.createCSV = function () {
        var content = "";
        // console.log(this.state.header_data)
        // console.log(this.state.rows)
        for (var i = 0; i < this.state.header_data.length; i++) {
            content += this.state.header_data[i] + ',';
        }
        content += "\n";
        for (var j = 0; j < this.state.rows.length; j++) {
            for (var i = 0; i < this.state.header_data.length; i++) {
                if (this.state.rows[j][this.state.header_data[i]]) {
                    content += this.state.rows[j][this.state.header_data[i]] + ',';
                }
            }
            content += "\n";
        }
        return content;
    };
    App.prototype.handleDownload = function () {
        var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        var content = this.createCSV();
        var blob = new Blob([bom, content], { "type": "text/plain" });
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, "data.csv");
            // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
            window.navigator.msSaveOrOpenBlob(blob, "data.csv");
        }
        else {
            var a = document.getElementById("download");
            if (a) {
                a.href = window.URL.createObjectURL(blob);
            }
        }
    };
    return App;
}(react_1["default"].Component));
exports["default"] = styles_1.withStyles(styles)(App);
