// html5media enables <video> and <audio> tags in all major browsers
// Information on player at: http://jonhall.info/how_to/create_a_playlist_for_html5_audio

// Add user agent as an attribute on the <html> tag...
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

function getAudioFiles(xml) {
    var plist = [];
    var xmlDoc = xml.responseXML;

    var predicas = xmlDoc.getElementsByTagName("filename");
    for (var i = 0; i < predicas.length ;i++) {
        plist.push({
            "track":   (i+1),
            "name" :   predicas[i].getElementsByTagName("displayname")[0].childNodes[0].nodeValue,
            "length":  predicas[i].getElementsByTagName("length")[0].childNodes[0].nodeValue,
            "file" :   predicas[i].getAttribute('value')
        });
    }
    return plist;
}

function readPredicasXML()
{
    var plist = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            plist = getAudioFiles(this);
        }
    };
    xhttp.open("GET", "media/predicaciones.xml", false);
    xhttp.send();
    return plist;
}

// HTML5 audio player + playlist controls...
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'media/Predicaciones/',
            extension = '',
            tracks = readPredicasXML(),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
            if(audio.canPlayType('audio/ogg')) {
                extension = '.ogg';
            }
            if(audio.canPlayType('audio/mpeg')) {
                extension = '.mp3';
            }
            loadTrack(index);
    }
});

