import express from "express";

const wikiRouter = express.Router();

wikiRouter.get("/", function (req, res) {
  res.send("Wiki home page");
});

export default wikiRouter;
