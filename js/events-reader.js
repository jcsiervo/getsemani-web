/**
 * Created by jcsiervo on 12/28/2016.
 */
/**
 * Tries to convert a given XML data to a native JavaScript object by traversing the DOM tree.
 * If a string is given, it first tries to create an XMLDomElement from the given string.
**/

function parseXML(xml, date, mostRecent){
    var x, i;
    var xmlDoc = xml.responseXML;
    var eventObject = {
        date: date,
        title: "No hay eventos para esta fecha",
        group: "",
        description: ""
    };

    x = xmlDoc.getElementsByTagName("event");
    if ((x.length > 0) && (mostRecent))
    {
        eventObject.date = xmlDoc.getElementsByTagName("date")[0].childNodes[0].nodeValue;
        eventObject.title = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        eventObject.group = xmlDoc.getElementsByTagName("group")[0].childNodes[0].nodeValue;
        eventObject.description = xmlDoc.getElementsByTagName("description")[0].childNodes[0].nodeValue;
    }
    for (i = 0; i < x.length ;i++) {
        var elem_date = xmlDoc.getElementsByTagName("date")[i].childNodes[0].nodeValue;
        if (elem_date == date) {
            eventObject.date = xmlDoc.getElementsByTagName("date")[i].childNodes[0].nodeValue;
            eventObject.title = xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue;
            eventObject.group = xmlDoc.getElementsByTagName("group")[i].childNodes[0].nodeValue;
            eventObject.description = xmlDoc.getElementsByTagName("description")[i].childNodes[0].nodeValue;
        }
    }
    return eventObject;
}

function spanishDate(d){
    var weekday=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    var monthname=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return weekday[d.getDay()]+" "+d.getDate()+" del "+monthname[d.getMonth()]+" de "+d.getFullYear()
}