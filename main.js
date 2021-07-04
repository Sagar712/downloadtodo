if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('./sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        // A wild service worker has appeared in reg.installing!
        newWorker = reg.installing;
  
        newWorker.addEventListener('statechange', () => {
          // Has network.state changed?
          switch (newWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // new update available
                showUpdateBar();
              }
              // No update available
              break;
          }
        });
      });
    });

  
    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });
}

  
function showUpdateBar(){
    document.querySelector('.updateAvailable').classList.add('active');
}  

function fireUpdate() {
    document.querySelector('.updateAvailable').classList.remove('active');
    newWorker.postMessage({ action: 'skipWaiting' });
}

document.querySelector('.closebtnH').addEventListener('click', function(){
    document.querySelector('.updateAvailable').classList.remove('active');
});
let hours , mins=0;

function timesetter() {
  const timerec = document.querySelector('#timeOfNotf').value;
  hours = timerec.split(":")[0];
  mins = timerec.split(":")[1];
  console.log(hours + " -> "+mins);
  fireIt();
}

function fireIt() {
    let thisTime = new Date();
    if(hours != undefined && mins !=undefined){
      let dateChanger = thisTime.getDate();
      let obj = JSON.parse(localStorage.getItem("596853"));
        let i =1;
        let CompleteStr = "";
        while(obj.tasks[i]!=null){
            CompleteStr = CompleteStr.concat(obj.tasks[i].title+"\n");
            i++;
        }
        let temp = new Date(thisTime.getFullYear(), thisTime.getMonth(), dateChanger++, hours, mins, 0);
        console.log(temp);
        setNotification(temp, CompleteStr);
    }
    else
      alert("Set time and then try");
}

function setNotification(time, bodyIs) {
    Notification.requestPermission().then(function(result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification('Notification from PWA', 
          {
            title: "Pending Tasks so far..",
            tag: Math.random().toString().substr(2),
            body:bodyIs,
            showTrigger: new TimestampTrigger(time.getTime()),
          });
        });
        console.log("Notification is set");
      }
  });
}

async function deleteNotif(){
    window.notifications = null;
    try {
        const registration = await navigator.serviceWorker.getRegistration();
        window.notifications = await registration.getNotifications({
            includeTriggered: true,
          });
          if (Array.isArray(window.notifications)) {
            window.notifications.forEach((notification, i) => {
              notifications[i].close();
            }); 
          }
          alert("Notifications cancelled!");
    } catch (error) {
        alert("Notification aren't set yet!");
    }
    
}

let num = 1;
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

function togglePopup(classOfPopup) {

    let popup = document.querySelector(`.${classOfPopup}`);
    let overlay = document.querySelector(".overlay");

    popup.classList.toggle("active");
    overlay.classList.toggle("active");
}

let statusis = "normal";
let clicked = false;

function clickStatus(stat) {
    clicked = true;
    statusis = stat;
}

function saveTask() {
    location.href = '.';
    let titleis = document.getElementById("title").value;
    let descis = document.getElementById("description").value;
    

    if(localStorage.getItem("596853")!=null){
       
        let obj = JSON.parse(localStorage.getItem("596853"));
        let i =1;
        while(obj.tasks[i]!=null){
            i++;
        }
        obj.tasks[i]={
            title: titleis,
            status: statusis,
            description: descis
        }

        let db = JSON.stringify(obj);
        localStorage.setItem("596853", db);
        console.log(titleis+" "+statusis+" "+descis);

        //console.log(typeof(dataEntry) + " & "+ typeof(db) +" & "+aljsl.title+aljsl.description);
    }
    else{
        let masterDb = {
            tasks:{
                1:{
                    title: titleis,
                    status: statusis,
                    description: descis
                }
            }
        }

        let db = JSON.stringify(masterDb);
        localStorage.setItem("596853", db);
        
    }
    
    addTask();
    window.location.reload();
}

let currentIndex;
function saveCurrentTask() {
    let originalDb = JSON.parse(localStorage.getItem("596853"));

    let titleis = document.getElementById("title2").value;
    
    let descis = document.getElementById("description2").value;

    if(!clicked){
        statusis = originalDb.tasks[currentIndex].status;
    }
    

    originalDb.tasks[currentIndex].title = titleis;
    originalDb.tasks[currentIndex].status = statusis;
    originalDb.tasks[currentIndex].description = descis;

    localStorage.setItem("596853", JSON.stringify(originalDb));
    togglePopup('editTask');
    window.location.reload();
}

function fjsjh() {
    for(let i=0; i<2; i++){
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `<h1>Hello</h1>`;
        newDiv.className = 'sample';
        document.body.appendChild(newDiv);
        //console.log("newDiv: "+newDiv)
    }
    
}

function completeTask(indexOfTask) {

    if(localStorage.getItem("596853Complete")==null){
        let masterDb = {
            tasks:{
                
            }
        }

        let db = JSON.stringify(masterDb);
        localStorage.setItem("596853Complete", db);
    }

    let i=1;
    let originalDb = JSON.parse(localStorage.getItem("596853"));
    let completeDb = JSON.parse(localStorage.getItem("596853Complete"));
    let updateTasksOfOriginal = {
        tasks:{
                
        }
    }
    let k=1;
    while(originalDb.tasks[i]!=null){
        
        if(i === indexOfTask){
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
    localStorage.setItem("596853Complete", JSON.stringify(completeDb));
    localStorage.setItem("596853", JSON.stringify(updateTasksOfOriginal));
    window.location.reload();
}

function deleteTask() {
    let indexOfTask = currentIndex;
    let i=1;
    let completeDb = JSON.parse(localStorage.getItem("596853"));
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

    localStorage.setItem("596853", JSON.stringify(updateTasksOfComplted));
    togglePopup('editTask');
    window.location.reload();
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
            if(status1 == "normal"){
                current_status = 'far fa-circle';
                color = 'white';
            }
                
            else if(status1 == "important"){
                current_status = 'fas fa-exclamation-triangle';
                color = 'yellow';
            }
            else{
                current_status = 'far fa-circle';
                color = 'white';
            }

            if(!obj.tasks[i].description==""){
                newDiv = `<div class='sample'>
                            <div class="status">
                                <i style="color: ${color};" id="statusIcon" class="${current_status}" onclick="completeTask(${i})"></i>
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
                                <i style="color: ${color};" id="statusIcon" class="${current_status}" onclick="completeTask(${i})"></i>
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


function indexAllocTask(indexOf) {
    togglePopup("editTask");
    currentIndex = indexOf;
    let titleis = document.getElementById("title2");
    let descis = document.getElementById("description2");

    let originalDb = JSON.parse(localStorage.getItem("596853"));
    titleis.value = originalDb.tasks[currentIndex].title;
    descis.value = originalDb.tasks[currentIndex].description;
    console.log(currentIndex);
}

function completeTask2() {
    completeTask(currentIndex);

}

renderer("596853", "AllTasks");

function CompltedTasks() {
    window.location = './completedTasks.html';
    renderer("596953Complete", "AllTasks2")
}

if(localStorage.getItem("settings")==null){
    const settings = {
        isEnabled : "no"
    }
    localStorage.setItem("settings", JSON.stringify(settings));
}

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
}

mainThemeChanger();
