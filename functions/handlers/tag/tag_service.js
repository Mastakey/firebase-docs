const { validateName } = require("./tag_validators");

exports.createTagService = async (db, params, user) => {
  try {
    let date = new Date();
    const newTag = {
      name: params.name,
      description: params.description,
      username: user.username,
      status: params.status,
      docs: params.docs,
      lastAdded: date.toUTCString(),
      lastAddedTimestamp: date.getTime()
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
    let tag = await db.collection("tag").doc(params.name).set(newTag);
    let resp = newTag;
    resp.id = tag.id;
    return { status: 200, response: resp };
  } catch (err) {
    err.function = "createTagService";
    throw err;
  }
};

exports.getTagsService = async (db, params, user) => {
  try {
    let allTags = await db
      .collection("tag")
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let tags = [];
    allTags.forEach(doc => {
      tags.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: tags };
  } catch (err) {
    err.function = "getTagsService";
    throw err;
  }
};

exports.getTagByIdService = async (db, params, user) => {
  try {
    let tag = await db
      .collection("tag")
      .doc(params.tagId)
      .get();
    if (!tag.exists) {
      return { status: 404, response: { error: "tag not found" } };
    }
    return { status: 200, response: { ...tag.data(), id: tag.id } };
  } catch (err) {
    err.function = "getTagByIdService";
    throw err;
  }
};

exports.editTagService = async (db, params, user) => {
  try {
    let date = new Date();
    const editTag = {
      name: params.name,
      description: params.description,
      username: user.username,
      status: params.status,
      docs: params.docs,
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

    let tag = await db.doc(`/tag/${params.tagId}`).get();
    if (!tag.exists) {
      return { status: 404, response: { error: "tag not found" } };
    }
    await tag.ref.update(editTag);
    return { status: 200, response: editTag };
  } catch (err) {
    err.function = "editTagService";
    throw err;
  }
};

exports.deleteTagService = async (db, params, user) => {
  try {
    const tag = db.doc(`/tag/${params.tagId}`);
    const doc = await tag.get();
    if (!doc.exists) {
      return { status: 404, response: { error: "tag not found" } };
    }
    await tag.delete();
    return { status: 200, response: { id: doc.id, message: "tag deleted" } };
  } catch (err) {
    err.function = "deleteTagService";
    throw err;
  }
};