
const submitBtn = document.getElementById('submitBtn');
const productList = document.getElementById('productList');
const todoForm = document.getElementById('todoForm');


//Modal
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const editForm = document.getElementById('editForm');



function openModal(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}


function closeModal(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}


overlay.addEventListener('click', () => {
    closeModal();
});

//////

let todoArr = JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) :[];

createTodos();

todoForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  let date = new Date();

 
  let todo = {
    id:date.getTime(),
    text: searchInp.value,
    completed:false,
    time:date.toLocaleString('uz-UZ',{
    hour:'numeric',
    minute:'numeric',
    day:'2-digit',
    month:'2-digit',
    year:'numeric'
})
  }
 todoArr.push(todo);
 localStorage.setItem('todos', JSON.stringify(todoArr));
 searchInp.value="";
 createTodos(todoArr);

});

 

// createTodos
function createTodos(data = todoArr){
    productList.innerHTML ="";

    data.forEach(({id,text,time,completed}) => {
    const li = document.createElement('li');
    li.classList.add('list-item')

    if(completed){
        li.classList.add('disabled');
    }

    const textDecoration = completed ? 'line-through': 'none';



    li.innerHTML=`
        <label id="check" class="label" onclick='completeTodo(${id})'>
            <span></span>
          </label>
         
             <p style="margin-right: auto; display: inline-block; text-decoration: ${textDecoration}; ">${text}</p>
             <p style=" opacity: 0.7">${time}</p>
              <div> 
                <i class="fa-regular fa-pen-to-square" style="margin-right: 5px;" onclick="updateTodo(${id})"></i>
                <i style="color: red;" class="fa-solid fa-trash" onclick="confirmDelete(${id})"></i> 
                
              </div>`;

    productList.appendChild(li);
});
}


//delete

function deleteTodo(itemId){
   todoArr=todoArr.filter(({id})=> id !== itemId);
   localStorage.setItem('todos', JSON.stringify(todoArr));
    createTodos(todoArr);
}


//update
function updateTodo(itemId){
    openModal();

    function onSubmit(e){
            e.preventDefault();
      
            todoArr = todoArr.map((item)=>{
              if(item.id === itemId){
                  return{...item,
                  text:editInp.value,
                  completed:false,}
              }
              return item;
            });
            localStorage.setItem('todos', JSON.stringify(todoArr));
        
      
            editInp.value = '';
            closeModal();
            e.target.reset();
            createTodos();
        return editForm.removeEventListener("submit",onSubmit);
    }
    editForm.addEventListener('submit',onSubmit);
}



//complete

function completeTodo(itemId){
    todoArr = todoArr.map((item)=>{
        if(item.id === itemId){
            return{...item,
            completed: !item.completed}
        }
        return item;
      });
      localStorage.setItem('todos', JSON.stringify(todoArr));
      createTodos();
}


// confirmDelete
function confirmDelete(itemId) {
    var result = confirm("Aniq o'chirib yubormoqchimisiz?");
    if (result) {
        deleteTodo(itemId);
    } else {
        alert("O'chirilmadi!");
    }
}


const darkModeBtn = document.getElementById("darkModeBtn");
const darkModeImg =document.getElementById("darkModeImg")
 
if((localStorage.getItem('DarkMode') === "dark")){
    document.body.classList.remove("light");
        darkModeBtn.lastChild.textContent ="LightMode";
        darkModeImg.setAttribute('src','img/day-mode.png');
}else{
    document.body.classList.add('light');
        darkModeBtn.lastChild.textContent = "DarkMode"
        darkModeImg.setAttribute('src','img/night-mode.png');
}


darkModeBtn.addEventListener('click',()=>{

    if(document.body.classList.contains("light")){
        document.body.classList.remove("light");
        darkModeBtn.lastChild.textContent ="LightMode";
        darkModeImg.setAttribute('src','img/day-mode.png');
        localStorage.setItem('DarkMode',"dark");
    } else{
        document.body.classList.add('light');
        darkModeBtn.lastChild.textContent = "DarkMode"
        darkModeImg.setAttribute('src','img/night-mode.png');
        localStorage.setItem('DarkMode',"light");
    }
});



