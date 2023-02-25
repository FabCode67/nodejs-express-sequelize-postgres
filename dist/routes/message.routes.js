"use strict";

var _express = _interopRequireDefault(require("express"));
var _message = require("../controllers/message.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post("/user/:id/message", _message.createMessage);
router.get("/messages/get", _message.getAllMessages);
module.exports = router;