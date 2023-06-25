//https://blog.webdevsimplified.com/2019-12/express-middleware-in-depth/
//Extremely easy concept: This runs before the route controller and can modify the req or res object effectively.

app.use(loggingMiddleware);

function loggingMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`);
  next();
}

app.get("/users", mw, (req, res) => {
  console.log("admin", req.query.admin);
  // res.send(req.query.admin);
  res.end();
});

function mw(req, res, next) {
  if (req.query.admin) {
    req.query.admin = true; // passes this to the controller in the route
    next();
  } else {
    throw new Error("Something went wrong");
  }
}
