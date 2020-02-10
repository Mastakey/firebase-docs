var admin = require("firebase-admin");

var serviceAccount = require("../../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://docs-4834c.firebaseio.com"
});
const db = admin.firestore();

const {
  createMdocService,
  getMdocsService,
  getMdocByIdService,
  editMdocService,
  deleteMdocService,
  getMocsLimitService,
  getMdocsByTagService
} = require("../mdoc_service");

let createMdocTest = async () => {
  const params = {
    name: "test mdoc",
    description: "test mdoc desc",
    content: "test content",
    delta: "",
    options: "options value",
    links: "links value",
    status: "status value",
    pagenum: "pagenum value",
    folder: "folder value",
    tags: "tags value"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createMdocService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let getMdocsTest = async () => {
  try {
    const params = {
    };
    const user = {
      username: "user5"
    };
    let resp = await getMdocsService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getMdocByIdTest = async mdocId => {
  try {
    const params = {
      mdocId: mdocId
    };
    let resp = await getMdocByIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let editMdocTest = async mdocId => {
  const params = {
    name: "test mdoc edited",
    description: "test mdoc desc edited",
    content: "new test content",
    delta: "",
    contentUpdated: true,
    mdocId: mdocId,
    options: "options value",
    links: "links value",
    status: "status value",
    pagenum: "pagenum value",
    folder: "folder value",
    tags: "tags value"
  };
  try {
    const user = {
      username: "user5"
    };
    let resp = await editMdocService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let deleteMdocTest = async mdocId => {
  const params = {
    mdocId: mdocId
  };
  try {
    let resp = await deleteMdocService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getMdocsLimitTest = async () => {
  try {
    const params = {
      limit: 1
    };
    const user = {
      username: "user5"
    };
    let resp = await getMocsLimitService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getMdocsByTagTest = async () => {
  try {
    const params = {
      tag: "sbm"
    };
    const user = {
      username: "user5"
    };
    let resp = await getMdocsByTagService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let run = async () => {
  console.log("Create Mdoc");
  let mdocId = await createMdocTest();
  // console.log("Get Mdocs");
  // await getMdocsTest();
  console.log("Get Mdoc by Id");
  await getMdocByIdTest(mdocId);
  // console.log("Edit Mdoc");
  // await editMdocTest(mdocId);
  // console.log("Delete Mdoc");
  // await deleteMdocTest(mdocId);
  // console.log("Get Mocs Limit");
  // await getMdocsLimitTest();
  console.log("Get Mdocs by Tag");
  await getMdocsByTagTest();
};

run();