"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRegister = exports.getUserWithMessages = exports.getUserById = exports.getAllUsers = exports.deleteUser = void 0;
var _models = require("../../models");
const userRegister = async (req, res) => {
  try {
    const user = await _models.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      gender: req.body.gender,
      password: req.body.password,
      confirm_password: req.body.confirm_password
    });
    res.status(200).send({
      status: "success",
      message: user
    });
  } catch (error) {
    res.status(404).send({
      status: "fail",
      message: `failed to register a user ${error}`
    });
    console.log(error);
  }
};
exports.userRegister = userRegister;
const getAllUsers = async (req, res) => {
  try {
    const users = await _models.User.findAll();
    res.status(200).send({
      status: "success",
      message: users
    });
  } catch (error) {
    res.status(404).send({
      status: "fail",
      message: `failed to get users ${error}`
    });
    console.log(error);
  }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await _models.User.findByPk(userId);
    if (!user) {
      return res.status(404).send({
        status: 'fail',
        message: 'User not found'
      });
    }
    res.status(200).send({
      status: 'success',
      message: user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal server error'
    });
  }
};
exports.getUserById = getUserById;
const getUserWithMessages = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await _models.User.findOne({
      where: {
        id: userId
      },
      include: _models.Message
    });
    if (!user) {
      res.status(404).json({
        error: 'User not found'
      });
      return;
    }
    res.status(200).json({
      user
    });
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong'
    });
    console.log(error);
  }
};
exports.getUserWithMessages = getUserWithMessages;
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // get the user id from the request parameters
    const user = await _models.User.findByPk(userId); // find the user by id
    if (!user) {
      return res.status(404).send({
        status: "fail",
        message: "User not found"
      }); // return 404 if user is not found
    }

    await user.destroy(); // delete the user
    res.status(200).send({
      status: "success",
      message: "User deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Failed to delete user"
    });
  }
};
exports.deleteUser = deleteUser;