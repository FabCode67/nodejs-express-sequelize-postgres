"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
var _message = _interopRequireDefault(require("./routes/message.routes"));
var _blog = _interopRequireDefault(require("./routes/blog.routes"));
var _comment = _interopRequireDefault(require("./routes/comment.routes"));
var _i18next = _interopRequireDefault(require("i18next"));
var _i18nextFsBackend = _interopRequireDefault(require("i18next-fs-backend"));
var _i18nextHttpMiddleware = _interopRequireDefault(require("i18next-http-middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use(_i18nextHttpMiddleware.default.handle(_i18next.default));
_i18next.default.use(_i18nextFsBackend.default).use(_i18nextHttpMiddleware.default.LanguageDetector).init({
  fallbackLng: 'en',
  backend: {
    loadPath: './src/locales/{{lng}}/translation.json'
  }
});
app.use('/api', _user.default);
app.use('/api', _message.default);
app.use('/api', _blog.default);
app.use('/api', _comment.default);
app.all('*', (req, res) => {
  res.json({
    error: req.t('404_error')
  });
});
app.listen(process.env.PORT, () => console.log(`running on port ${process.env.PORT}`));
module.exports = app;