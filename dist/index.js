"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _user = _interopRequireDefault(require("../routes/user.routes"));
var _message = _interopRequireDefault(require("../routes/message.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use('/api', _user.default);
app.use('/api', _message.default);
app.listen(process.env.PORT, () => console.log(`running on port ${process.env.PORT}`));