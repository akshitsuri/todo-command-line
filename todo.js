//!it is the operation to be done
let command = process.argv[2];
//!it is the value to be operated
let val = process.argv[3];
//!fs
const fs = require("fs");

// //!get the data from file
const getDataOfFile = () => {
  let data = fs.readFileSync("./todo.txt");
  return JSON.parse(data);
};

//!send data to the file
const sendDataToFile = (data) => {
  data.forEach((part, key) => {
    part.id = key + 1;
  });
  fs.writeFileSync("./todo.txt", JSON.stringify(data));
};

// //!make the file first
if (!fs.existsSync("./todo.txt")) {
  sendDataToFile([]);
}

//!instructions
let usage = `Usage :-
$ ./todo add "todo item"  # Add a new todo
$ ./todo ls               # Show remaining todos
$ ./todo del NUMBER       # Delete a todo
$ ./todo done NUMBER      # Complete a todo
$ ./todo help             # Show usage
$ ./todo report           # Statistics`;

//!count pending todos
const pendingTodos = (data) => {
  let count = 0;
  data.forEach((part) => {
    if (!part.completed) {
      count++;
    }
  });
  return count;
};
//!count completed todos
const completedTodos = (data) => {
  let count = 0;
  data.forEach((part) => {
    if (part.completed) {
      count++;
    }
  });
  return count;
};
//!report generation
const report = () => {
  const data = getDataOfFile();
  const date = new Date();
  console.log(
    `${date.toISOString().slice(0, 10)} Pending : ${pendingTodos(
      data
    )} Completed : ${completedTodos(data)}`
  );
};

//!conditions
if (command === undefined || command === "help") {
  console.log(usage);
} else {
  //!add a todo
  if (command === "add") {
    if (val === undefined) {
      console.log(`Error: Missing todo string. Nothing added!`);
      return;
    }
    console.log(`Added todo: "${val}"`);
    let object = { todo: val, completed: false };
    let data = getDataOfFile();
    data.push(object);
    sendDataToFile(data);
  }
  //!list all the todos
  else if (command === "ls") {
    let mainData = getDataOfFile();
    let data = mainData.filter((part) => part.completed === false);
    data.forEach((part, key) => {
      part.id = key + 1;
    });
    if (data.length === 0) {
      console.log(`There are no pending todos!`);
      return;
    }
    for (let i = data.length - 1; i >= 0; i--) {
      console.log(`[${data[i].id}] ${data[i].todo}`);
    }
  }
  //!delete a todo
  else if (command === "del") {
    let data = getDataOfFile();
    if (val === undefined) {
      console.log("Error: Missing NUMBER for deleting todo.");
    } else if (val < 1 || val > data.length) {
      console.log(`Error: todo #${val} does not exist. Nothing deleted.`);
    } else {
      data = data.filter((part) => part.id != val);
      console.log(`Deleted todo #${val}`);
      sendDataToFile(data);
    }
  }
  //! mark todo as done
  else if (command === "done") {
    let data = getDataOfFile();
    if (val === undefined) {
      console.log("Error: Missing NUMBER for marking todo as done.");
    } else if (val < 1 || val > data.length) {
      console.log(`Error: todo #${val} does not exist.`);
    } else {
      data.forEach((part) => {
        if (part.id == val) {
          console.log(`Marked todo #${part.id} as done.`);
          part.completed = true;
        }
      });
      sendDataToFile(data);
    }
  }
  //!report
  else if (command === "report") {
    report();
  }
}

//! By Akshit Suri
