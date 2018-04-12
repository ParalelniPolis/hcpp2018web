  // Track newsletter form submit
  var newsletterForm = document.getElementById('newsletterForm');
  if (!!newsletterForm) {
    newsletterForm.addEventListener('submit', function() {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Newsletter',
        eventAction: 'subscribe',
        transport: 'beacon'
      });
    }, false);
  }

  // Track main navigation clicks
  var navLinks = document.querySelectorAll('.nav a') || [];
  Array.prototype.forEach.call(navLinks, function(navLink) {
    navLink.addEventListener('click', function(event) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Navigation',
        eventAction: 'click',
        eventLabel: navLink.textContent
      });
    }, false);
  });

  // Track footer navigation clicks
  var footerNavLinks = document.querySelectorAll('.footer-nav a') || [];
  Array.prototype.forEach.call(footerNavLinks, function(footerNavLink) {
    footerNavLink.addEventListener('click', function(event) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Navigation',
        eventAction: 'click',
        eventLabel: footerNavLink.textContent
      });
    }, false);
  });

  // Track ticket click
  var ticketLinks = document.querySelectorAll('.js-shop-link') || [];
  Array.prototype.forEach.call(ticketLinks, function(ticketLink) {
    ticketLink.addEventListener('click', function(event) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Tickets',
        eventAction: 'click',
        eventLabel: ticketLink.textContent,
        transport: 'beacon'
      });
    });
  });

  // Track speaker click
  var speakerItems = document.querySelectorAll('.speaker-item') || [];
  Array.prototype.forEach.call(speakerItems, function(speakerItem) {
    speakerItem.addEventListener('click', function(event) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Speakers',
        eventAction: 'click',
        eventLabel: speakerItem.querySelector('.speaker-accent').textContent
      });
    }, false);
  });

  // Track open more Speakers
  var seeMore = document.querySelector('.see-more');
  if(!!seeMore) {
    seeMore.addEventListener('click', function() {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Speakers',
        eventAction: 'open'
      }, false);
    });
  }
