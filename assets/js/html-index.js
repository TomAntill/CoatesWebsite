import BackendServices from './back-end-services.js';

  var sendEmail = document.getElementById("sendEmail");
  sendEmail.addEventListener("click", BackendServices.email.sendMessage);

  var popup = {
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

const imageContainer = document.getElementById('imageContainer');

BackendServices.get.sendGetRequest('0', undefined, undefined)
  .then(images => {
    images.forEach(image => {
      const categoryNames = {
        0: 'BespokeCarpentry',
        1: 'ConcreteTops',
        2: 'Furniture',
        3: 'None'
      };
      
      const categoryClassName = categoryNames[image.pictureCategory];
      
      const portfolioItem = document.createElement('div');
      portfolioItem.className = `col-lg-4 col-md-6 portfolio-item filter-${categoryClassName}`;

      portfolioItem.classList.add('portfolio-item'); 

      const portfolioContent = document.createElement('div');
      portfolioContent.className = 'portfolio-content h-100';

      const imgElement = document.createElement('img');
      imgElement.src = image.url;
      imgElement.className = 'img-fluid';

      const portfolioInfo = document.createElement('div');
      portfolioInfo.className = 'portfolio-info';
      
      const previewLink = document.createElement('a');
      previewLink.href = image.url; 
      previewLink.title = image.pictureCategory; 
      previewLink.setAttribute('data-gallery', `portfolio-gallery-${image.pictureCategory}`);

      const zoomIcon = document.createElement('i');
      zoomIcon.className = 'bi bi-zoom-in';
      previewLink.appendChild(zoomIcon);

      portfolioInfo.appendChild(previewLink);
      portfolioContent.appendChild(imgElement);
      portfolioContent.appendChild(portfolioInfo);
      portfolioItem.appendChild(portfolioContent);

      imageContainer.appendChild(portfolioItem);
      console.log(image);
    });
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });

  const filterButtons = document.querySelectorAll('.portfolio-flters a');

  filterButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const filterValue = button.getAttribute('data-filter');
      const portfolioItems = document.querySelectorAll('.portfolio-item');
  
      portfolioItems.forEach(item => {
        item.style.display = 'none';
        if (item.classList.contains(filterValue) || filterValue === '*') {
          item.style.display = 'block';
        }
      });
    });
  });

