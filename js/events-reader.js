/**
 * Created by jcsiervo on 12/28/2016.
 */
/**
 * Tries to convert a given XML data to a native JavaScript object by traversing the DOM tree.
 * If a string is given, it first tries to create an XMLDomElement from the given string.
**/

function parseXML(xml, date, mostRecent){

    var i, j;
    var xmlDoc = xml.responseXML;
    var eventObject = {
        date: date,
        events: [{ title: "Eventos",
            start : "",
            end : "",
            description : "Por lo pronto, no tenemos eventos planeados para esta fecha."}]
    };

    var date_events = xmlDoc.getElementsByTagName("date");
    if ((date_events.length > 0) && mostRecent) {
        for (i = 0; i < date_events.length ;i++) {
            var latest_date = date_events[i].getAttribute('value');
            var date_arr = latest_date.split("-");
            var date_obj = new Date(date_arr[0],(date_arr[1]-1),date_arr[2]);
            var today = new Date();
            date_obj.setHours(today.getHours());
            date_obj.setMinutes(today.getMinutes() + 1);
            date_obj.setSeconds(today.getSeconds());
            if ((date_obj > today) || (date_obj === today)) {
                date = latest_date;
                break;
            }
        }
        if (date == "") {
            eventObject.events[0].title = "Eventos";
            eventObject.events[0].description = "Por lo pronto, no tenemos eventos planeados.";
            return eventObject;
        }
    }

    for (i = 0; i < date_events.length ;i++) {

        var elem_date = date_events[i].getAttribute('value');
        if (elem_date == date)  {
            var events_element = date_events[i].getElementsByTagName("title");
            eventObject.date = elem_date;

            // Remove empty element
            eventObject.events.pop();
            for (j = 0; j < events_element.length; j++) {
                eventObject.events.push({
                    title: events_element[j].getAttribute("value"),
                    start : events_element[j].getElementsByTagName("startTime")[0].childNodes[0].nodeValue,
                    end : events_element[j].getElementsByTagName("endTime")[0].childNodes[0].nodeValue,
                    description : events_element[j].getElementsByTagName("description")[0].childNodes[0].nodeValue
                });
            }
        }
    }
    return eventObject;
}

function getAllEvents(xml){
    var i;
    var xmlDoc = xml.responseXML;
    var totalEvents = {};
    var date_events = xmlDoc.getElementsByTagName("date");

    // first add current date
/*    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    var curr_date = yyyy+'-'+mm+'-'+dd;
    totalEvents[curr_date] = {};*/

    for (i = 0; i < date_events.length ;i++) {
        var elem_date = date_events[i].getAttribute('value');
        var events_element = date_events[i].getElementsByTagName("title");
        totalEvents[elem_date] = {"number": events_element.length};
        /*totalEvents.push({
            [elem_date]: {"number": events_element.length}
        });*/
    }
    return totalEvents;
}

function spanishDate(d){
    var weekday=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    var monthname=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return weekday[d.getDay()]+" "+d.getDate()+" de "+monthname[d.getMonth()]+" del "+d.getFullYear()
}


function createHTML(date, events_Obj, div_id) {
    var i;
    var generateHere = document.getElementById(div_id);
    generateHere.innerHTML =  '<hr>' +
        '<h2 class="text-center">' +
        '<small style="font-size:2.25vh" id="date_display"></small></h2><hr>';
    document.getElementById("date_display").innerHTML = spanishDate(date);
    for(i = 0; i < events_Obj.events.length; ++i) {
        // dynamically create elements
        var gen_html = '<h2 style="font-size:3vh" id="event_title_' + i + '"></h2>' +
            '<p  id="event_desc_' + i + '"></p><br>';
        generateHere.innerHTML += gen_html;

        document.getElementById("event_title_" + i).innerHTML = events_Obj.events[i].title;
        document.getElementById("event_desc_"+ i).innerHTML = events_Obj.events[i].description;
    }
}
