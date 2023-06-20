import User from "./../model/User.js";
import MongoDBFactory from "./../api/services/MongoDB.js";

// Init User factory
const mongodb = new MongoDBFactory(User);

const userCreate = async (req, res) => {
  const data = req.body;

  try {
    const createdItem = await mongodb.createItem(data);

    return res.status(201).json({
      item: createdItem,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params["id"];
    const { email } = await mongodb.getById(String(id));
    console.log("db item", itemInDb?.email);
    return res.json({
      item: email,
    });
  } catch (error) {
    console.log("ERROR", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params["id"];
    await mongodb.deleteItem(String(id));
    return res.status(200).send(`User successfully deleted ❌`);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export { userCreate, getUser, deleteUser };
