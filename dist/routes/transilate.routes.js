"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import express from "express";
// import i18next from "i18next";
// const router = express.Router();
// // Define routes
// router.get("/hello", (req, res) => {
//   const name = req.query.name || "World";
//   const message = req.t("hello", { name });
//   res.send(message);
// });
// router.get("/welcome", (req, res) => {
//   const message = req.t("welcome");
//   res.send(message);
// });
// export default router;
var _default = {
  root: (req, res) => res.status(200).json({
    message: req.t('hello_message')
  })
};
exports.default = _default;