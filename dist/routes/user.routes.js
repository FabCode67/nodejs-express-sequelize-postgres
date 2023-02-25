"use strict";

var _express = _interopRequireDefault(require("express"));
var _user = require("../controllers/user.controllers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post("/user/post", _user.userRegister);
router.get("/user/get", _user.getAllUsers);
router.get("/user/:id/get", _user.getUserById);
router.delete("/user/:id/delete", _user.deleteUser);
router.get("/user/:id/message/get", _user.getUserWithMessages);
module.exports = router;