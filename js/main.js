
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
  let mobileIndex = 1;
  let startX;

  function updateCarousel() {
      const fragment = document.createDocumentFragment();
      let leftIndex = (mobileIndex - 1 + items.length) % items.length;
      let rightIndex = (mobileIndex + 1) % items.length;

      fragment.appendChild(items[leftIndex]);
      fragment.appendChild(items[mobileIndex]);
      fragment.appendChild(items[rightIndex]);


      carousel.innerHTML = '';
      carousel.appendChild(fragment);

      items.forEach(item => {
          item.classList.remove('active');
          const activeImage = item.querySelector('img');
          if (activeImage) {
              activeImage.classList.remove('active');
          }
      });

      items[mobileIndex].classList.add('active');
      const descriptions = document.querySelectorAll('.product-description');
      descriptions.forEach((description) => description.style.display = 'none');
      descriptions[mobileIndex].style.display = 'block';
      descriptions[mobileIndex].classList.add('swoop-in');
      const activeItem = items[mobileIndex];
      const activeImage = activeItem.querySelector('img');
      if (activeImage) {
          activeImage.classList.add('active');
      }
  }

  carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) {
          mobileIndex = (mobileIndex + 1) % items.length;
          updateCarousel();
      } else if (endX - startX > 50) {
          mobileIndex = (mobileIndex - 1 + items.length) % items.length;
          updateCarousel();
      }
  });

  updateCarousel();
  document.getElementById('prevBtn').addEventListener('click', function() {
    mobileIndex = (mobileIndex - 1 + items.length) % items.length;
    updateCarousel();
  });

  document.getElementById('nextBtn').addEventListener('click', function() {
    mobileIndex = (mobileIndex + 1) % items.length;
    updateCarousel();
  });
}

//Toggle juices desktop
let currentIndex = 0;
function setupDesktop() {
  const container = document.getElementById('products');
  const descriptions = document.querySelectorAll('.product-description');
  const images = document.querySelectorAll('#products img');
  let prevActiveIndex = currentIndex; 

  images.forEach((img, index) => {
    img.classList.remove('active');
    descriptions[index].style.display = 'none';
  });
  images[currentIndex].classList.add('active');
  descriptions[currentIndex].style.display = 'block';
  
  container.addEventListener('click', function(e) {
    const img = e.target.closest('img');
    if (img) {
      const index = Array.from(images).indexOf(img);
      if (prevActiveIndex !== index) {
        images[prevActiveIndex].classList.remove('active');
        descriptions[prevActiveIndex].style.display = 'none';
        
        img.classList.add('active');
        descriptions[index].style.display = 'block';
        
        currentIndex = index; 
        prevActiveIndex = index; 
      }
    }
  });

  // Initially show first description and image
  descriptions[currentIndex].style.display = 'block';
  images[currentIndex].classList.add('active');
}

// checking the screen with and swooping functions
function setup() {
  const mediaQuery = window.matchMedia('(max-width: 950px)');
  let isMobileView = mediaQuery.matches;

  function checkScreenWidth() {
      const currentViewIsMobile = mediaQuery.matches;
      if (currentViewIsMobile) {
          setupMobile();
      } else {
          setupDesktop();
      }
      if (isMobileView !== currentViewIsMobile) {
          window.location.reload();
          return; 
      }
      isMobileView = currentViewIsMobile;
  }
  mediaQuery.addListener(checkScreenWidth);

  checkScreenWidth();
}

document.addEventListener('DOMContentLoaded', setup);

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