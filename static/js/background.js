// var test;

function getEvents()
{
    // console.log("getEvents called");
    events_data = null;
    $.getJSON("https://felicity.iiit.ac.in/api/schedule/", {
            prev_id : localStorage['version_id']
        },
        function(result){
            // console.log(result);
            if(!(result == undefined || result == ''))
            {
                version_id = result.version_id;
                schedule = result.page_data;
                // console.log(version_id, schedule);

                if(version_id)
                {
                    localStorage['version_id'] = version_id;
                    events_data = schedule.events_data;
                    notifs_info = [];
                    for(var event_iter in events_data)
                    {
                        event_obj = events_data[event_iter];
                        if(event_obj.data.start_time != false)
                        notifs_info.push({
                            name : event_obj.data.name,
                            url : 'https://felicity.iiit.ac.in/' + event_obj.path,
                            start_time : event_obj.data.start_time
                        });
                    }
                    // notifs_info.forEach(function(notif){console.log(notif)});
                    localStorage['notifs_info'] = JSON.stringify(notifs_info);
                    // notifs_info[0].start_time = "2016-02-04 02:10";
                    createNotifAlarms(notifs_info);
                    // showNotification(notifs_info[0].name, "15 minutes");
                }
            }
    });
}

function createNotifAlarms(notifs_info)
{
    chrome.alarms.clearAll();
    notifs_info.forEach(function(notif){
        timeWhen_1 = new Date(notif.start_time).getTime()-86400000;
        timeWhen_2 = new Date(notif.start_time).getTime()-900000;
        now = new Date();
        // console.log(notif.name);
        if(timeWhen_1 > now.getTime())
        {
            // console.log(timeWhen_1);
            notifId = JSON.stringify({notifName :notif.name, notifTime: "24 hours"});
            chrome.alarms.create(notifId, {when: timeWhen_1});
        }
        if(timeWhen_2 > now.getTime())
        {
            // console.log(timeWhen_2);
            notifId = JSON.stringify({notifName :notif.name, notifTime: "15 minutes"});
            chrome.alarms.create(notifId, {when: timeWhen_2});
        }
    });
    //chrome.alarms.getAll(function(alarms){console.log(alarms)})
}



function showNotification(notifName, notifTime)
{
    msg = notifName + " starts in " + notifTime + ".";  // notifTime can be like 15 min or 24 hours.
    chrome.notifications.create(notifName,
    {
        type: 'basic',
        iconUrl: 'images/felicity16_128.png',
        title: "Felicity 16",
        message: msg,
        buttons: [{ title: 'Go to Event Page' }],
        isClickable: true,
    });
}

function goToEventPage(eventName)
{
    if(localStorage['notifs_info'])
    {
        notifs_info = JSON.parse(localStorage['notifs_info']);
        notifs_info.forEach(function(notif){
            if (notif.name == eventName) {
                window.open(notif.url);
                // console.log(notif.url);
            }
        });
    }
}

chrome.notifications.onClicked.addListener(function (notifName){
	goToEventPage(notifName);
});

chrome.notifications.onButtonClicked.addListener(function (notifName){
    goToEventPage(notifName);
});

$(document).ready(function(){
    getEvents();
    // setInterval(getEvents,25000);
    setInterval(getEvents,3600000);
    chrome.alarms.onAlarm.addListener(function( alarm ) {
        // console.log("Got an alarm!", alarm);
        alarm_obj = JSON.parse(alarm.name);
        showNotification(alarm_obj.notifName, alarm_obj.notifTime);
    });
});
