
//to get current time using id
var curr_time = document.getElementById('current-time');


// to set the alarm tune when alarm rings
const audio = new Audio("./media/alarmtune.mp3");
audio.loop=true;

// to get all the alarm in the list
let alarmsList = document.getElementById('alarm-list');

// function to show current time
function currentTime() {
    var date = new Date();
    var hour = addZero(date.getHours());
    var min = addZero(date.getMinutes());
    var sec = addZero(date.getSeconds());
    curr_time.innerText = hour + ":" + min + ":" + sec;

    //i set the time enter by user in ringTime variable
    const ringTime=`${hour}:${min}:${sec}`;
    // set timeout function so that time is updating regularly
    let t = setTimeout(function () {
        currentTime();
        //if alarm list has ring time that is set by user then ringAlarm function will be called
        if(alarm_list.includes(ringTime)){
            ringAlarm(ringTime);
        }
    }, 1000);

}
currentTime();

// function to append 0 when single digit in hr,min,sec entered
function addZero(time) {
    if (time < 10 && time.length != 2) {
        time = "0" + time;
    }
    return time;

}
// to get set alarm by id
const userInput = document.querySelector(".set-alarm");


// this array is to take all the alarms 
let alarm_list = [];

//adding alarm enter by user into alarm list
userInput.addEventListener("submit", function (e) {
    e.preventDefault();
    const hr = userInput.hrs.value;
    const min = userInput.mins.value;
    const sec = userInput.secs.value;
    let new_hr = addZero(hr);
    if (new_hr === '0') {
        new_hr = '00';
    }
    let new_min = addZero(min);
    if (new_min === "0") {
        new_min = "00";
    }
    let new_sec = addZero(sec);
    if (new_sec === "0") {
        new_sec = "00";
    }
    var newAlarm = new_hr + ":" + new_min + ":" + new_sec;
    // if alarm is alreay exist in alarm_list we are not going to add it.
    if (alarm_list.includes(newAlarm) == false) {
        alarm_list.push(newAlarm);
        showAlarm(newAlarm);
    }
    //show this alert if alarm added by user already present in alarm list
    else {
        alert(`Alarm ${newAlarm} is already set`);
    }

    
    //console.log(alarm_list);
});

//this is to show alarm added by user
function showAlarm(newAlarm) {
    const html = `
    <li class="item_list">
    <span>${newAlarm}</span>
    <button class="alarm_clock_deleteBtn" id="delete-btn" onclick="remove(this.value)" value= ${newAlarm}> Delete</button>
    </li>
    
    </br>`;
    alarmsList.innerHTML += html;
}


//this is ringAlarm function to play alarm tune at perfect time
function ringAlarm(time){
    audio.play();
    // audio.play();
    console.log("alarm is ringing");
}


//this is stop alarm whenever alarm is rang
function clearAlarm(){
    audio.pause();
}

//remove alarm form alarm list
alarmsList.addEventListener('click', e => {
    console.log("removing element")
    if (e.target.classList.contains("alarm_clock_deleteBtn")) {
        e.target.parentElement.remove();
    }
});
//remove alarm form alarm list
const remove = (value) => {
    let newList = alarm_list.filter((time) => time != value);
    alarm_list.length = 0;
    alarm_list.push.apply(alarm_list, newList);
};





