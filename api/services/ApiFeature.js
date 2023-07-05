// TODO: move paginate, sort and filters logic here

class ApiFeature {
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
