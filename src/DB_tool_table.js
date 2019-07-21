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
require("./DB_tool_table.css");
var react_rnd_1 = require("react-rnd");
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var common_1 = __importDefault(require("@material-ui/core/colors/common"));
var DB_tool_table = /** @class */ (function (_super) {
    __extends(DB_tool_table, _super);
    function DB_tool_table() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DB_tool_table.prototype.render = function () {
        var _this = this;
        var style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0"
        };
        return (react_1["default"].createElement(react_rnd_1.Rnd, { style: style, "default": {
                x: 0,
                y: 0,
                width: "800px",
                height: "200px"
            } },
            react_1["default"].createElement(Box_1["default"], { component: "div", width: "100%", height: "100%", overflow: "auto", bgcolor: "background.paper" },
                react_1["default"].createElement(Table_1["default"], null,
                    react_1["default"].createElement(TableHead_1["default"], null,
                        react_1["default"].createElement(TableRow_1["default"], null,
                            react_1["default"].createElement(TableCell_1["default"], { style: {
                                    backgroundColor: common_1["default"].black,
                                    color: common_1["default"].white,
                                    position: "sticky",
                                    top: 0
                                } }, this.props.header_data[0]),
                            this.props.header_data.slice(1, this.props.header_data.length).map(function (colume) { return (react_1["default"].createElement(TableCell_1["default"], { align: "right", style: {
                                    backgroundColor: common_1["default"].black,
                                    color: common_1["default"].white,
                                    position: "sticky",
                                    top: 0
                                } }, colume)); }))),
                    react_1["default"].createElement(TableBody_1["default"], null, this.props.data.map(function (row) { return (react_1["default"].createElement(TableRow_1["default"], { key: row[_this.props.header_data[0]] },
                        react_1["default"].createElement(TableCell_1["default"], { component: "th", scope: "row" }, row[_this.props.header_data[0]]),
                        _this.props.header_data.slice(1, _this.props.header_data.length).map(function (colume) { return (react_1["default"].createElement(TableCell_1["default"], { align: "right" }, row[colume])); }))); }))))));
    };
    return DB_tool_table;
}(react_1["default"].Component));
exports["default"] = DB_tool_table;
