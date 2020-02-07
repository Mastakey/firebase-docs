const functions = require("firebase-functions");
const cors = require("cors");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
app.use(cors());

const {
  signUp,
  login,
  getAuthenticatedUser,
  getUserDetails
} = require("./handlers/users");

const {
  createMdoc,
  getMdocs,
  getMdocById,
  editMdoc,
  deleteMdoc
} = require("./handlers/mdoc/mdoc_controller");


//User routes
app.post("/signup", signUp);
app.post("/login", login);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:username", getUserDetails);

//Mdoc routes
app.post("/mdoc", FBAuth, createMdoc);
app.get("/mdoc", FBAuth, getMdocs);
app.get("/mdoc/:mdocId", FBAuth, getMdocById);
app.put("/mdoc/:mdocId", FBAuth, editMdoc);
app.delete("/mdoc/:mdocId", FBAuth, deleteMdoc);
  

exports.api = functions.https.onRequest(app);