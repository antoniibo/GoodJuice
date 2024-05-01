
// Fetch translation data
fetch('../js/translations.json')
  .then(response => response.json())
  .then(data => {
    const langBtn = document.querySelector('.lang-btn');
    const langOptions = document.querySelector('.lang-options');
    const languageDropdown = document.querySelector('.language-dropdown'); 
    const defaultLanguage = 'Eng';

    // Set default language text near the language button icon
    langBtn.innerHTML = `<i class="fa-solid fa-caret-right"></i> ${defaultLanguage}`;

    // Event listener for language button click
    langBtn.addEventListener('click', () => {
      langOptions.classList.toggle('open');
      languageDropdown.classList.toggle('open');
      
      // Toggle display property between 'none' and 'block'
      langOptions.style.display = langOptions.classList.contains('open') ? 'block' : 'none';
    });

    // Event listener for language option click
    const langLinks = document.querySelectorAll('.lang-options li a');
    langLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); 
        const selectedLanguage = link.textContent.trim(); 
        langBtn.innerHTML = `<i class="fa-solid fa-caret-right"></i> ${selectedLanguage}`; 
        translatePage(selectedLanguage.toLowerCase(), data); 
        langOptions.classList.add('closed'); 
        setTimeout(() => {
          langOptions.classList.remove('open'); 
          languageDropdown.classList.remove('open');
          langOptions.style.display = langOptions.classList.contains('open') ? 'block' : 'none';
        }, 500); 
      });
    });
    //close dropdown 
    document.addEventListener('click', function(event) {
      if (!langOptions.contains(event.target) && !langBtn.contains(event.target)) {
        langOptions.classList.remove('open');
        languageDropdown.classList.remove('open');
        langOptions.style.display = 'none';
      }
    });

    // Function to translate the page
    function translatePage(language, translationData) {
      const htmlTag = document.documentElement; 
  
      if (translationData[language]) { 
          document.querySelectorAll('[data-i18n]').forEach(el => {
              const key = el.getAttribute('data-i18n');
              if (translationData[language][key]) { 
                  el.textContent = translationData[language][key];
              } else {
                  console.error(`Translation key '${key}' not found for language '${language}'`);
              }
          });
  
          // Update the lang attribute of the <html> tag
          if (language === 'eng') {
              htmlTag.setAttribute('lang', 'en');
          } else if (language === 'ua') {
              htmlTag.setAttribute('lang', 'uk');
          }
      } else {
          console.error(`Language '${language}' not found in translation data`);
      }
  }
});
// Function to translate the page and update the lang attribute
function translatePage(language, translationData) {
  const htmlTag = document.documentElement; 

  if (translationData[language]) { 
      document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (translationData[language][key]) { 
              el.textContent = translationData[language][key];
          } else {
              console.error(`Translation key '${key}' not found for language '${language}'`);
          }
      });

      // Update the lang attribute of the <html> tag
      if (language === 'eng') {
          htmlTag.setAttribute('lang', 'en');
      } else if (language === 'ua') {
          htmlTag.setAttribute('lang', 'uk');
      }
  } else {
      console.error(`Language '${language}' not found in translation data`);
  }
}
//Juices toogle

//Toggle jucies mobile
function setupMobile() {
  const carousel = document.getElementById('carousel');
  const items = Array.from(carousel.children);
  let currentIndex = 1; 

  function updateCarousel() {
    // Clear the current content of the carousel
    carousel.innerHTML = '';

    // Calculate index of elements
    let leftIndex = (currentIndex - 1 + items.length) % items.length;
    let rightIndex = (currentIndex + 1) % items.length;

    // Append elements in the correct order
    carousel.appendChild(items[leftIndex]);
    carousel.appendChild(items[currentIndex]);
    carousel.appendChild(items[rightIndex]);

    // Update classes for opacity and scale
    items.forEach(item => {
      item.classList.remove('active'); 
      const activeImage = item.querySelector('img');
      if (activeImage) {
        activeImage.classList.remove('active'); 
      }
    });
    items[currentIndex].classList.add('active');

    // Update descriptions (mobile version)
    const descriptions = document.querySelectorAll('.product-description');
    descriptions.forEach((description) => description.style.display = 'none');
    descriptions[currentIndex].style.display = 'block';

    // Add swooping animation for descriptions (mobile version - optional)
    descriptions[currentIndex].classList.add('swoop-in'); 

    // Find the image inside the active list item (li)
    const activeItem = items[currentIndex];
    const activeImage = activeItem.querySelector('img'); 
    if (activeImage) {
      activeImage.classList.add('active'); 
    }
  }


  updateCarousel();

  document.getElementById('prevBtn').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  });

  document.getElementById('nextBtn').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  });
}

//Toggle juices desktop
function setupDesktop() {
    const descriptions = document.querySelectorAll('.product-description');
    const images = document.querySelectorAll('#products img');
    let prevActiveIndex = 0;

    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            if (prevActiveIndex !== index) {
                const prevImg = images[prevActiveIndex];
                prevImg.classList.add('shrink');
                prevImg.addEventListener('animationend', function() {
                    this.classList.remove('active', 'shrink');
                }, { once: true });
            }

            setTimeout(() => {
                img.classList.add('active');
                descriptions.forEach((description) => {
                    description.style.display = 'none';
                });
                descriptions[index].style.display = 'block';
            }, 500);

            prevActiveIndex = index;
        });
    });

    // Initially show first description and image
    descriptions[0].style.display = 'block';
    images[0].classList.add('active');
}

// tracker of the center of the carousel
function centerCarousel() {
  const carousel = document.getElementById('carousel');
  const items = carousel.querySelectorAll('li');
  const carouselWidth = carousel.offsetWidth;
  const itemWidth = items[0].offsetWidth;
  const scrollPosition = (items.length * itemWidth - carouselWidth) / 2;
  carousel.scrollLeft = scrollPosition + itemWidth / 4;
} 

let isMobileView = window.innerWidth < 950;

function checkScreenWidth() {
    const mediaQuery = window.matchMedia('(max-width: 950px)');
    const currentView = window.innerWidth < 950;

    if (mediaQuery.matches) {
        setupMobile();
        centerCarousel();
    } else {
        setupDesktop();
    }
    if (isMobileView !== currentView) {
      location.reload();
  }
}

window.addEventListener('resize', checkScreenWidth);
document.addEventListener('DOMContentLoaded', checkScreenWidth);

// block scrolling of the carousel
const carousel = document.getElementById('carousel');
carousel.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });

// page listener
// document.addEventListener('click', function(event) {
//   const isClickInsideNav = mobileBurger.contains(event.target);
  
//   if (!isClickInsideNav && navOptions.classList.contains('open')) {
//     toggleMenu();
//   }
// });

// Mobile nav toggle
const navBtn = document.querySelector('.nav-btn');
const navOptions = document.querySelector('.nav-options');
const mobileBurger = document.querySelector('.mobile-burger'); 

// Toggle menu
function toggleMenu() {
  navOptions.classList.toggle('open');
  mobileBurger.classList.toggle('open');
  toggleIcon();
}

// Toggle icon
function toggleIcon() {
  const icon = navBtn.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
}

// Event listener for nav button
navBtn.addEventListener('click', function(event) {
  event.stopPropagation(); 
  toggleMenu();
});

// Close menu when clicking on a link or outside the menu
document.addEventListener('click', function(event) {
  const isClickInsideNav = mobileBurger.contains(event.target);

  // if (!isClickInsideNav) {
  //   if (navOptions.classList.contains('open')) {
  //     toggleMenu();
  //   }
  // }
});

// Close menu when clicking on a link
document.addEventListener('click', function(event) {
  if (event.target.tagName === 'A' && navOptions.classList.contains('open')) {
    toggleMenu();
  }
});