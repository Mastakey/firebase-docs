var admin = require("firebase-admin");

var serviceAccount = require("../../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://docs-4834c.firebaseio.com"
});
const db = admin.firestore();

const {
  createTagService,
  getTagsService,
  getTagByIdService,
  editTagService,
  deleteTagService
} = require("../tag_service");

let createTagTest = async () => {
  const params = {
    name: "testtag",
    description: "test tag desc",
    status: "status value",
    docs: "docs value"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createTagService(db, params, user);
    console.log(resp);
    return resp.response.name;
  } catch (err) {
    console.log(err);
  }
};

let getTagsTest = async () => {
  try {
    const params = {
    };
    const user = {
      username: "user5"
    };
    let resp = await getTagsService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getTagByIdTest = async tagId => {
  try {
    const params = {
      tagId: tagId
    };
    let resp = await getTagByIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let editTagTest = async tagId => {
  const params = {
    name: "test tag edited",
    description: "test tag desc edited",
    tagId: tagId,
    status: "status value",
    docs: "docs value"
  };
  try {
    const user = {
      username: "user5"
    };
    let resp = await editTagService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let deleteTagTest = async tagId => {
  const params = {
    tagId: tagId
  };
  try {
    let resp = await deleteTagService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let run = async () => {
  console.log("Create Tag");
  let tagId = await createTagTest();
  console.log("Get Tags");
  await getTagsTest();
  console.log("Get Tag by Id");
  console.log(tagId);
  await getTagByIdTest(tagId);
  console.log("Edit Tag");
  await editTagTest(tagId);
  console.log("Delete Tag");
  await deleteTagTest(tagId);
};

run();