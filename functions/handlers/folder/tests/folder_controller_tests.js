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

let createFolder = async function() {
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
    let folderRes = await axios.post(
      apiUrl + "/folder",
      {
        name: "new Folder 1",
        description: "just a new folder",
        parent: "parent value",
    tags: "tags value",
    section: "section value",
        username: "user5"
      },
      { headers: headers }
    );
    console.log(folderRes.status);
    console.log(folderRes.statusText);
    console.log(folderRes.data);
    return folderRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getFolders = async function(headers) {
  try {
    let folderRes = await axios.get(apiUrl + "/folder", { headers: headers });
    console.log(folderRes.status);
    console.log(folderRes.statusText);
    console.log(folderRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getFoldersByParent = async function(headers) {
  try {
    let folderRes = await axios.get(
      apiUrl + "/folder/qKJEPug3Bto9pGOewMri/children",
      {
        headers: headers
      }
    );
    console.log(folderRes.status);
    console.log(folderRes.statusText);
    console.log(folderRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getFolderById = async function(headers, id) {
  try {
    let folderRes = await axios.get(apiUrl + "/folder/" + id, {
      headers: headers
    });
    console.log(folderRes.status);
    console.log(folderRes.statusText);
    console.log(folderRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let editFolder = async function(headers, id) {
  try {
    let folderRes = await axios.put(
      apiUrl + "/folder/" + id,
      {
        name: "new Folder 2",
        description: "just a new folder edited",
        parent: "parent value",
    tags: "tags value",
    section: "section value",
        username: "user5"
      },
      {
        headers: headers
      }
    );
    console.log(folderRes.status);
    console.log(folderRes.statusText);
    console.log(folderRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteFolder = async function(headers, id) {
  try {
    let folderRes = await axios.delete(apiUrl + "/folder/" + id, {
      headers: headers
    });
    console.log(folderRes.status);
    console.log(folderRes.statusText);
    console.log(folderRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create Folder Run");
  let id = await createFolder(headers);
  console.log("Get Folders Run");
  await getFolders(headers);
  console.log("Get Folders By Parent Run");
  await getFoldersByParent(headers);
  console.log("Get Folder by Id Run");
  await getFolderById(headers, id);
  console.log("Edit Folder Run");
  await editFolder(headers, id);
  console.log("Delete Folder Run");
  await deleteFolder(headers, id);
};

run();