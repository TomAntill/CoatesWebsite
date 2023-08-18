import BackendServices from './back-end-services.js';

document.addEventListener("DOMContentLoaded", function () {
    // Get the container element where you want to append the images
    var container = document.getElementById('YourContainerId1');
    // Call the function to fetch images and append them to the container
    BackendServices.get.sendGetRequest('0', '1', undefined, 'YourContainerId1');
  });








  var sendEmail = document.getElementById("sendEmail");
  sendEmail.addEventListener("click", BackendServices.email.sendMessage);


  popup = {
    init: function () {
        $('figure').click(function () {
            popup.open($(this));
        });

        $(document).on('click', '.popup img', function () {
            return false;
        }).on('click', '.popup', function () {
            popup.close();
        })
    },
    open: function ($figure) {
        $('.gallery').addClass('pop');
        $popup = $('<div class="popup" />').appendTo($('body'));
        $fig = $figure.clone().appendTo($('.popup'));
        $bg = $('<div class="bg" />').appendTo($('.popup'));
        $close = $('<div class="close"><svg><use xlink:href="#close"></use></svg></div>').appendTo($fig);
        $shadow = $('<div class="shadow" />').appendTo($fig);
        src = $('img', $fig).attr('src');
        $shadow.css({ backgroundImage: 'url(' + src + ')' });
        $bg.css({ backgroundImage: 'url(' + src + ')' });
        setTimeout(function () {
            $('.popup').addClass('pop');
        }, 10);
    },
    close: function () {
        $('.gallery, .popup').removeClass('pop');
        setTimeout(function () {
            $('.popup').remove()
        }, 100);
    }
}

popup.init()

window.onscroll = function () { didtheyscroll() };

function didtheyscroll() {
    if ($(document).scrollTop() > 50) {
        $('.img-overridable-bg-hdnle').removeClass('img-overridable-bg');
    }

    if ($(document).scrollTop() < 50) {
        $('.img-overridable-bg-hdnle').addClass('img-overridable-bg');
    }
}