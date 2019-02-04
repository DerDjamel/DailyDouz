//localStorage.clear();
const inbox_section       = document.querySelector('.inbox');
const in_progress_section  = document.querySelector('.in-progress');
const completed_section   = document.querySelector('.completed');

var task_num = 0;
retore_tasks();



/*
  select all the drop, start, finished buttons to add the events
*/
let drop_btn      = document.querySelectorAll('.drop');
let start_btn     = document.querySelectorAll('.start');
let finished_btn  = document.querySelectorAll('.finished');

/* adding the events */
apply_events(drop_btn, drop);
apply_events(start_btn, start);
apply_events(finished_btn, finished);

/*************************
  Add a Task functionality
*************************/
const task_content = document.querySelector('.task-content');
const add_task_btn = document.querySelector('.add-task');

add_task_btn.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();

  const the_task = task_content.value;
  const todo_task_markup = `
  <article class="todo-task" data-number=${++task_num}>
    <p class="todo-task-content">${the_task}</p>
    <div class="features">
      <button class="start">start</button>
      <button class="drop">drop</button>
    </div>
  </article>
  `;
  // adding the element to the inbox
  inbox_section.insertAdjacentHTML('beforeend', todo_task_markup);
  // claer textarea content
  task_content.value = '';
  //add EventListener to the new buttons
  update_events_to_buttons();
  var task_to_store = {
    content: the_task,
    section: 'inbox'
  };
  // store the task in localStorage
  addToStorage(`task-${task_num}`, JSON.stringify(task_to_store));

});




/*
  helper functions
*/


function start(){
  event.stopPropagation();
   the_task         = event.target.parentNode.parentNode;
   tha_task_content = the_task.getElementsByClassName('todo-task-content')[0].textContent;
   task_number      = the_task.dataset.number;
   the_start_btn    = the_task.getElementsByClassName('features')[0].getElementsByClassName('start')[0];

   the_start_btn.textContent = 'finished';
   the_start_btn.classList.remove('start');
   the_start_btn.classList.add('finished');

   in_progress_section.appendChild(the_task);
   update_events_to_buttons();

   var task_to_store = {
     content: tha_task_content,
     section: 'in-progress'
   };
   // store the task in localStorage
   addToStorage(`task-${task_number}`, JSON.stringify(task_to_store));
}


function finished(){
   event.stopPropagation();
   the_task         = event.target.parentNode.parentNode;
   tha_task_content = the_task.getElementsByClassName('todo-task-content')[0].textContent;
   task_number      = the_task.dataset.number;
   the_task.querySelector('.features').removeChild(the_task.querySelector('button.finished'));

   completed_section.appendChild(the_task);
   update_events_to_buttons();

   var task_to_store = {
     content: tha_task_content,
     section: 'completed'
   };
   // store the task in localStorage
   addToStorage(`task-${task_number}`, JSON.stringify(task_to_store));
}

function drop(){
  event.stopPropagation();
  the_task    = event.target.parentNode.parentNode;
  task_number = the_task.dataset.number;
  the_task.parentNode.removeChild(the_task);
  update_events_to_buttons();

  dropFromStorage(`task-${task_number}`);
}



function addToStorage(key, value){
  localStorage.setItem(key, value);
}

function dropFromStorage(key){
  localStorage.removeItem(key);
}



function apply_events(buttons, fn){
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
      fn();
    });
  }
}


function update_events_to_buttons(){
  drop_btn      = document.querySelectorAll('.drop');
  start_btn     = document.querySelectorAll('.start');
  finished_btn  = document.querySelectorAll('.finished');

  apply_events(drop_btn, drop);
  apply_events(start_btn, start);
  apply_events(finished_btn, finished);
}




function retore_tasks(){
  task_num = localStorage.length;
  if (task_num === 0) {
    return;
  }
  /*****
  if there are tasks add them to the UI
  ******/
  for (var i = 0; i < localStorage.length; i++) {
   var task_number = localStorage.key(i).split('-')[1];
   var task = JSON.parse(localStorage.getItem(localStorage.key(i)));
   let todo_task_markup = `
   <article class="todo-task" data-number=${task_number}>
     <p class="todo-task-content">${task.content}</p>
     `;

     if (task.section === 'inbox') {
       todo_task_markup += `<div class="features">
         <button class="start">start</button>
         <button class="drop">drop</button>
       </div>
     </article>`;
     // adding the element to the inbox
     inbox_section.insertAdjacentHTML('beforeend', todo_task_markup);
     }

     if (task.section === 'in-progress') {
       todo_task_markup += `<div class="features">
         <button class="finished">finish</button>
         <button class="drop">drop</button>
       </div>
     </article>`;
     // adding the element to the inbox
     in_progress_section.insertAdjacentHTML('beforeend', todo_task_markup);
     }

     if (task.section === 'completed') {
       todo_task_markup += `<div class="features">
         <button class="drop">drop</button>
       </div>
     </article>`;
     // adding the element to the inbox
     completed_section.insertAdjacentHTML('beforeend', todo_task_markup);
     }
     
  }

}
