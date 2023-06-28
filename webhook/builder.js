app.post("/api/buildergolia", (req, res) => {
  console.log(req.body);

  res.send("ok");
});
