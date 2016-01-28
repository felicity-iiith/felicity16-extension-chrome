$(document).ready(function(){
    chrome.extension.getBackgroundPage().getEvents();
    schedule = JSON.parse(localStorage['schedule']);
    display_arr = [];
    for(var event_iter in schedule)
    {
        event_obj = schedule[event_iter];
        display_arr.push({
            name : event_obj.data.name;
            url : 'https://felicity.iiit.ac.in/' + event_obj.path;
            start_time : event_obj.data.start_time;
            end_time : event_obj.data.end_time;
        });
    }
    // fill in display_arr in ui
});
