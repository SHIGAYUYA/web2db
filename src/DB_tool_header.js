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
require("./DB_tool_header.css");
var DB_tool_table_1 = __importDefault(require("./DB_tool_table"));
var DB_tool_input_1 = __importDefault(require("./DB_tool_input"));
var react_rnd_1 = require("react-rnd");
var DB_tool_header = /** @class */ (function (_super) {
    __extends(DB_tool_header, _super);
    function DB_tool_header(props) {
        return _super.call(this, props) || this;
    }
    DB_tool_header.prototype.render = function () {
        //const header_data:string[] =['Dessert (100g serving)', 'Calories','Fat(g)','Carbs(g)','Protein(g)']
        // const rows = [
        //   this.createData(header_data, ['Frozen yoghurt', '159', '6.0', '24', '4.0']),
        //   this.createData(header_data, ['Ice cream sandwich', '237', '9.0', '37', '4.3']),
        //   this.createData(header_data, ['Eclair', '262', '16.0', '24', '6.0']),
        //   this.createData(header_data, ['Cupcake', '305', '3.7', '67', '4.3']),
        //   this.createData(header_data, ['Gingerbread', '356', '16.0', '49', '3.9']),
        // ];
        return (
        // <Box flexDirection="row" className="db_header">
        //     <Grid container justify="center">
        //       <Grid item> 
        //         <DB_tool_table header_data={this.state.header_data} data={this.state.rows}/>
        //       </Grid>
        //       <Grid item>
        //         <DB_tool_input header_data={this.state.header_data} pushDatum={this.pushDatum}/>  
        //       </Grid>
        //     </Grid>
        // </Box>
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(DB_tool_table_1["default"], { header_data: this.props.header_data, data: this.props.rows }),
            react_1["default"].createElement(react_rnd_1.Rnd, { "default": {
                    x: 0,
                    y: 0,
                    width: 800,
                    height: 180
                } },
                react_1["default"].createElement(DB_tool_input_1["default"], { header_data: this.props.header_data, pushDatum: this.props.pushDatum, textValues: this.props.textValues, textForcus: this.props.textForcus, chengeForcus: this.props.chengeForcus, setText: this.props.setText }))));
    };
    DB_tool_header.prototype.createData = function (header_data, data) {
        var datum = {};
        for (var i = 0; i < header_data.length; i++) {
            datum[header_data[i]] = data[i];
        }
        return datum;
    };
    return DB_tool_header;
}(react_1["default"].Component));
exports["default"] = DB_tool_header;
