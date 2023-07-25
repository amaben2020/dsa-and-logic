// const getBlogPosts = asyncHandler(async (req, res) => {
//   //FILTERS
//   // extract query strings and find them in mongoose
//   let queryString = { ...req.query };

//   // these fields would only be used in their API feature handlers, these handlers are programmed to utilize the queries
//   const excludedStrings = ["sortBy", "fields", "limit", "page"];
//   // build up query

//   excludedStrings.forEach((item) => {
//     if (typeof item === "string") {
//       delete queryString[item];
//     }
//   });

//   // for filtering by duration
//   if (queryString?.duration) {
//     queryString = JSON.parse(
//       JSON.stringify(req.query).replace(/\b(gte|gt|lte|lt)\b/g, (m) => `$${m}`),
//     );
//   }
//   // placed directly above the sorter so its overridden if there's a sort in place. This utilizes an object filtration (req.params) mechanism rather than strings.
//   // for general filtration

//   let query = Blog.find(queryString);

//   // sorting: basically it requires passing a string to the model.find(string)
//   if (req.query.sort) {
//     const sortWithMultipleQuery = req.query.sort.split(",").join(" ");
//     query = Blog.find().sort(sortWithMultipleQuery);
//   } else {
//     query = Blog.find().sort("-createdAt");
//   }

//   // fields limitation feature
//   if (req.query.fields) {
//     const fieldsQuery = req.query.fields.split(",").join(" ");
//     query = query.select(fieldsQuery);
//   } else {
//     query = query.select("-__v");
//   }

//   //PAGINATION
//   if (req.query.page || req.query.limit) {
//     const page = +req.query.page || 1;
//     const limit = +req.query.limit * 1 || 1;

//     const skip = Number(page - 1) * Number(limit);

//     const blogsCount = Blog.countDocuments();

//     if (skip >= blogsCount) {
//       throw new Error("Page not found");
//     } else {
//       query = Blog.find().skip(skip).limit(limit);
//     }
//   }

//   // correct way ✅
//   const blogPostsQuery = req.query.published
//     ? Blog.find(queryString)
//     : query.exec();

//   const blogPosts = await blogPostsQuery;

//   res.json({
//     length: blogPosts.length,
//     blogPosts,
//     status: 200,
//   });
// });
