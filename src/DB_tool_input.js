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
var Table_1 = __importDefault(require("@material-ui/core/Table"));
var TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
var TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
var TableHead_1 = __importDefault(require("@material-ui/core/TableHead"));
var TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
require("./DB_tool_input.css");
var core_1 = require("@material-ui/core");
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var DB_tool_input = /** @class */ (function (_super) {
    __extends(DB_tool_input, _super);
    function DB_tool_input(props) {
        var _this = _super.call(this, props) || this;
        _this.changeText = _this.changeText.bind(_this);
        _this.onClickDBInputBtn = _this.onClickDBInputBtn.bind(_this);
        _this.refocus = _this.refocus.bind(_this);
        _this.setFocus = _this.setFocus.bind(_this);
        _this.nextFocus = _this.nextFocus.bind(_this);
        _this.keyPressAction = _this.keyPressAction.bind(_this);
        _this.textInputs = {};
        return _this;
    }
    DB_tool_input.prototype.componentDidMount = function () {
        var elem = this.textInputs[this.props.textForcus];
        setTimeout(function () {
            elem.focus();
        }, 0);
    };
    DB_tool_input.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(Box_1["default"], { component: "div", width: "100%", height: "100%", overflow: "auto", bgcolor: "background.paper" },
            react_1["default"].createElement(Table_1["default"], { className: 'table' },
                react_1["default"].createElement(TableHead_1["default"], null,
                    react_1["default"].createElement(TableRow_1["default"], null,
                        react_1["default"].createElement(TableCell_1["default"], null, this.props.header_data[0]),
                        this.props.header_data.slice(1, this.props.header_data.length).map(function (colume) { return (react_1["default"].createElement(TableCell_1["default"], { align: "right" }, colume)); }))),
                react_1["default"].createElement(TableBody_1["default"], null,
                    react_1["default"].createElement(TableRow_1["default"], { key: "TextField" }, this.props.header_data.map(function (colume) { return (react_1["default"].createElement(TableCell_1["default"], { align: "right" },
                        react_1["default"].createElement(TextField_1["default"], { inputRef: function (input) { _this.textInputs[colume] = input; }, id: colume, type: "text", value: _this.props.textValues[colume], onChange: _this.changeText, onBlur: function () {
                                _this.refocus();
                            }, onClick: _this.setFocus, onKeyDown: function (e) { return _this.keyPressAction(e); } }))); })))),
            react_1["default"].createElement("div", { className: 'input_btn' },
                react_1["default"].createElement(core_1.Button, { variant: "contained", color: "secondary", onClick: this.onClickDBInputBtn }, "\u767B\u9332"))));
    };
    DB_tool_input.prototype.setFocus = function (e) {
        this.props.chengeForcus(e.target.id);
        var elem = this.textInputs[e.target.id];
        setTimeout(function () {
            elem.focus();
        }, 0);
    };
    DB_tool_input.prototype.keyPressAction = function (e) {
        // console.log(e.key)
        if (e.key === 'c' && e.ctrlKey) {
            this.props.setText({ "": "true" });
        }
        else if (e.key === 'v' && e.ctrlKey) {
            this.onClickDBInputBtn();
        }
        else if (e.key === 'Tab' || (e.key === 'x' && e.ctrlKey)) {
            this.nextFocus();
        }
    };
    DB_tool_input.prototype.nextFocus = function () {
        var next = 0;
        for (var i = 0; i < this.props.header_data.length; i++) {
            if (this.props.header_data[i] === this.props.textForcus) {
                next = i + 1;
            }
        }
        if (next === this.props.header_data.length) {
            next = 0;
        }
        this.props.chengeForcus(this.props.header_data[next]);
        var elem = this.textInputs[this.props.header_data[next]];
        setTimeout(function () {
            elem.focus();
        }, 0);
    };
    DB_tool_input.prototype.refocus = function () {
        // console.log(this.props.textForcus)
        var elem = this.textInputs[this.props.textForcus];
        setTimeout(function () {
            elem.focus();
        }, 0);
    };
    DB_tool_input.prototype.onClickDBInputBtn = function () {
        this.props.pushDatum(JSON.parse(JSON.stringify(this.props.textValues)));
        var textValues = this.props.textValues;
        for (var i = 0; i < this.props.header_data.length; i++) {
            textValues[this.props.header_data[i]] = "";
        }
        this.props.setText(textValues);
    };
    DB_tool_input.prototype.changeText = function (e) {
        var textValues = this.props.textValues;
        textValues[e.target.id] = e.target.value;
        this.props.setText(textValues);
    };
    return DB_tool_input;
}(react_1["default"].Component));
exports["default"] = DB_tool_input;
