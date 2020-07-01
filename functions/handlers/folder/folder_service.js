const { validateName } = require("./folder_validators");

exports.createFolderService = async (db, params, user) => {
  try {
    let date = new Date();
    const newFolder = {
      name: params.name,
      description: params.description,
      username: user.username,
      parent: params.parent,
      tags: params.tags,
      section: params.section,
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };
    //validation
    let validationErrors = [];
    //Name
    const nameValidation = validateName(params.name);
    if (!nameValidation.valid) {
      validationErrors.push(nameValidation);
    }
    //Throw Error
    if (validationErrors.length > 0) {
      throw { error: validationErrors, function: "createFolderService" };
    }
    let folder = await db.collection("folder").add(newFolder);
    let resp = newFolder;
    resp.id = folder.id;
    return { status: 200, response: resp };
  } catch (err) {
    err.function = "createFolderService";
    throw err;
  }
};

exports.createFolderWithIdService = async (db, params, user) => {
  try {
    let date = new Date();
    const newFolder = {
      name: params.name,
      description: params.description,
      username: user.username,
      parent: params.parent,
      tags: params.tags,
      section: params.section,
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };
    //validation
    let validationErrors = [];
    //Name
    const nameValidation = validateName(params.name);
    if (!nameValidation.valid) {
      validationErrors.push(nameValidation);
    }
    //Throw Error
    if (validationErrors.length > 0) {
      throw { error: validationErrors, function: "createFolderWithIdService" };
    }
    await db.doc(`/folder/${params.name}`).set(newFolder);
    let resp = newFolder;
    resp.id = params.name;
    return { status: 200, response: resp };
  } catch (err) {
    err.function = "createFolderWithIdService";
    throw err;
  }
};

exports.getFoldersService = async (db, params, user) => {
  try {
    let allFolders = await db
      .collection("folder")
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let folders = [];
    allFolders.forEach(doc => {
      folders.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: folders };
  } catch (err) {
    err.function = "getFoldersService";
    throw err;
  }
};

exports.getFoldersServiceByParent = async (db, params, user) => {
  try {
    let allFolders = await db
      .collection("folder")
      .where('parent', '==', params.folderId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let folders = [];
    allFolders.forEach(doc => {
      folders.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: folders };
  } catch (err) {
    err.function = "getFoldersServiceByParent";
    throw err;
  }
};

exports.getFolderByIdService = async (db, params, user) => {
  try {
    let folder = await db
      .collection("folder")
      .doc(params.folderId)
      .get();
    if (!folder.exists) {
      return { status: 404, response: { error: "folder not found" } };
    }
    return { status: 200, response: { ...folder.data(), id: folder.id } };
  } catch (err) {
    err.function = "getFolderByIdService";
    throw err;
  }
};

exports.editFolderService = async (db, params, user) => {
  try {
    let date = new Date();
    const editFolder = {
      name: params.name,
      description: params.description,
      username: user.username,
      parent: params.parent,
      tags: params.tags,
      section: params.section,
      updatedAt: date.toUTCString(),
      updatedAtTimestamp: date.getTime()
    };
    //validation
    let validationErrors = [];
    //Name
    const nameValidation = validateName(params.name);
    if (!nameValidation.valid) {
      validationErrors.push(nameValidation);
    }
    //Throw Error
    if (validationErrors.length > 0) {
      throw { error: validationErrors, function: "editFolderService" };
    }

    let folder = await db.doc(`/folder/${params.folderId}`).get();
    if (!folder.exists) {
      return { status: 404, response: { error: "folder not found" } };
    }
    await folder.ref.update(editFolder);
    return { status: 200, response: editFolder };
  } catch (err) {
    err.function = "editFolderService";
    throw err;
  }
};

exports.deleteFolderService = async (db, params, user) => {
  try {
    const folder = db.doc(`/folder/${params.folderId}`);
    const doc = await folder.get();
    if (!doc.exists) {
      return { status: 404, response: { error: "folder not found" } };
    }
    await folder.delete();
    return { status: 200, response: { id: doc.id, message: "folder deleted" } };
  } catch (err) {
    err.function = "deleteFolderService";
    throw err;
  }
};
