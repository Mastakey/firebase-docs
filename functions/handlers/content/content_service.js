const { validateName } = require("./content_validators");

exports.createContentService = async (db, params, user) => {
  try {
    let date = new Date();
    const newContent = {
      name: params.name,
      description: params.description,
      username: user.username,
      mdocId: params.mdocId,
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
      throw { error: validationErrors, function: "createTodoService" };
    }
    let content = await db.collection("content").add(newContent);
    let resp = newContent;
    resp.id = content.id;
    return { status: 200, response: resp };
  } catch (err) {
    err.function = "createContentService";
    throw err;
  }
};

exports.getContentsService = async (db, params, user) => {
  try {
    let allContents = await db
      .collection("content")
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let contents = [];
    allContents.forEach(doc => {
      contents.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: contents };
  } catch (err) {
    err.function = "getContentsService";
    throw err;
  }
};

exports.getContentByIdService = async (db, params, user) => {
  try {
    let content = await db
      .collection("content")
      .doc(params.contentId)
      .get();
    if (!content.exists) {
      return { status: 404, response: { error: "content not found" } };
    }
    return { status: 200, response: { ...content.data(), id: content.id } };
  } catch (err) {
    err.function = "getContentByIdService";
    throw err;
  }
};

exports.editContentService = async (db, params, user) => {
  try {
    let date = new Date();
    const editContent = {
      name: params.name,
      description: params.description,
      username: user.username,
      mdocId: params.mdocId,
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
      throw { error: validationErrors, function: "createTodoService" };
    }

    let content = await db.doc(`/content/${params.contentId}`).get();
    if (!content.exists) {
      return { status: 404, response: { error: "content not found" } };
    }
    await content.ref.update(editContent);
    return { status: 200, response: editContent };
  } catch (err) {
    err.function = "editContentService";
    throw err;
  }
};

exports.deleteContentService = async (db, params, user) => {
  try {
    const content = db.doc(`/content/${params.contentId}`);
    const doc = await content.get();
    if (!doc.exists) {
      return { status: 404, response: { error: "content not found" } };
    }
    await content.delete();
    return { status: 200, response: { id: doc.id, message: "content deleted" } };
  } catch (err) {
    err.function = "deleteContentService";
    throw err;
  }
};