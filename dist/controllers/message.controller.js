"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllMessages = exports.createMessage = void 0;
var _models = require("../../models");
const createMessage = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await _models.User.findByPk(userId, {
      attributes: ['id', 'username', 'email']
    });
    if (!user) {
      res.status(404).json({
        error: 'User not found'
      });
      return;
    }
    const message = await _models.Message.create({
      username: user.username,
      email: user.email,
      message: req.body.message,
      userId: user.id
    });
    res.status(201).json({
      message
    });
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong'
    });
    console.log(error);
  }
};
exports.createMessage = createMessage;
const getAllMessages = async (req, res) => {
  try {
    const messages = await _models.Message.findAll();
    res.status(200).send({
      status: "success",
      message: messages
    });
  } catch (error) {
    res.status(404).send({
      status: "fail",
      message: `failed to get messages ${error}`
    });
    console.log(error);
  }
};
exports.getAllMessages = getAllMessages;