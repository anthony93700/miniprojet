var aleat = 0;
var r = null;
var compteur = 10;
var traduction = "";
var file;
var compteur2 = 0;
var e = "";



function charger(length) {
    $('#reponse').html('');
    aleat = Math.round(Math.random() * length == 0 ? Math.random() * length : Math.random() * length - 1);
    o = r[aleat];
    $('#r').html('<p>le mot en francais: ' + o + '</p>');

}

function genererE() {

    
    $.getJSON('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160225T134033Z.963acb68732f7f63.3eaa07b057e27288e6b062e379e2121dabfe62da&text=' + o + '&lang=fr-en', function(donnees) {
        traduction = donnees.text;

        


    }).done(function() {
        $('#reponse').css("display", "block");
        $('#envoyer').get(0).type = "submit";
        $('#reponse').html('<div id="s0"></div>');
        $('#s0').text(traduction.toString().substring(0, 1));
       
        for (i = 1; i < traduction.toString().length; i++)
            $('#reponse').append('<div contenteditable="true" id="s' + i + '"class="edit"></div>');
        $(function() {
            $('.edit').keyup(function(touche) {
                var appui = touche.which || touche.keyCode;

                if (appui != 9)
                    $(this).attr("contenteditable", "false");
            });
        });
        $(function() {
            $('.edit').click(function() {
                $(this).attr("contenteditable", "true");
                $(this).text("");
            });
        });
    });

}
$(function() {
    $('#charger').click(function() {
        charger(r.length);
        genererE();


    });
});
window.onload = function() {

    var f = document.getElementById('file');
    res = document.getElementById('r');
    f.onchange = function() {
        file = f.files[0];
        fr = new FileReader();

        fr.onprogress = function() {
            res.innerHTML = 'Chargement...';
        };
        fr.onerror = function() {
            res.innerHTML = 'Oups, une erreur s\'est produite...';
        };
        fr.onload = function() {
            res.innerHTML = '';
            f = fr.result;
            r = f.split('\n');

            charger(r.length);
            genererE();
        };
        fr.readAsText(file);


    };
};



$(function() {
    $('#envoyer').click(function() {
        e = "";
        for (i = 0; i < traduction.toString().length; i++)
            e += $('#s' + i + '').text();

        if (e == traduction) {
            compteur2++;
            $('#parfait').text('vous avez gagnez.il vous reste ' + compteur + ' vie et gagnez ' + compteur2 + 'parties');
            charger(r.length);
            genererE();

        } else {
            compteur--;

            $('#parfait').text("vous avez " + compteur + " vie et gagnez " + compteur2 + " parties");
            if (compteur == 0) {
                $('.main').html('<p>Vous avez perdu!!!!</p><a href="index.html" >rejouer?</a>');
            }
        }


    });
});
