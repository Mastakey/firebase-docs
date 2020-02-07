const validateNameValue = name => {
  if (name && name !== "") {
    return true;
  }
  return false;
};

exports.validateName = name => {
  let messages = [];
  if (!validateNameValue(name)) {
    messages.push("Name is required")
  }
  return {
    field: "name",
    messages: messages,
    valid: Object.keys(messages).length === 0 ? true : false
  };
};

// const validatePriorityValue = priority => {
//   if (priority && priority > 0 && priority < 11) {
//     return true;
//   }
//   return false;
// };

// exports.validatePriority = priority => {
//   let messages = [];
//   if (!validatePriorityValue(priority)) {
//     messages.push("Priority must be between 1-10");
//   }
//   return {
//     field: "priority",
//     messages: messages,
//     valid: Object.keys(messages).length === 0 ? true : false
//   };
// };
