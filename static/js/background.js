// var test;

function getEvents()
{
    // localStorage['version_id'] = '';
    console.log("called");
    $.getJSON("https://felicity.iiit.ac.in/api/schedule/", {
            prev_id : localStorage['version_id']
        },
        function(result){
            console.log(result);
            test = result;
            if(!(result == undefined || result == ''))
            {
                version_id = result.version_id;
                schedule = result.page_data;
                console.log(version_id, schedule);

                if(version_id)
                {
                    localStorage['version_id'] = version_id;
                    localStorage['schedule'] = JSON.stringify(schedule.events_data);
                }
            }
    });

}

$(document).ready(function(){
    getEvents();
    // setInterval(getEvents,5000);
    setInterval(getEvents,3600000);
});
