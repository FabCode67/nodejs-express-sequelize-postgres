"use strict";

var _express = _interopRequireDefault(require("express"));
var _comment = require("../controllers/comment.controllers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post("/:userId/:blogId/comment/post", _comment.createComment);
module.exports = router;