//https://blog.webdevsimplified.com/2019-12/express-middleware-in-depth/
//Extremely easy concept: This runs before the route controller and can modify the req or res object effectively.

app.use(loggingMiddleware);

function loggingMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`);
  next();
}

function usersMiddleware(req, res, next) {
  if (req.query.admin) {
    req.query.admin = true; // passes this to the controller in the route
    next();
  } else {
    throw new Error("Something went wrong");
  }
}
app.get("/users", usersMiddleware, (req, res) => {
  console.log("admin", req.query.admin);
  // res.send(req.query.admin);
  res.end();
});

// const blogMiddleware = (req, res, nex) => {
//   if (req.headers.authorization) {
//     req.query.name = "Ben"
//   }
// }

// app.get("/user", blogMiddleware, (req, res) => {
//   console.log(req.query.name)
// })
// /users?name=ben
