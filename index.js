const express = require("express");
const con = require("./utils/dbConnect");
const authRoute = require("./routes/auth");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Server acitvated",
  });
});

app.use("/api/v1/auth", authRoute);

async function prep() {
  app.listen(process.env.PORT || PORT, () =>
    console.log(`Port:${process.env.PORT || PORT}`)
  );
}
prep();
