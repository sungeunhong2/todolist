//유저가 값을 입력한다
//+버튼을 클릭하면, 할일이 추가된다
//delete버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1.check 버튼을 클릭하는 순간  true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로 

//진행중 끝남 탭을 누르면, 언더바가 이동한다
//끝납탭은 끝난아이템만 진행중인 탭은 진행중인 아이템만
//전체탭은 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = [];
let fileterList =[];
let mode = 'all';

addButton.addEventListener("click", addTask);

for(let i = 0; i< tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    })
}
console.log(tabs);
function addTask(){
    let task = {
        id : randomIdGenerater(),
        taskContent: taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}


function render(){
    //1.내가 선택한 탭에 따라서 
    
    //all -> taskList
    //ongoing, done filterList
    let list = [];

     if(mode ==="all"){
        list = taskList;
    }else if(mode ==="ongoing"){
        list = fileterList;
    }else if(mode ==="done"){
        list = fileterList;
    }
    //2.리스트를 달리 보여준다
   
    let resultHTML  = '';
   for(let i = 0 ; i < list.length; i++){

        if(list[i].isComplete == true){
            resultHTML +=  `<div class = "task">
            <div class = "task-done">${list[i].taskContent}</div>
                <div>
                    <button onClick ="toggleComplete('${list[i].id}')"> Check </button>
                    <button onClick ="deleteTask('${list[i].id}')"> Delete</button>
                </div>
            </div>`

        }else{
            resultHTML +=   `<div class = "task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onClick ="toggleComplete('${list[i].id}')"> Check </button>
                <button onClick ="deleteTask('${list[i].id}')"> Delete</button>
            </div>
        </div>`
        }

    }
    document.getElementById("task-board").innerHTML = resultHTML;
}


function toggleComplete (id){
    console.log(id);
    for(let i = 0; i< taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function randomIdGenerater(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id){
    for(let i = 0; i< taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        } 
    }
    console.log(taskList);
    render();
}

function filter(event){
    console.log("fileter", event.target.id);
    mode =  event.target.id;
    fileterList = [];

    if(mode =="all"){
        //전체리스트를 보여준다
        render();
    }else if (mode ==="ongoing"){
        //진행중인 아이템을 보여준다.
        //task.isComplete=false
        for(let i = 0; i< taskList.length; i++){
            if(taskList[i].isComplete ===false){
                fileterList.push(taskList[i]);
            }
        }
        render();
        console.log(fileterList);
    }else if (mode ==="done"){
        //끝나는 케이스
        //task.isComplete=true
        for(let i = 0; i< taskList.length; i++){
            if(taskList[i].isComplete ===true){
                fileterList.push(taskList[i]);
            }
        }
        render();
    }
}