var admin = require("firebase-admin");

var serviceAccount = require("../../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://docs-4834c.firebaseio.com"
});
const db = admin.firestore();

const {
  createContentService,
  getContentsService,
  getContentByIdService,
  editContentService,
  deleteContentService
} = require("../content_service");

let createContentTest = async () => {
  const params = {
    name: "test content",
    description: "test content desc",
    mdocId: "mdocId value"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createContentService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let getContentsTest = async () => {
  try {
    const params = {
    };
    const user = {
      username: "user5"
    };
    let resp = await getContentsService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getContentByIdTest = async contentId => {
  try {
    const params = {
      contentId: contentId
    };
    let resp = await getContentByIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let editContentTest = async contentId => {
  const params = {
    name: "test content edited",
    description: "test content desc edited",
    contentId: contentId,
    mdocId: "mdocId value"
  };
  try {
    const user = {
      username: "user5"
    };
    let resp = await editContentService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let deleteContentTest = async contentId => {
  const params = {
    contentId: contentId
  };
  try {
    let resp = await deleteContentService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let run = async () => {
  console.log("Create Content");
  let contentId = await createContentTest();
  console.log("Get Contents");
  await getContentsTest();
  console.log("Get Content by Id");
  await getContentByIdTest(contentId);
  console.log("Edit Content");
  await editContentTest(contentId);
  console.log("Delete Content");
  await deleteContentTest(contentId);
};

run();