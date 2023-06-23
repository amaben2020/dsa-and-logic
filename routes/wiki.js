import express from "express";

const wikiRouter = express.Router();

wikiRouter.get("/", function (req, res) {
  console.log("query", req.query);
  const matches = {};
  const { name, sex } = req.query;
  if (name || sex) {
    matches.info = {
      name: name,
      sex,
    };
  }
  const information = matches["info"];
  res.status(200).json({
    info: information,
  });
});

export default wikiRouter;
