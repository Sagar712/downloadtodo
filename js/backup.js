




function addTask() {
    location.href = '.';
}


const AppUrl = 'https://secret-script.herokuapp.com/script/';
let spinner = document.querySelector(".loadingOverlay");

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



function Openwindow(divname) {
    let win = document.querySelector(`.${divname}`);
    let overlay = document.querySelector(`.overlayforclose`);
    win.classList.toggle("active");
    overlay.classList.toggle("active");
}

function uploadBackUp() {
    let originalDb = localStorage.getItem("596853");
    let completeDb = localStorage.getItem("596853Complete");
    spinner.classList.add("active");

    let name = originalDb;
    let email1 =  document.getElementById("uname").value;
    let pass = completeDb;
    
    const data = {
        username: name,
        email: email1,
        password: pass
    };

    if(email1!=""){
        fetch(AppUrl,{method:'post', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})
    .then(res => {
        return res.json();
    })
    .then(response => {
        
        console.log(response);
        if(response.msg == "user alreay exists!!"){
            fetch(AppUrl+email1,{method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})
            .then(res => {
                return res.json();
            })
            .then(response => {
                alert(response.msg);
                console.log(response);
            })
        }
        else{
            alert(response.msg);
            console.log(response);
        }
        spinner.classList.remove("active");
    });
    }
    else{
        spinner.classList.remove("active");
        alert("username can't be NULL !");
    }
        

    Openwindow('setuname')
}

function downBackUp() {

    let email1 =  document.getElementById("uname2").value;
    spinner.classList.add("active");
    let downloadedOriginal;
    let downloadedCompleted;

    if(email1!=""){
        
        fetch(AppUrl+email1)
    .then(res => {
        return res.json();
    })
    .then(response => {
        
        downloadedOriginal = JSON.parse(response.username);
        downloadedCompleted = JSON.parse(response.password);
        console.log(downloadedOriginal);
        if(localStorage.getItem("596853")==null){
            let masterDb = {
                tasks:{
                    
                }
            }
    
            let db = JSON.stringify(masterDb);
            localStorage.setItem("596853", db);
        }
        if(localStorage.getItem("596853Complete")==null){
            let masterDb = {
                tasks:{
                    
                }
            }
    
            let db = JSON.stringify(masterDb);
            localStorage.setItem("596853Complete", db);
        }
        let originalDb = JSON.parse(localStorage.getItem("596853"));
        let completeDb = JSON.parse(localStorage.getItem("596853Complete"));

        let j=1;
        while(originalDb.tasks[j]!=null){
            j++;
        }
        console.log(j);
        let i=1;
        while(downloadedOriginal.tasks[i]!=null){
            originalDb.tasks[j++] = downloadedOriginal.tasks[i];
            i++;    
        }
        console.log(originalDb);
        localStorage.setItem("596853", JSON.stringify(originalDb));

        j=1;
        while(completeDb.tasks[j]!=null){
            j++;
        }
        i=1;
        while(downloadedCompleted.tasks[i]!=null){
            completeDb.tasks[j++] = downloadedCompleted.tasks[i];
            i++;
        }
        localStorage.setItem("596853Complete", JSON.stringify(completeDb));
        spinner.classList.remove("active");
    });
    }
    else{
        spinner.classList.remove("active");
        alert("username can't be NULL !");
    }
        

        Openwindow('getuname');
    
}





function mainThemeChanger() {
    let masterSetting = JSON.parse(localStorage.getItem("settings"));
    if(masterSetting.isEnabled == "yes"){
        document.querySelector("header").style.backgroundColor = "rgb(172, 40, 0)";
        document.querySelector("header").style.color = "white";
        document.querySelector("body").style.backgroundColor = "rgb(192, 192, 192)";
        document.querySelector(".fas.fa-cloud-upload-alt").style.color = "black";
        document.querySelector(".fas.fa-cloud-download-alt").style.color = "black";
        document.querySelector(".importbtns p").style.color = "black";
        document.querySelector(".backupbtns p").style.color = "black";
        document.querySelector(".importbtns").style.border = "2px solid black";
        document.querySelector(".backupbtns").style.border = "2px solid black";
        document.querySelector(".menuitems").style.backgroundColor = "rgb(172, 40, 0)";
        let munuitembtn = document.querySelectorAll(".menuitems button");
        for(let i=0; i<munuitembtn.length; i++){
            munuitembtn[i].style.backgroundColor = "rgb(172, 40, 0)";
            munuitembtn[i].style.color = "white";
            munuitembtn[i].style.border = "2px solid white";
            munuitembtn[i].style.boxShadow = "none";
        }
    }

    else{
        
    }
    
}

mainThemeChanger();