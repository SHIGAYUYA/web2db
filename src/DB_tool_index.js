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
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Container_1 = __importDefault(require("@material-ui/core/Container"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var DB_tool_index = /** @class */ (function (_super) {
    __extends(DB_tool_index, _super);
    function DB_tool_index(props) {
        var _this = _super.call(this, props) || this;
        _this.setHeaderAndUrl = _this.setHeaderAndUrl.bind(_this);
        _this.urlFiled = null;
        _this.headerFiled = null;
        return _this;
    }
    DB_tool_index.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(Container_1["default"], { component: "main", maxWidth: "xs" },
            react_1["default"].createElement(CssBaseline_1["default"], null),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(Box_1["default"], { height: "100px" }),
                react_1["default"].createElement(Typography_1["default"], { component: "h1", variant: "h5" }, "URL\u3068\u30D8\u30C3\u30C0\u30FC\u306E\u6307\u5B9A"),
                react_1["default"].createElement("form", { noValidate: true },
                    react_1["default"].createElement(TextField_1["default"], { inputRef: function (input) { _this.urlFiled = input; }, variant: "outlined", margin: "normal", required: true, fullWidth: true, name: "URL", label: "URL", id: "URL", autoFocus: true }),
                    react_1["default"].createElement(TextField_1["default"], { inputRef: function (input) { _this.headerFiled = input; }, variant: "outlined", margin: "normal", required: true, fullWidth: true, name: "Header", label: "Header", id: "Header" }),
                    react_1["default"].createElement(Typography_1["default"], { component: "h1", variant: "h6" }, "\u203BHeader\u306F \",\" \u533A\u5207\u308A"),
                    react_1["default"].createElement(Button_1["default"], { type: "submit", fullWidth: true, variant: "contained", color: "primary", onClick: this.setHeaderAndUrl }, "\u30DA\u30FC\u30B8\u3078\u79FB\u52D5")))));
    };
    DB_tool_index.prototype.setHeaderAndUrl = function () {
        if (this.headerFiled != null && this.urlFiled != null) {
            if (this.headerFiled.value != "" && this.urlFiled.value != "") {
                this.props.moveMain(this.headerFiled.value, this.urlFiled.value);
            }
        }
    };
    return DB_tool_index;
}(react_1["default"].Component));
exports["default"] = DB_tool_index;
