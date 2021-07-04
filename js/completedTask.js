function addTask() {
    location.href = '.';
}

let currentIndex;

function deleteTask(indexOfTask) {
    if(indexOfTask == null){
        indexOfTask = currentIndex;
    }
    let i=1;
    let completeDb = JSON.parse(localStorage.getItem("596853Complete"));
    let updateTasksOfComplted = {
        tasks:{
                
        }
    }
    let k=1;
    while(completeDb.tasks[i]!=null){
        
        if(i === indexOfTask){
            i++;
            continue;
        }
        updateTasksOfComplted.tasks[k++] = completeDb.tasks[i];

        i++;
    }

    localStorage.setItem("596853Complete", JSON.stringify(updateTasksOfComplted));
    window.location.reload();
}



let num1 = 0;
function popupmenu() {
    let rotater = document.querySelector(".menubtn-bar");
    let cross = document.querySelector(".bar");
    let menu = document.querySelector(".menuitems");
    let overlay = document.querySelector(".nextoverlay");
    let icon = document.getElementById('changeclas');

    cross.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    rotater.classList.toggle("active");
    if(num1==0){
        icon.className='fas fa-times';
        num1=1;
    }
    else if(num1==1){
        icon.className='fas fa-bars';
        num1=0;
    }
    
}



function undoTask() {
    let i=1;
    let completeDb = JSON.parse(localStorage.getItem("596853"));
    let originalDb = JSON.parse(localStorage.getItem("596853Complete"));
    let updateTasksOfOriginal = {
        tasks:{
                
        }
    }
    let k=1;
    while(originalDb.tasks[i]!=null){
        
        if(i === currentIndex){
            let j=1;
            while(completeDb.tasks[j]!=null){
                j++;
            };
            completeDb.tasks[j]=originalDb.tasks[i];
            i++;
            continue;
        }
        updateTasksOfOriginal.tasks[k++] = originalDb.tasks[i];

        i++;
    }
    localStorage.setItem("596853Complete", JSON.stringify(updateTasksOfOriginal));
    localStorage.setItem("596853", JSON.stringify(completeDb));
    window.location.reload();
}

function indexAllocTask(indexOf) {
    togglePopup("popupTask");
    currentIndex = indexOf;
    console.log(currentIndex);
}

function togglePopup(classOfPopup) {

    let popup = document.querySelector(`.${classOfPopup}`);
    let overlay = document.querySelector(".overlay");

    popup.classList.toggle("active");
    overlay.classList.toggle("active");
}

function renderer(key, classId) {
    if(localStorage.getItem(key)!=null){
        let obj = JSON.parse(localStorage.getItem(key));
        let i =1;
        let str = "";
        let clasTitle =  document.getElementById(classId);
        while(obj.tasks[i]!=null){
            let status1 = obj.tasks[i].status;
            let current_status;
            let color;
            let newDiv;
            
            current_status = 'far fa-trash-alt';
            color = 'red';
            

            if(!obj.tasks[i].description==""){
                newDiv = `<div class='sample'>
                            <div class="status">
                                <i style="color: ${color};" id="statusIcon" class="${current_status}" onclick="deleteTask(${i})"></i>
                            </div>
                            <div class="contentContainer" onclick="indexAllocTask(${i})">
                                <h2>${obj.tasks[i].title}</h2>
                                <p>${obj.tasks[i].description}</p>
                            </div>
                        </div>`;
            }
            else{
                newDiv= `<div class='sample'>
                            <div class="status">
                                <i style="color: ${color};" id="statusIcon" class="${current_status}" onclick="deleteTask(${i})"></i>
                            </div>
                            <div class="contentContainer" onclick="indexAllocTask(${i})">
                                <h2>${obj.tasks[i].title}</h2>
                            </div>
                        </div>`;
            }
            
            let temp = newDiv;
            temp = temp+str;
            str = temp;
            i++;

        }
        if(str!="")
            clasTitle.innerHTML = str;
    }
}

renderer("596853Complete", "AllTasks2");

function mainThemeChanger() {
    let masterSetting = JSON.parse(localStorage.getItem("settings"));
    if(masterSetting.isEnabled == "yes"){
        document.querySelector("header").style.backgroundColor = "rgb(172, 40, 0)";
        document.querySelector("header").style.color = "white";
        document.querySelector("body").style.backgroundColor = "rgb(192, 192, 192)";
        document.querySelector("footer").style.backgroundColor = "rgb(172, 40, 0)";
        document.querySelector("footer").style.color = "white";
        document.querySelector(".menuitems").style.backgroundColor = "rgb(172, 40, 0)";
        let munuitembtn = document.querySelectorAll(".menuitems button");
        for(let i=0; i<munuitembtn.length; i++){
            munuitembtn[i].style.backgroundColor = "rgb(172, 40, 0)";
            munuitembtn[i].style.color = "white";
            munuitembtn[i].style.border = "2px solid white";
            munuitembtn[i].style.boxShadow = "none";
        }
        let sampler = document.querySelectorAll(".sample");
        let samplerP = document.querySelectorAll(".sample p");
        console.log(sampler.length);
        for(let i=0; i<sampler.length; i++){
            sampler[i].style.backgroundColor = "rgb(220, 220, 220)";
            sampler[i].style.boxShadow = "0 0 6px 0 rgb(63, 63, 63)";
            document.querySelectorAll(".status i")[i].style.backgroundColor = "rgb(63, 63, 63)";
            document.querySelectorAll(".sample h2")[i].style.color = "black";
            if(samplerP[i]!= null){
                samplerP[i].style.color = "rgb(70, 70, 70)";
            }
        }
    }

    else{
        
    }
    
}

mainThemeChanger();
