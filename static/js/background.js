// var test;

$(document).ready(function(){
    // localStorage['version_id'] = '';
    function getEvents()
    {
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
    getEvents();
    // setInterval(getEvents,5000);
    setInterval(getEvents,3600000);
});
