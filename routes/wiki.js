import router from "./index.js";

router.get("/", function (req, res) {
  res.send("Wiki home page");
});

export default router;
