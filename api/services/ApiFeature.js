// TODO: move paginate, sort and filters logic here

export class ApiFeature {
  // query is the Model
  // queryString is the filters the model receives
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  duration() {
    // for filtering by duration
    if (this.queryString?.duration) {
      return JSON.parse(
        JSON.stringify(this.queryString).replace(
          /\b(gte|gt|lte|lt)\b/g,
          (m) => `$${m}`,
        ),
      );
    }
    return this;
  }

  sorter() {
    // sorting: basically it requires passing a string to the model.find(string)
    if (this.queryString.sort) {
      const sortWithMultipleQuery = this.queryString.sort.split(",").join(" ");
      return Blog.find().sort(sortWithMultipleQuery);
    } else {
      return Blog.find().sort("-createdAt");
    }
    return this;
  }

  fieldLimit() {
    // fields limitation feature
    if (this.queryString?.fields) {
      const fieldsQuery = this.queryString.fields.split(",").join(" ");
      return this.query.select(fieldsQuery);
    } else {
      return this.query.select("-__v");
    }
    return this;
  }

  async paginate() {
    //PAGINATION
    if (this.queryString.page || this.queryString.limit) {
      const page = +this.queryString.page || 1;
      const limit = +this.queryString.limit * 1 || 1;

      const skip = Number(page - 1) * Number(limit);

      const blogsCount = Blog.countDocuments();

      if (skip >= blogsCount) {
        throw new Error("Page not found");
      } else {
        query = Blog.find().skip(skip).limit(limit);
      }
    }
    return this;
  }
}
