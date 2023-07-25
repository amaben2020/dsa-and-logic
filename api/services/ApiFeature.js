// TODO: move paginate, sort and filters logic here

class ApiFeature {
  // query is the Model
  // queryString is the filters the model receives
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  async paginate() {
    if (this.queryString.limit) {
      await this.query.find(this.queryString);
    }
  }
}
