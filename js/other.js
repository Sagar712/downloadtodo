if(localStorage.getItem("settings")==null){
    const settings = {
        isEnabled : "no"
    }
    localStorage.setItem("settings", JSON.stringify(settings));
}


function addTask() {
    location.href = '.';
}

function openTime() {
    document.getElementById("timeOfNotf").click();
}


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
            i++;
        }
        i--;
        for (let j = i; j > 0; j--) {
            CompleteStr = CompleteStr.concat(obj.tasks[j].title+"\n");
        }
        for (let i = 0; i < 5; i++) {
            let temp = new Date(thisTime.getFullYear(), thisTime.getMonth(), dateChanger++, hours, mins, 0);
            console.log(temp);
            setNotification(temp, CompleteStr);
        }
        
    }
    else
      alert("Set time and then try");
}

function setNotification(time, bodyIs) {
    console.log(bodyIs);
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

if ('showTrigger' in Notification.prototype) {
    console.log('Notification Triggers supported ');
  }
  else{
    console.log("Not supported");
}  

function changeTheme() {
    let masterSetting = JSON.parse(localStorage.getItem("settings"));

    if(masterSetting.isEnabled == "no")
        masterSetting.isEnabled = "yes";
    else{
        masterSetting.isEnabled = "no";
        location.reload();
    }
        
    console.log(masterSetting);
    localStorage.setItem("settings", JSON.stringify(masterSetting));

    mainThemeChanger();

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

function deleteAll() {

    if(confirm("You are about to wipe out all Tasks in memory\nCan't undo this")){
        localStorage.removeItem("596853");
        localStorage.removeItem("596853Complete");
        const sample = {
            tasks:{

            }
        }
        localStorage.setItem("596853", JSON.stringify(sample));
        localStorage.setItem("596853Complete", JSON.stringify(sample));
        alert("All data deleted !");
    }
    else
        alert("Operation cancelled !");
}

async function showAll(){
    window.notifications = null;
    const registration = await navigator.serviceWorker.getRegistration();
    window.notifications = await registration.getNotifications({
      includeTriggered: true,
    });
    let Str = "";
    if (Array.isArray(window.notifications)) {
      window.notifications.forEach((notification, i) => {
        Str = Str.concat(`notification title--> ${notification.title} \n notification time --> ${(new Date(notification.showTrigger.timestamp)).toLocaleTimeString()}\n`);
      }); 
    }
    alert(Str);
}

function mainThemeChanger() {
    let masterSetting = JSON.parse(localStorage.getItem("settings"));
    if(masterSetting.isEnabled == "yes"){
        document.querySelector("header").style.backgroundColor = "rgb(172, 40, 0)";
        document.querySelector("header").style.color = "white";
        document.querySelector("body").style.backgroundColor = "rgb(192, 192, 192)";
        document.querySelector(".setIcon i").className = "fas fa-toggle-on"
        let allSet = document.querySelectorAll(".setting1");
        for(let i=0; i<allSet.length; i++){
            allSet[i].style.backgroundColor = "rgb(63, 63, 63)";
            allSet[i].style.color = "white";
        }

        document.querySelector(".menuitems").style.backgroundColor = "rgb(172, 40, 0)";
        let munuitembtn = document.querySelectorAll(".menuitems button");
        for(let i=0; i<munuitembtn.length; i++){
            munuitembtn[i].style.backgroundColor = "rgb(172, 40, 0)";
            munuitembtn[i].style.color = "white";
            munuitembtn[i].style.border = "2px solid white";
            munuitembtn[i].style.boxShadow = "none";
        }       
    }
}

mainThemeChanger();