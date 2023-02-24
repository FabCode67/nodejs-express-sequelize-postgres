import { User, Message } from '../models'

export const userRegister = async(req,res)=>{
  try{
    const user =    await  User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            username : req.body.username,
            email : req.body.email,
            gender : req.body.gender,
            password : req.body.password,
            confirm_password : req.body.confirm_password
        })   
      res.status(200).send({status:"success", message:user})
  }
      catch(error){
        res.status(404).send({status:"fail", message:`failed to register a user ${error}`})
       console.log(error);
      }

}

export const getAllUsers = async(req,res)=>{
  try{
    const users = await User.findAll();
    res.status(200).send({status:"success", message:users})
  } catch(error){
    res.status(404).send({status:"fail", message:`failed to get users ${error}`})
    console.log(error);
  }
}

export const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ status: 'fail', message: 'User not found' });
    }
    res.status(200).send({ status: 'success', message: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
};



export const getUserWithMessages = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: { id: userId },
      include: Message,
    });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // get the user id from the request parameters
    const user = await User.findByPk(userId); // find the user by id
    if (!user) {
      return res.status(404).send({ status: "fail", message: "User not found" }); // return 404 if user is not found
    }
    await user.destroy(); // delete the user
    res.status(200).send({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "fail", message: "Failed to delete user" });
  }
}

