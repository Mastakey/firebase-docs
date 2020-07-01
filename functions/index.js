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
  createFolder,
  getFolders,
  getFoldersByParent,
  getFolderById,
  editFolder,
  deleteFolder
} = require("./handlers/folder/folder_controller");

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
  getMdocsByFolder,
  getMdocById,
  editMdoc,
  deleteMdoc,
  getMdocsLimit,
  getMdocsByTag
} = require("./handlers/mdoc/mdoc_controller");


//User routes
app.post("/signup", signUp);
app.post("/login", login);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:username", getUserDetails);

//Folder routes
app.post("/folder", FBAuth, createFolder);
app.get("/folder", FBAuth, getFolders);
app.get("/folder/:folderId", FBAuth, getFolderById);
app.get("/folder/:folderId/children", FBAuth, getFoldersByParent);
app.put("/folder/:folderId", FBAuth, editFolder);
app.delete("/folder/:folderId", FBAuth, deleteFolder);

//Tag routes
app.post("/tag", FBAuth, createTag);
app.get("/tag", FBAuth, getTags);
app.get("/tag/:tagId", FBAuth, getTagById);
app.put("/tag/:tagId", FBAuth, editTag);
app.delete("/tag/:tagId", FBAuth, deleteTag);
  
//Mdoc routes
app.post("/mdoc", FBAuth, createMdoc);
app.get("/mdoc", FBAuth, getMdocs);
app.get("/mdoc/tag/:tag", FBAuth, getMdocsByTag);
app.get("/mdoc/limit/:limit", FBAuth, getMdocsLimit);
app.get("/mdoc/:mdocId", FBAuth, getMdocById);
app.get("/folder/:folderId/mdoc", FBAuth, getMdocsByFolder);
app.put("/mdoc/:mdocId", FBAuth, editMdoc);
app.delete("/mdoc/:mdocId", FBAuth, deleteMdoc);
  

exports.api = functions.https.onRequest(app);