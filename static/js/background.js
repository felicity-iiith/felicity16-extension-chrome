// var test;
$(document).ready(function(){

    setInterval(function(){
        // console.log("Hello");
        $.getJSON("https://felicity.iiit.ac.in/api/schedule/", function(result){
            $.each(result, function(version_id, schedule){
                //$("div").append(field + " ");
                console.log(version_id, schedule);
                // test = schedule.events_data;
                localStorage['schedule'] = JSON.stringify(schedule.events_data);
            });
        });
    }, 5000);
    //}, 3600000);
});
