// extends,  implements, private, public

// using dependency injection pattern DIP

class MongoDBFactory {
  // any model could be passed here and the operations would work accordingly
  constructor(model) {
    this.model = model;
  }

  // create or insert
  async createItem(item) {
    try {
      // item would be an object
      const insertItem = await new this.model(item).save();

      // Insert the article in our MongoDB database
      console.log("Insert item", insertItem);

      return insertItem;
    } catch (error) {
      console.log("Error");
    }
  }

  async findById(id) {
    // Find a single item in db
    try {
      const item = await new this.model.findById(id);
      console.log("item", item);
      return "Success";
    } catch (error) {
      console.log("error");
    }
  }

  async findByFields(id, ...fields) {
    // Find a single item in db
    try {
      const item = await new this.model.findById(
        id,
        String((fields += "")), // my 🧙🏾‍♂️ moment
      ).exec();
      console.log("item", item);
      return "Success";
    } catch (error) {
      console.log("error");
    }
  }

  // read: log what is currently in the database, useless
  async findOneItem() {
    // Find a single item in db
    try {
      const item = await new this.model.findOne({});
      console.log("item", item);
      return "Success";
    } catch (error) {
      console.log("error");
    }
  }

  // update
  async updateItem(id, key, propertyToUpdate) {
    // what do you wanna update?
    let itemToUpdate = await new this.model.findById(id);

    // update a property in the object or model
    itemToUpdate[key] = propertyToUpdate;

    await itemToUpdate.save();

    // Load the document to see the updated value
    const doc = await new this.model.findOne();
    return `${doc.title} updated successfully ✅`;
  }
  // delete: we are using id to delete stuff
  async deleteItem() {
    // Under the hood, the findByIdAndDelete(id) method is a shorthand for findOneAndDelete({ _id: id })
    const doc = await this.model.findByIdAndDelete(id);

    return `${doc?._id} successfully deleted ❌`;
  }
}

export default MongoDB;
