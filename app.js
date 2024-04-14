
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

overlay.addEventListener('click',()=>{
    console.log(1);
})
//////

let todoArr = [];

todoForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  let date = new Date();

 
  let todo = {
    id:Math.floor(Math.random()*1000),
    text: searchInp.value,
    completed:false,
    time:date.toLocaleString('uz-UZ',{
    hour:'numeric',
    minute:'numeric',
    second:'numeric'})
  }
 todoArr.push(todo);
 searchInp.value="";
 createTodos(todoArr);
});

 

// createTodos
function createTodos(data=todoArr){
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
         
             <p style="margin-right: auto; display: inline-block; text-decoration: ${textDecoration}">${text}</p>
             <p style=" opacity: 0.7">${time}</p>
              <div> 
                <i class="fa-regular fa-pen-to-square" style="margin-right: 5px;" onclick="updateTodo(${id})"></i>
                <i style="color: red;" class="fa-solid fa-trash" onclick="deleteTodo(${id})"></i> 
                
              </div>`;

    productList.appendChild(li);
});
}



//delete

function deleteTodo(itemId){
   todoArr=todoArr.filter(({id})=> id !== itemId);
    createTodos(todoArr);
}


//update
function updateTodo(itemId){
    openModal();
    editForm.addEventListener('submit',(e)=>{
      e.preventDefault();

      todoArr = todoArr.map((item)=>{
        if(item.id === itemId){
            return{...item,
            text:editInp.value,
            completed:false,}
        }
        return item;
      });
      createTodos();
      closeModal();
      
    })
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
      createTodos();
}


const darkModeBtn = document.getElementById("darkModeBtn");
const darkModeImg =document.getElementById("darkModeImg")
 
darkModeBtn.addEventListener('click',()=>{

    if(document.body.classList.contains("light")){
        document.body.classList.remove("light");
        darkModeBtn.lastChild.textContent ="Light Mode";
        darkModeImg.setAttribute('src','img/day-mode.png')
    } else{
        document.body.classList.add('light');
        darkModeBtn.lastChild.textContent = "Dark Mode"
        darkModeImg.setAttribute('src','img/night-mode.png')
    }
  
});
