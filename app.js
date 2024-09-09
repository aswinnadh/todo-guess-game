const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUl = document.getElementById('todo-list');

let allTodo = getTodo();
updateTodoList();
 todoForm.addEventListener('click',(e)=>{
    e.preventDefault();
    addTodo();
 });

 function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length>0){
        const todoObject ={
            text: todoText,
            completed: false,
        }
        allTodo.push(todoObject);
        updateTodoList();
        saveTodo();
        todoInput.value="";
    }
 }

 function updateTodoList(){
    todoListUl.innerHTML="";
    allTodo.forEach((todo, todoIndex)=>{
         todoItem =createTodoItem(todo, todoIndex);
        todoListUl.append(todoItem);
    })
 }


function createTodoItem(todo, todoIndex){
    const todoId="todo-"+todoIndex;
    const todoList =document.createElement("li");
    const todoText= todo.text;
    todoList.className='todo';
    todoList.innerHTML=`<input type="checkbox" id="${todoId}">
                <label for="${todoId}" class="custom-checkbox">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>`
    const deleteButton= todoList.querySelector(".delete-button");
    deleteButton.addEventListener("click",(e)=>{
        e.preventDefault();
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoList.querySelector("input");
    checkbox.addEventListener("change",(e)=>{
        e.preventDefault();
        allTodo[todoIndex].completed=checkbox.checked;
        saveTodo();
    })
    checkbox.checked =todo.completed;
    return todoList;
    
}

function deleteTodoItem(todoIndex){
    allTodo=allTodo.filter((_, i)=> i !== todoIndex);
    saveTodo();
    updateTodoList();
}

function saveTodo(){
    const todoJson = JSON.stringify(allTodo);
    localStorage.setItem("todos",todoJson);
}
function getTodo(){
    const todos = localStorage.getItem("todos")||"[]";
    return JSON.parse(todos);
}

//================================Guess game===========================================================

var currentScore=0;
var currentLife=10;

var checkButton = document.getElementById("check-button");

checkButton=document.addEventListener("click", (e)=>{
    e.preventDefault();
    var overlay=document.getElementById("overlay");
    var popup=document.getElementById("game-over-popup");
    var guessInput = document.getElementById("guess-input");
    var userNumber=guessInput.value.trim();
    if(currentLife==0){
        overlay.style.display="block";
        popup.style.display="block";
        
            var gameReset = document.getElementById("restart-button");
            gameReset=document.addEventListener("click", (e) => {
                e.preventDefault();
                overlay.style.display = "none";
                popup.style.display = "none";
                currentLife=10;
                currentScore=0;
                var state = document.getElementById("state");
                var SysNumber = document.getElementById("number");
                var score = document.getElementById("score");
                var life = document.getElementById("life");
                SysNumber.textContent="";
                state.textContent ="guess the number";
                score.textContent= "Your Score is : " + currentScore;
                life.textContent= "Remaining Life is : "+ currentLife;
                guessInput.value="";
            });
           
    }
    else if(userNumber!=""){
        check(userNumber);

    }
    

});

function check(userNumber){
       
   
    var state = document.getElementById("state");
    var SysNumber = document.getElementById("number");
    var score = document.getElementById("score");
    var life = document.getElementById("life");

    var guess=Math.floor(Math.random()*10);
    
    SysNumber.textContent="The Number is : "+guess;
    if(guess==userNumber){
        state.textContent ="Your Guess is Correct";
        currentScore++;
        score.textContent= "Your Score is : " + currentScore;
        life.textContent= "Remaining Life is : "+ currentLife;
    }else{
        state.textContent ="oops! wrong guess";
        currentLife--;
        score.textContent= "Your Score is : " + currentScore;
        life.textContent= "Remaining Life is : "+ currentLife;
    }
   
};