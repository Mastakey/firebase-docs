var admin = require("firebase-admin");

var serviceAccount = require("../../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://docs-4834c.firebaseio.com"
});
const db = admin.firestore();

const {
  createFolderService,
  createFolderWithIdService,
  getFoldersService,
  getFoldersServiceByParent,
  getFolderByIdService,
  editFolderService,
  deleteFolderService
} = require("../folder_service");

let createFolderTest = async () => {
  const params = {
    name: "test folder",
    description: "test folder desc",
    parent: "parent value",
    tags: "tags value",
    section: "section value"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createFolderService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let createFolderWithIdTest = async () => {
  const params = {
    name: "test_folder",
    description: "test folder desc",
    parent: "parent value",
    tags: "tags value",
    section: "section value"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createFolderWithIdService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let getFoldersTest = async () => {
  try {
    const params = {};
    const user = {
      username: "user5"
    };
    let resp = await getFoldersService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getFoldersByParentTest = async () => {
  try {
    const params = {
      parentId: "parent value"
    };
    const user = {
      username: "user5"
    };
    let resp = await getFoldersServiceByParent(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getFolderByIdTest = async folderId => {
  try {
    const params = {
      folderId: folderId
    };
    let resp = await getFolderByIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let editFolderTest = async folderId => {
  const params = {
    name: "test folder edited",
    description: "test folder desc edited",
    folderId: folderId,
    parent: "parent value",
    tags: "tags value",
    section: "section value"
  };
  try {
    const user = {
      username: "user5"
    };
    let resp = await editFolderService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let deleteFolderTest = async folderId => {
  const params = {
    folderId: folderId
  };
  try {
    let resp = await deleteFolderService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let run = async () => {
  console.log("Create Folder");
  let folderId = await createFolderWithIdTest();
  console.log("Get Folders");
  await getFoldersTest();
  console.log("Get Folders by Parent");
  await getFoldersByParentTest();
  console.log("Get Folder by Id");
  await getFolderByIdTest(folderId);
  console.log("Edit Folder");
  await editFolderTest(folderId);
  console.log("Delete Folder");
  await deleteFolderTest(folderId);
};

run();
