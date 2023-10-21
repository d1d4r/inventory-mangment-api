const express = require("express");
const PORT = 3001;
var cors = require("cors");

const app = express();

const corsOption = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));

app.use(express.json());

//app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/customers", require("./routes/api/customer"));
app.use("/categorys", require("./routes/api/category"));
app.use("/suppliers", require("./routes/api/supplier"));
app.use("/products", require("./routes/api/product"));
app.use("/purchaseOrders", require("./routes/api/purchaseOrder"));
app.use("/orderItems", require("./routes/api/orderItem"));
app.use("/salesOrders", require("./routes/api/salesOrder"));
app.use("/salesOrdeItems", require("./routes/api/salesOrdeItem"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "URL 404 Not Found" });
  } else {
    res.type("txt").send("URL 404 Not Found");
  }
});

app.listen(PORT, () => console.log(`server ready on port ${PORT}`));
