$(document).ready(function() {
  // Function to show the notification
  function showPurchaseNotification() {
    $('.purchase-notification').show('slide', { direction: 'left' }, 500);
  }

  // Simulate purchase button click
  $('#purchase-notification-btn').click(function() {
    showPurchaseNotification();
  });

  // Function to hide the notification
  $('.purchase-notification__close').click(function() {
    $('.purchase-notification').hide('slide', { direction: 'left' }, 500);
  });

  // Countdown Timer Function
  function startCountdown(duration, display) {
    let timer = duration, minutes, seconds;
    const interval = setInterval(function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.text(minutes + ":" + seconds);

      if (--timer < 0) {
        clearInterval(interval);
        // Optional: Add any action to perform when the countdown ends
      }
    }, 1000);
  }

  // Initialize the countdown
  const countdownDuration = 9 * 60 + 41; // 9 minutes and 41 seconds
  const display = $('#timer');
  startCountdown(countdownDuration, display);

  // Initial stock count
  let stockCount = 55;
  const stockCountElement = $('#stock-count');
  const stockBarFillElement = $('#stock-bar-fill');

  function updateStock() {
    if (stockCount > 0) {
      stockCount--;
      stockCountElement.text(stockCount);
      const fillWidth = (stockCount / 55) * 100; // Calculate fill width percentage
      stockBarFillElement.css('width', fillWidth + '%');


    }
  }

  // Simulate stock decrement every 30 seconds
  setInterval(updateStock, 30000);
});

// Show popup
// $(document).ready(function() {
//   // Show popup after 10 seconds
//   setTimeout(function() {
//     $('.show-popup').fadeIn(100);
//   }, 10000);

//   // Close popup
//   $('.show-popup__close').click(function() {
//     $('.show-popup').fadeOut(100);
//   });
// });

$(document).ready(function() {
  $('.toggle-label').click(function() {
    $('.summary-content').slideToggle();
    $('.arrow-icon').toggleClass('rotated');
  });

  // Initialize main slider
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    infinite: false,
    asNavFor: '.slider-nav'
  });

  // Initialize thumbnail slider
  $('.slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    infinite: false,
    centerMode: false,
    focusOnSelect: true,
    vertical: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          vertical: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          vertical: false
        }
      }
    ]
  });

  // Initialize intl-tel-input with country codes enabled
  const input = document.querySelector("#phone");

  window.intlTelInput(input, {
    initialCountry: "auto",  // Automatically detect user's country
    geoIpLookup: function(callback) {
      fetch("https://ipinfo.io/json?token=f9b49ccec50bf0") // Replace YOUR_IPINFO_TOKEN
        .then((response) => response.json())
        .then((data) => callback(data.country))
        .catch(() => callback("us"));
    },
    separateDialCode: true,  // Shows country code separately in input field
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.1.8/js/utils.js",
  });

  document.querySelector('.complete-order').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    // List of input fields to validate
    const fieldsToValidate = [
      { id: 'first-name-error', input: 'input[name="first-name"]' },
      { id: 'last-name-error', input: 'input[name="last-name"]' },
      { id: 'email-error', input: 'input[name="email"]' },
      { id: 'phone-error', input: '#phone' },
      { id: 'country-error', input: 'select[name="country"]' },
      { id: 'address-error', input: 'input[name="address"]' },
      { id: 'city-error', input: 'input[name="city"]' },
      { id: 'state-error', input: '#state-select' },
      { id: 'zip-error', input: 'input[name="zip"]' },
      { id: 'card-number-error', input: 'input[name="card-number"]' },
      { id: 'expiration-error', input: 'input[name="expiration-date"]' },
      { id: 'security-code-error', input: 'input[name="security-code"]' }
    ];

    let hasError = false;
    const formData = {};

    fieldsToValidate.forEach(field => {
      const inputElement = document.querySelector(field.input);
      const errorElement = document.getElementById(field.id);

      if (!inputElement.value.trim()) {
        showError(field.id);
        inputElement.style.borderColor = '#ED4C5C'; // Set error border color
        hasError = true;
        if (field.id === 'card-number-error') {
          const cardNumber = document.getElementById('card-number');
          if (cardNumber) {
            cardNumber.style.borderColor = '#ED4C5C';
          }
        }
        if (field.id === 'expiration-error') {
          const expirationDate = document.getElementById('expiration-date');
          if (expirationDate) {
            expirationDate.style.borderColor = '#ED4C5C';
          }
        }
        if (field.id === 'security-code-error') {
          const securityCode = document.getElementById('security-code');
          if (securityCode) {
            securityCode.style.borderColor = '#ED4C5C';
          }
        }
      } else {
        hideError(field.id);
        inputElement.style.borderColor = ''; // Reset border color
        formData[field.input] = inputElement.value; // Collect form data
      }
    });

    if (!hasError) {
      // Log form data to the console
      console.log('Form Data:', formData);
    }
  });

  function showError(id) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
      errorElement.style.opacity = '1';
    }
  }

  function hideError(id) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
      errorElement.style.opacity = '0';
    }
  }

  // Phone input floating label handling
  const phoneInput = document.getElementById('phone');
  const floatingLabel = document.querySelector('.input-container-phone .floating-label');

  function updateFloatingLabel() {
    const isMobile = window.innerWidth <= 768;
    if (phoneInput.value || document.activeElement === phoneInput) {
      floatingLabel.style.top = '10px';
      floatingLabel.style.fontSize = isMobile ? '10px' : '12px';
    } else {
      floatingLabel.style.top = '36%';
      floatingLabel.style.fontSize = '';
      floatingLabel.style.color = '';
    }
  }

  phoneInput.addEventListener('focus', updateFloatingLabel);
  phoneInput.addEventListener('blur', updateFloatingLabel);
  window.addEventListener('resize', updateFloatingLabel);
  updateFloatingLabel(); // Initial check

  // Marquee functionality
  function startMarquee(container, direction) {
    const $container = $(container);
    const scrollHeight = $container[0].scrollHeight / 2;
    let scrollAmount = direction === 'up' ? scrollHeight : 0;

    $container.append($container.html());

    function scroll() {
      if (direction === 'up') {
        scrollAmount -= 1;
        if (scrollAmount <= 0) {
          scrollAmount = scrollHeight;
        }
      } else {
        scrollAmount += 1;
        if (scrollAmount >= scrollHeight) {
          scrollAmount = 0;
        }
      }
      $container.scrollTop(scrollAmount);
      requestAnimationFrame(scroll);
    }

    scroll();
  }

  startMarquee('.marqueeTop', 'down');
  startMarquee('.marqueeBottom', 'up');
});