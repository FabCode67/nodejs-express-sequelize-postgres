import { User, Message } from '../models';
export const createMessage = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      const message = await Message.create({
        username: req.body.username,
        email: req.body.email,
        message: req.body.message,
        userId: user.id
      });
  
      res.status(201).json({ message });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
      console.log(error);
    }
  };
  

  export const getAllMessages = async(req,res)=>{
    try{
      const messages = await Message.findAll();
      res.status(200).send({status:"success", message:messages})
    } catch(error){
      res.status(404).send({status:"fail", message:`failed to get messages ${error}`})
      console.log(error);
    }
  }
  