function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

$('.speaker-item [data-toggle="modal"]').on('click', function(event) {
  event.preventDefault();
  if (this.getAttribute('data-target')) {
    window.location.hash = this.getAttribute('data-target');
  }
});

$('#newsletterForm').on('submit', function(event) {
  event.preventDefault();

  var form = this;
  var formAction = this.getAttribute('action') || '/subscribe';
  var formMethod = this.getAttribute('method') || 'POST';

  var formData = new FormData(this);

  formData.append('type', 'fetch');

  fetch(formAction, {
    method: formMethod,
    body: formData
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    $(form).before('<div class="subtitle white text-center">' + data.subscribeMsg + '</div>');
    $(form).remove();
  })
  .catch(function(error) {
    $(form).before('<div class="subtitle white text-center">There was error subscribing user</div>');
    $(form).remove();
    throw new Error('There was error subscribing user' + error);
  })
});

$('#contactForm').on('submit', function(event) {
  event.preventDefault();

  var form = this;
  var formAction = this.getAttribute('action') || '/contact';
  var formMethod = this.getAttribute('method') || 'POST';

  var formData = new FormData(this);

  formData.append('type', 'fetch');

  fetch(formAction, {
    method: formMethod,
    body: formData
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    $(form).before('<div class="subtitle text-center">' + data.contactFormMsg + '</div>');
    $(form).remove();
  })
  .catch(function(error) {
    $(form).before('<div class="subtitle text-center">There was error sending email</div>');
    $(form).remove();
    throw new Error('There was error subscribing user' + error);
  })
});

$('.page-scroll').on('click', function(event) {
  var hash = $(this).attr('href').replace('/', '');

  if($(hash).length > 0) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000, function() {
      window.location.hash = hash;
    });
  }
});

$('.see-more').on('click', function() {
  $('.container-expand').slideDown();
  $('.see-more').fadeOut();
});

$(window).on('load', function() {
  if (window.location.search.indexOf('?subscribe') > -1) {
    var hash = '#newsletter';

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000, function() {
      window.location.hash = hash;
    });
  }

  if (window.location.hash.indexOf('speaker_') > -1) {
    $('html, body').animate({
      scrollTop: $(window.location.hash).offset().top
    }, 1000, function() {
      $(document).find('.speaker-item [data-toggle="modal"][data-target="' + window.location.hash + '"]').click();
    });
  }

  var lazyImages = document.querySelectorAll('[data-lazy]');
  Array.prototype.forEach.call(lazyImages, function(img) {
    var imageUrl = img.getAttribute('data-lazy');
    var image = new Image();

    image.src = imageUrl;
    image.onload = function() {
      img.setAttribute('src', imageUrl);
    }
  });
});
