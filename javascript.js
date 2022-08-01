// create an array where we will store how todo items
let todotasks = [];

//create a function that create a task object with task title, statut and id and store it inside the todotasks array 

function addTask(title){
	const task = { 
  	title,
  	checked: false,
  	id: Date.now(),
  };
  
  //add the task to the tasks array
  todotasks.push(task);
  
  //display the task to the screen
  displayTask(task);
}

//let's select the form to work on 
const form = document.querySelector('.js-form');

//add an event listener for the submit of the input
form.addEventListener('submit', event => {
	//prevent page to refresh on form submission
  event.preventDefault();
  
  //get the task title input text
  const inputForm = document.querySelector('.js-todo-input');
  
  //trim the input text
  const taskTitle = inputForm.value.trim();
  
  //check if the title is not empty an store it 
  if(taskTitle != ""){
  	addTask(taskTitle);
    inputForm.value = "";
    inputForm.focus();
  }
});

//add event listener on at item of the todo list
const tasksList = document.querySelector('.js-todo-list');

tasksList.addEventListener('click', event => {
	if (event.target.classList.contains('js-tick')) {
    const taskKey = event.target.parentElement.dataset.key;
    toggleDone(taskKey);
  }
  
  // event listener on delete button
  if (event.target.classList.contains('js-delete-todo')) {
    const taskKey = event.target.parentElement.dataset.key;
    deleteTodo(taskKey);
  }
});

/*Now that task are saved in the array, we have to display each of them using a li html element by looping on the todoList task array*/

//let's create a function that will do that

function displayTask(task){ 
	const tasksList = document.querySelector('.js-todo-list');
  const taskItem = document.querySelector(`[data-key='${task.id}']`);
  
  // check is a task is deleted
  if (task.deleted) {
    // remove the item from the DOM
    taskItem.remove();
    return
  }
  
  //check weither a task checked property is true, if so assing the value done to the task, if not assign an empty string
  const isChecked = task.checked ? 'done' : '';
  
  //create a list element to display a single task 
  const taskLine = document.createElement("li");
  
  //set class attribute to the taskLine
  taskLine.setAttribute('class', `todo-item ${isChecked}`);
  taskLine.setAttribute('data-key', task.id);
  
  //assign the inner html of taskLine 
  taskLine.innerHTML = `
    <input id="${task.id}" type="checkbox"/>
    <label for="${task.id}" class="tick js-tick"></label>
    <span>${task.title}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;
  
  
  // If the item already exists in the DOM
  if (taskItem) {
    // replace it
    tasksList.replaceChild(taskLine, taskItem);
  } else {
    // otherwise append it to the end of the list
    tasksList.append(taskLine);
  }
  
}

function toggleDone(key) {
  // findIndex is an array method that returns the position of an element
  // in the array.
  const index = todotasks.findIndex(task => task.id === Number(key));
  // Locate the todo item in the todoItems array and set its checked
  // property to the opposite. That means, `true` will become `false` and vice
  // versa.
  todotasks[index].checked = !todotasks[index].checked;
  displayTask(todotasks[index]);
}

//let's create the deleteTodo function

function deleteTodo(key){
	//first we find the index in the array 
  const index = todotasks.findIndex(task => task.id === Number(key));
  // Create a new object with properties of the current todo item
  // and a `deleted` property which is set to true
  const task = {
    deleted: true,
    ...todotasks[index]
  };
  // remove the todo item from the array by filtering it out
  todotasks = todotasks.filter(task => task.id !== Number(key));
  displayTask(task);
}
