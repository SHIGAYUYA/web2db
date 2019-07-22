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
require("./DB_tool_iframe.css");
var axios_1 = __importDefault(require("axios"));
axios_1["default"].defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var DB_tool_iframe = /** @class */ (function (_super) {
    __extends(DB_tool_iframe, _super);
    function DB_tool_iframe(props) {
        var _this = _super.call(this, props) || this;
        _this.iframeRef = null;
        _this.timerId = 0;
        _this.state = {
            innerhtml: "",
            lastUrl: props.url
        };
        return _this;
    }
    DB_tool_iframe.prototype.componentDidMount = function () {
        if (this.iframeRef !== null) {
            var data;
            var self = this;
            axios_1["default"].get('https://web2db-server.herokuapp.com/url2html/get', {
                params: {
                    // ここにクエリパラメータを指定する
                    url: self.props.url
                }
            })
                .then(function (response) {
                data = response.data;
                self.setState({
                    innerhtml: data
                });
            })["catch"](function (error) {
                console.log(error);
                self.setState({
                    innerhtml: "<p>ページが読み込めませんでした</p>"
                });
            });
            if (this.iframeRef.contentDocument != null) {
                var els = this.iframeRef.contentDocument.querySelectorAll('a');
                for (var i = 0, l = els.length; i < l; i++) {
                    var el = els[i];
                    el.className = "nav";
                }
            }
        }
    };
    DB_tool_iframe.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (this.iframeRef) {
            if (this.iframeRef.srcdoc === nextState.innerhtml && this.props.url === this.state.lastUrl) {
                return false;
            }
            if (this.props.url != this.state.lastUrl) {
                var data;
                var self = this;
                axios_1["default"].get('https://web2db-server.herokuapp.com/url2html/get', {
                    params: {
                        // ここにクエリパラメータを指定する
                        url: self.props.url
                    }
                })
                    .then(function (response) {
                    data = response.data;
                    self.setState({
                        innerhtml: data,
                        lastUrl: self.props.url
                    });
                })["catch"](function (error) {
                    console.log(error);
                    self.setState({
                        innerhtml: "<p>ページが読み込めませんでした</p>",
                        lastUrl: self.props.url
                    });
                });
                return false;
            }
            this.iframeRef.srcdoc = nextState.innerhtml;
        }
        return true;
    };
    DB_tool_iframe.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(Box_1["default"], { flexDirection: "row" },
            react_1["default"].createElement("iframe", { id: 'tst', sandbox: "allow-forms allow-same-origin", ref: function (iframe) { _this.iframeRef = iframe; }, className: 'DB_iframe' })));
    };
    DB_tool_iframe.prototype.selectText = function () {
        if (this.iframeRef != null && this.iframeRef.contentDocument != null) {
            var sel = this.iframeRef.contentDocument.getSelection();
            if (sel != null) {
                return sel.toString();
            }
        }
    };
    return DB_tool_iframe;
}(react_1["default"].Component));
exports["default"] = DB_tool_iframe;
