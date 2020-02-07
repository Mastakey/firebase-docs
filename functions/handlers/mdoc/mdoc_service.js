const { validateName } = require("./mdoc_validators");

exports.createMdocService = async (db, params, user) => {
  try {
    let date = new Date();
    const newMdoc = {
      name: params.name,
      description: params.description,
      username: user.username,
      options: params.options,
      links: params.links,
      status: params.status,
      pagenum: params.pagenum,
      folder: params.folder,
      tags: params.tags,
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
    let mdoc = await db.collection("mdoc").add(newMdoc);
    let resp = newMdoc;
    resp.id = mdoc.id;
    return { status: 200, response: resp };
  } catch (err) {
    err.function = "createMdocService";
    throw err;
  }
};

exports.getMdocsService = async (db, params, user) => {
  try {
    let allMdocs = await db
      .collection("mdoc")
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let mdocs = [];
    allMdocs.forEach(doc => {
      mdocs.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: mdocs };
  } catch (err) {
    err.function = "getMdocsService";
    throw err;
  }
};

exports.getMdocByIdService = async (db, params, user) => {
  try {
    let mdoc = await db
      .collection("mdoc")
      .doc(params.mdocId)
      .get();
    if (!mdoc.exists) {
      return { status: 404, response: { error: "mdoc not found" } };
    }
    return { status: 200, response: { ...mdoc.data(), id: mdoc.id } };
  } catch (err) {
    err.function = "getMdocByIdService";
    throw err;
  }
};

exports.editMdocService = async (db, params, user) => {
  try {
    let date = new Date();
    const editMdoc = {
      name: params.name,
      description: params.description,
      username: user.username,
      options: params.options,
      links: params.links,
      status: params.status,
      pagenum: params.pagenum,
      folder: params.folder,
      tags: params.tags,
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

    let mdoc = await db.doc(`/mdoc/${params.mdocId}`).get();
    if (!mdoc.exists) {
      return { status: 404, response: { error: "mdoc not found" } };
    }
    await mdoc.ref.update(editMdoc);
    return { status: 200, response: editMdoc };
  } catch (err) {
    err.function = "editMdocService";
    throw err;
  }
};

exports.deleteMdocService = async (db, params, user) => {
  try {
    const mdoc = db.doc(`/mdoc/${params.mdocId}`);
    const doc = await mdoc.get();
    if (!doc.exists) {
      return { status: 404, response: { error: "mdoc not found" } };
    }
    await mdoc.delete();
    return { status: 200, response: { id: doc.id, message: "mdoc deleted" } };
  } catch (err) {
    err.function = "deleteMdocService";
    throw err;
  }
};