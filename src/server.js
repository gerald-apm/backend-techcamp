const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let hostname;
if (process.env.VCAP_APPLICATION) {
  const vcap = JSON.parse(process.env.VCAP_APPLICATION);
  hostname = "https://" + vcap.application_uris[0];
} else if (process.env.HOST) hostname = process.env.HOST;
else hostname = `http://localhost:${port}`;

const cors = require("cors");
app.use(cors({ origin: "*" }));

const apiv1 = require("./api/v1/routing");
const { json } = require("body-parser");
app.use("/api/v1", apiv1);

app.listen(port, () => {
  console.log(`listening to port ${port} on ${hostname}`);
});

module.exports = app;
