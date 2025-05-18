document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task))
        updateTaskList();
        updateStats();
    }
})

let tasks = [];


const saveTasks = ()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}



const addTask = ()=>{
    const tasksInput = document.getElementById("task-input");
    const text = tasksInput.value.trim();

    if(text){
        tasks.push({text:text, completed:false})
        updateTaskList()
        tasksInput.value = ''; 
        updateStats();
        saveTasks();
    }
}




const updateTaskList = ()=>{
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ''

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li')

        listItem.innerHTML = `
        <div class = "taskItem">
            <div class = "task ${task.completed ? 'completed' : ''}">
                <input type ="checkbox" class = "checkbox"  ${task.completed ? 'checked' : ""}>
                <p>${task.text}</p>
            </div>
            <div class = "icons">
                <img src = "Assets/edit.png" onClick = "editTask(${index})">
                <img src = "Assets/bin.png" onClick = "deleteTask(${index})">
            </div>
        </div>
        `
        listItem.addEventListener('change', ()=> toggleTaskComplete(index))
        taskList.append(listItem)
        
    });
}

document.getElementById("button").addEventListener('click', function(e){
    e.preventDefault()

    addTask()
})

const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed
    updateTaskList();
    updateStats();
    saveTasks();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const editTask = (index) => {
    const taskInput = document.getElementById("task-input")
    taskInput.value = tasks[index].text

    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressBar = document.getElementById("progress");
    const numbers = document.getElementById("numbers");

    if (totalTasks === 0) {
        progressBar.style.width = '0%';
        numbers.textContent = `0 / 0`;
        return;
    }

    const progress = (completeTasks / totalTasks) * 100;
    progressBar.style.width = `${progress}%`;
    numbers.textContent = `${completeTasks} / ${totalTasks}`;

    if(tasks.length && completeTasks === totalTasks){
        blastCannon();
    }
}


const blastCannon = ()=>{
    const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 30,
    scalar: 1.2,
    shapes: ["circle", "square"],
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 2,
    shapes: ["emoji"],
    shapeOptions: {
      emoji: {
        value: ["🦄", "🌈"],
      },
    },
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
}