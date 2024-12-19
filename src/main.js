  function showPurchaseNotification() {
    $('.purchase-notification').show('slide', { direction: 'left' }, 500);
    setTimeout(() => {
      $('.purchase-notification').hide('slide', { direction: 'left' }, 500);
    }, 10000);
  }

  // Simulate purchase button click
  $('#purchase-notification-btn').click(function () {
    showPurchaseNotification();
  });

  // Function to hide the notification
  $('.purchase-notification__close').click(function () {
    $('.purchase-notification').hide('slide', { direction: 'left' }, 500);
  });

$(document).ready(function () {
  // Function to show the notification


  // Countdown Timer Function
  function startCountdown(duration, display) {
    let timer = duration, minutes, seconds;
    const interval = setInterval(function () {
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
  const countdownDuration = 10 * 60 + 0; // 9 minutes and 41 seconds
  const display = $('#timer');
  startCountdown(countdownDuration, display);

  // Randomly set initial stock count between 50 and 70
  let stockCount = Math.floor(Math.random() * (70 - 50 + 1)) + 50;
  // Randomly set maximum stock count between 100 and 150
  const maxStockCount = Math.floor(Math.random() * (150 - 100 + 1)) + 100;
  const stockCountElement = $('#stock-count');
  const stockBarFillElement = $('#stock-bar-fill');
  let updateCount = 0; // Track the number of updates

  // Randomly determine the minimum stock to leave between 6 and 8
  const minStockLeft = Math.floor(Math.random() * (8 - 6 + 1)) + 6;

  function updateStock() {
    if (stockCount > minStockLeft) {
      // Determine decrement range based on update count
      const minDecrement = updateCount < 5 ? 5 : 1;
      const maxDecrement = 10;
      const decrement = Math.floor(Math.random() * (maxDecrement - minDecrement + 1)) + minDecrement;

      stockCount = Math.max(stockCount - decrement, minStockLeft); // Ensure stock doesn't go below minStockLeft
      stockCountElement.text(stockCount);
      const fillWidth = ((maxStockCount - stockCount) / maxStockCount) * 100; // Calculate fill width percentage
      stockBarFillElement.css({
        'width': fillWidth + '%',
        'background': 'linear-gradient(90deg, #F8A935 0%, #D90700 43.5%, #1500D1 61.5%)',
        'height': '100%'
      });

      setTimeout(() => {
        stockBarFillElement.css({
          'transition': 'width 5s ease-in-out'
        });
      }, 1000);

      // if (stockCount === minStockLeft) {
      //   alert('Stock is low!');
      // }

      updateCount++; // Increment the update count
    }

    // Schedule the next stock update with a random delay between 10 and 30 seconds
    const randomDelay = Math.floor(Math.random() * (30 - 10 + 1) + 10) * 1000;
    setTimeout(updateStock, randomDelay);
  }

  // Start the first stock update
  updateStock();
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

$(document).ready(function () {
  $('.toggle-label').click(function () {
    const summaryContent = $('.summary-content');
    const orderSummaryContainer = $('.order-summary__container');
    const isMobile = window.innerWidth < 768;
    const marginTopValue = isMobile ? '-62.2px' : '-99.2px';

    if (summaryContent.is(':visible')) {
      // Collapse the summary content
      summaryContent.slideUp(400, function () {
        // Animate margin-top and border-radius after collapsing
        orderSummaryContainer.animate({
          'margin-top': '0px',
          'border-radius': '4px'
        }, 400);
      });
    } else {
      // Animate margin-top and border-radius before expanding
      orderSummaryContainer.animate({
        'margin-top': marginTopValue,
        'border-radius': '4px'
      }, 400, function () {
        // Expand the summary content
        summaryContent.slideDown(400);
      });
    }

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
    geoIpLookup: function (callback) {
      fetch("https://ipinfo.io/json?token=f9b49ccec50bf0") // Replace YOUR_IPINFO_TOKEN
        .then((response) => response.json())
        .then((data) => callback(data.country))
        .catch(() => callback("us"));
    },
    separateDialCode: true,  // Shows country code separately in input field
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.1.8/js/utils.js",
  });

  // Function to validate input fields
  function validateInput(inputElement, errorElementId) {

    const errorElement = document.getElementById(errorElementId);
    // console.log("cardNumberInput", inputElement.name, "Name:", cardNumberInput.name);
    if (!inputElement.value.trim()) {
      showError(errorElementId);
      inputElement.style.borderColor = '#ED4C5C'; // Set error border color
      if (inputElement.name === "card-number") {
        const cardNumberInput = document.getElementById("card-number");
        cardNumberInput.style.borderColor = '#ED4C5C';
      }
      if (inputElement.name === "expiration-date") {
        const cardNumberInput = document.getElementById("expiration-date");
        cardNumberInput.style.borderColor = '#ED4C5C';
      }
      if (inputElement.name === "security-code") {
        const cardNumberInput = document.getElementById("security-code");
        cardNumberInput.style.borderColor = '#ED4C5C';
      }
    } else {
      hideError(errorElementId);
      inputElement.style.borderColor = ''; // Reset border color
      if (inputElement.name === "card-number") {
        const cardNumberInput = document.getElementById("card-number");
        cardNumberInput.style.borderColor = '';
      }
      if (inputElement.name === "expiration-date") {
        const cardNumberInput = document.getElementById("expiration-date");
        cardNumberInput.style.borderColor = '';
      }
      if (inputElement.name === "security-code") {
        const cardNumberInput = document.getElementById("security-code");
        cardNumberInput.style.borderColor = '';
      }
    }
  }

  // Add event listeners for input validation on blur
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

  fieldsToValidate.forEach(field => {
    const inputElement = document.querySelector(field.input);
    inputElement.addEventListener('blur', function () {
      validateInput(inputElement, field.id);
    });
  });

  // Form submission event
  document.querySelector('.complete-order').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    let hasError = false;
    const formData = {};

    fieldsToValidate.forEach(field => {
      const inputElement = document.querySelector(field.input);
      validateInput(inputElement, field.id);
      if (!inputElement.value.trim()) {
        hasError = true;
      } else {
        formData[field.input] = inputElement.value; // Collect form data
      }
    });

    if (!hasError) {
      // Log form data to the console
      console.log('Form Data:', formData);

      // Reset all input fields
      fieldsToValidate.forEach(field => {
        const inputElement = document.querySelector(field.input);
        inputElement.value = ''; // Clear the input field
      });

      // Call the function to show the purchase notification
      showPurchaseNotification();
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
      floatingLabel.style.top = '14px';
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

  // Add event listeners for bundle options
  $('.bundle-options-2__item').click(function () {
    const isSelected = $(this).hasClass('selected');

    // Only proceed if the clicked option is not already selected
    if (!isSelected) {
      // Remove 'selected' class from all options and uncheck all radio buttons
      $('.bundle-options-2__item').removeClass('selected');
      $('.bundle-options-2__item input[type="radio"]').prop('checked', false);

      // Add 'selected' class to the clicked option and check its radio button
      $(this).addClass('selected');
      $(this).find('input[type="radio"]').prop('checked', true);

      // Update order summary
      updateOrderSummary(this);
    }
  });

  const warrantyCheckbox = $('#warranty');
  const warrantyCostPerUnit = 9.99;
  const shippingCost = 9.99;

  // Set default selection to data-bundle="2"
  const defaultOption = $('.bundle-options-2__item[data-bundle="2"]');
  if (defaultOption.length) {
    defaultOption.addClass('selected');
    defaultOption.find('input[type="radio"]').prop('checked', true);
    updateOrderSummary(defaultOption[0]);
  }

  // Add event listener for warranty checkbox
  warrantyCheckbox.change(function () {
    const selectedOption = $('.bundle-options-2__item.selected');
    if (selectedOption.length) {
      updateOrderSummary(selectedOption[0]);
    }
  });

  function updateOrderSummary(option) {
    const $option = $(option);
    const price = parseFloat($option.data('price').replace('$', ''));
    const quantity = parseInt($option.data('product-quantity'), 10);
    let description = $option.data('description');
    const savings = $option.data('savings');
    const originalPrice = $option.data('original');
    const summaryImage = $option.find('.bundle-options-2__item-image img').attr('src');

    // Calculate subtotal
    const subtotal = price * quantity;

    // Calculate total price
    let totalPrice = subtotal + shippingCost;

    // Add warranty cost if checked
    let totalWarrantyCost = 0;
    if (warrantyCheckbox.is(':checked')) {
      totalWarrantyCost = warrantyCostPerUnit * quantity;
      totalPrice += totalWarrantyCost;
     // Append " + Warranty" to the description
    }

    // Update order summary for #order-summary-2
    $('#order-summary-2 .summary-item__title').text(description);
    $('#order-summary-2 .summary-item__price-discount').text(`$${totalPrice.toFixed(2)}`);
    $('#order-summary-2 .order-summary__total-savings p').text(savings);
    $('#order-summary-2 #total-savings').text(savings);
    $('#order-summary-2 .summary-total').text(`$${totalPrice.toFixed(2)}`);
    $('#order-summary-2 .summary-item__image img').attr('src', summaryImage);

    // Update original price
    $('#order-summary-2 .summary-item__price-original').html(`<del>${originalPrice}</del>`);

    // Update subtotal
    $('#order-summary-2 .summary-total-item-price').text(`$${subtotal.toFixed(2)}`);

    // Update total price with shipping
    $('#total-price').text(`$${totalPrice.toFixed(2)}`);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const warrantyCheckbox = document.getElementById('warranty');
  const warrantyCostPerUnit = 9.99;
  const shippingCost = 9.99;

  // Set default selection
  const defaultOption = document.querySelector('.bundle-option[data-bundle="2"]');
  if (defaultOption) {
    updateOrderSummary(defaultOption);
  }

  // Add event listeners for bundle options
  document.querySelectorAll('.bundle-option').forEach(option => {
    option.addEventListener('click', function () {
      const isSelected = this.classList.contains('selected');

      // Only proceed if the clicked option is not already selected
      if (!isSelected) {
        // Remove 'selected' class and image from all options
        document.querySelectorAll('.bundle-option').forEach(opt => {
          opt.classList.remove('selected');
          const button = opt.querySelector('.bundle-option__content-button');
          if (button) {
            const img = button.querySelector('img');
            if (img) {
              img.remove(); // Remove existing image if present
            }
          }
        });

        // Add 'selected' class to the clicked option
        this.classList.add('selected');

        // Add image to the button of the selected option
        const button = this.querySelector('.bundle-option__content-button');
        if (button) {
          const img = document.createElement('img');
          img.src = './src/assets/images/check2.svg';
          img.alt = 'cart';
          button.prepend(img); // Add image to the beginning of the button
        }

        // Update order summary
        updateOrderSummary(this);
      }
    });
  });

  // Add event listener for warranty checkbox
  warrantyCheckbox.addEventListener('change', function () {
    const selectedOption = document.querySelector('.bundle-option.selected');
    if (selectedOption) {
      updateOrderSummary(selectedOption);
    }
  });

  function updateOrderSummary(option) {
    const price = parseFloat(option.getAttribute('data-price').replace('$', ''));
    const quantity = parseInt(option.getAttribute('data-product-quantity'), 10);
    let description = option.getAttribute('data-description');
    const savings = option.getAttribute('data-savings');
    const originalPrice = option.getAttribute('data-original');
    const summaryImage = option.querySelector('.bundle-option__image img').src;

    // Calculate subtotal
    const subtotal = price * quantity;

    // Calculate total price
    let totalPrice = subtotal + shippingCost;

    // Add warranty cost if checked
    let totalWarrantyCost = 0;
    if (warrantyCheckbox.checked) {
      totalWarrantyCost = warrantyCostPerUnit * quantity;
      totalPrice += totalWarrantyCost;
       // Append " + Warranty" to the description
    }

    // Update order summary
    document.querySelector('.summary-item__title').textContent = description;
    document.querySelector('.summary-item__price-discount').textContent = `$${totalPrice.toFixed(2)}`;
    document.querySelector('.order-summary__total-savings p').textContent = savings;
    document.getElementById('total-savings').textContent = `${savings}`;
    document.querySelector('.summary-total').textContent = `$${totalPrice.toFixed(2)}`;
    document.querySelector('.summary-item__image img').src = summaryImage;

    // Update original price
    document.querySelector('.summary-item__price-original').innerHTML = `<del>${originalPrice}</del>`;

    // Update subtotal
    document.querySelector('.summary-total-item-price').textContent = `$${subtotal.toFixed(2)}`;

    // Update total price with shipping
    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
  }
});

// Function to format card number input
function formatCardNumber(inputElement) {
  inputElement.addEventListener('input', function () {
    let value = inputElement.value.replace(/\D/g, ''); // Remove non-digit characters
    value = value.match(/.{1,4}/g)?.join(' ') || ''; // Add space every 4 digits
    inputElement.value = value.substring(0, 19); // Limit to 27 characters (including spaces)
  });
}

// Apply formatting to card number input
const cardNumberInput = document.querySelector('input[name="card-number"]');
formatCardNumber(cardNumberInput);

// Function to format expiration date input
function formatExpirationDate(inputElement) {
  inputElement.addEventListener('input', function () {
    let value = inputElement.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2); // Add slash after two digits
    }
    inputElement.value = value.substring(0, 5); // Limit to 5 characters (MM/YY)
  });
}

// Apply formatting to expiration date input
const expirationDateInput = document.querySelector('input[name="expiration-date"]');
formatExpirationDate(expirationDateInput);

// Function to restrict security code input to four digits
function restrictSecurityCode(inputElement) {
  inputElement.addEventListener('input', function () {
    let value = inputElement.value.replace(/\D/g, ''); // Remove non-digit characters
    inputElement.value = value.substring(0, 4); // Limit to 4 characters
  });
}

// Apply restriction to security code input
const securityCodeInput = document.querySelector('input[name="security-code"]');
restrictSecurityCode(securityCodeInput);

setInterval(() => {
  showPurchaseNotification();
}, 10000);

$(document).ready(function () {
  $('.payment-method__details-item input').each(function () {
    const $input = $(this);
    const $parent = $input.closest('.payment-method__details-item');

    // Add 'active' class if input is focused or not empty
    function toggleActiveClass() {
      if ($input.is(':focus') || $input.val().trim() !== '') {
        $parent.addClass('active');
      } else {
        $parent.removeClass('active');
      }
    }

    // Bind events
    $input.on('focus blur input', toggleActiveClass);

    // Initial check
    toggleActiveClass();
  });
});



