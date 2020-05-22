//Get index list of all todos.
const allToDos = document.getElementById( 'index' );

if ( allToDos )
{
  axios.get( 'https://localhost:44345/api/ToDoItems/' )
  // get the data from the response
  .then( response => response.data)
  // process dqata to json object or array
  .then( data => {
    // console.log(data);
    //output list of todos
    data.forEach( toDo => { // Output list of todos.
      const toDoLI = document.createElement( 'LI' );
      toDoLI.textContent = ' ' + toDo.task;
      const toDoCheckbox = document.createElement( 'INPUT' );
      toDoCheckbox.type = 'checkbox';
      toDoCheckbox.addEventListener( 'click', event => {
        axios.delete( 'https://localhost:44345/api/ToDoItems/' + toDo.id )
        .then( response => { // On success, redirect to full list.
          document.location.href = './index.html';
       } )   
      });
      toDoLI.prepend( toDoCheckbox );
      allToDos.appendChild( toDoLI );
    } );
  } );
}


// get create ToDo form
const createToDo = document.getElementById( 'create' );
if ( createToDo )
{
  createToDo.addEventListener( 'submit', event => {
    event.preventDefault();  //Stop form from real submit
    const newTask = document.getElementById( 'task' ).value;
    const newCompleted = document.getElementById( 'completed' ).checked;
    //Create the new todo.
    axios.post('https://localhost:44345/api/ToDoItems/', {
      Task: newTask,
      Completed: newCompleted
    } )
    .then( response => { // On success, redirect to full list.
       document.location.href = './index.html';
    } )
    .catch( error => {
      console.log(error)
    })
  } );
}
