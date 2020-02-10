const axios = require("axios");

let apiUrl =
  "https://us-central1-docs-4834c.cloudfunctions.net/api";

let login = async function() {
  try {
    let res = await axios.post(apiUrl + "/login", {
      email: "user5@email.com",
      password: "123456"
    });
    const token = res.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    return headers;
  } catch (err) {
    console.error(err);
  }
  return "";
};

let createMdoc = async function() {
  try {
    let res = await axios.post(apiUrl + "/login", {
      email: "user5@email.com",
      password: "123456"
    });
    const token = res.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    let mdocRes = await axios.post(
      apiUrl + "/mdoc",
      {
        name: "new Mdoc 1",
        description: "just a new mdoc",
        options: "options value",
    links: "links value",
    status: "status value",
    pagenum: "pagenum value",
    folder: "folder value",
    tags: "tagsvalue",
    content: "content",
    delta: "delta",
        username: "user5"
      },
      { headers: headers }
    );
    console.log(mdocRes.status);
    console.log(mdocRes.statusText);
    console.log(mdocRes.data);
    return mdocRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getMdocs = async function(headers) {
  try {
    let mdocRes = await axios.get(apiUrl + "/mdoc", { headers: headers });
    console.log(mdocRes.status);
    console.log(mdocRes.statusText);
    console.log(mdocRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getMdocById = async function(headers, id) {
  try {
    let mdocRes = await axios.get(apiUrl + "/mdoc/" + id, {
      headers: headers
    });
    console.log(mdocRes.status);
    console.log(mdocRes.statusText);
    console.log(mdocRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let editMdoc = async function(headers, id) {
  try {
    let mdocRes = await axios.put(
      apiUrl + "/mdoc/" + id,
      {
        name: "new Mdoc 2",
        description: "just a new mdoc edited",
        options: "options value",
    links: "links value",
    status: "status value",
    pagenum: "pagenum value",
    folder: "folder value",
    tags: "tagsvalue",
        username: "user5",
        content: "new content",
        delta: "new delta"
      },
      {
        headers: headers
      }
    );
    console.log(mdocRes.status);
    console.log(mdocRes.statusText);
    console.log(mdocRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteMdoc = async function(headers, id) {
  try {
    let mdocRes = await axios.delete(apiUrl + "/mdoc/" + id, {
      headers: headers
    });
    console.log(mdocRes.status);
    console.log(mdocRes.statusText);
    console.log(mdocRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getMdocsLimit = async function(headers) {
  try {
    let mdocRes = await axios.get(apiUrl + "/mdoc/limit/1", {
      headers: headers
    });
    console.log(mdocRes.status);
    console.log(mdocRes.statusText);
    console.log(mdocRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getMdocsByTag = async function(headers) {
  try {
    let mdocRes = await axios.get(apiUrl + "/mdoc/tag/sbm", {
      headers: headers
    });
    console.log(mdocRes.status);
    console.log(mdocRes.statusText);
    console.log(mdocRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create Mdoc Run");
  let id = await createMdoc(headers);
  console.log("Get Mdocs Run");
  await getMdocs(headers);
  console.log("Get Mdoc by Id Run");
  await getMdocById(headers, id);
  console.log("Edit Mdoc Run");
  await editMdoc(headers, id);
  console.log("Delete Mdoc Run");
  await deleteMdoc(headers, id);
  console.log("Get Limit");
  await getMdocsLimit(headers);
  console.log("Get by Tag");
  await getMdocsByTag(headers);
};

run();