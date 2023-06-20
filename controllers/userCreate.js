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
  const id = req.params["id"];
  const itemInDb = await mongodb.getById(String(id));
  return res.json({
    item: itemInDb,
  });
};

export { userCreate, getUser };
