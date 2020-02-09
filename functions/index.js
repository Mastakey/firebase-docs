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
  createTag,
  getTags,
  getTagById,
  editTag,
  deleteTag
} = require("./handlers/tag/tag_controller");

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

//Tag routes
app.post("/tag", FBAuth, createTag);
app.get("/tag", FBAuth, getTags);
app.get("/tag/:tagId", FBAuth, getTagById);
app.put("/tag/:tagId", FBAuth, editTag);
app.delete("/tag/:tagId", FBAuth, deleteTag);
  
//Mdoc routes
app.post("/mdoc", FBAuth, createMdoc);
app.get("/mdoc", FBAuth, getMdocs);
app.get("/mdoc/:mdocId", FBAuth, getMdocById);
app.put("/mdoc/:mdocId", FBAuth, editMdoc);
app.delete("/mdoc/:mdocId", FBAuth, deleteMdoc);
  

exports.api = functions.https.onRequest(app);