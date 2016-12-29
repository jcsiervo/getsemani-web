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
        events: [{ title: "No Events!",
            start : "",
            end : "",
            description : ""}]
    };

    var date_events = xmlDoc.getElementsByTagName("date");
    if ((date_events.length > 0) && mostRecent)
    {
        var events_for_date = date_events[0].getElementsByTagName("title");
        eventObject.date = date_events[0].getAttribute('value');

        // Remove empty element
        eventObject.events.pop();
        for (i = 0; i < events_for_date.length ;i++) {
            eventObject.events.push({
                title: events_for_date[i].getAttribute("value"),
                start : events_for_date[i].getElementsByTagName("startTime")[0].childNodes[0].nodeValue,
                end : events_for_date[i].getElementsByTagName("endTime")[0].childNodes[0].nodeValue,
                description : events_for_date[i].getElementsByTagName("description")[0].childNodes[0].nodeValue
            });
        }
        return eventObject;
    }

    for (i = 0; i < date_events.length ;i++)
    {
        var elem_date = date_events[i].getAttribute('value');

        if (elem_date == date)
        {
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

function spanishDate(d){
    var weekday=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    var monthname=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return weekday[d.getDay()]+" "+d.getDate()+" del "+monthname[d.getMonth()]+" de "+d.getFullYear()
}