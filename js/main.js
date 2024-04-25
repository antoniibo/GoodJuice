
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

    // Function to translate the page
    function translatePage(language, translationData) {
      const htmlTag = document.documentElement; // Get the <html> element
  
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
  const htmlTag = document.documentElement; // Get the <html> element

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


//juices desccription toogle
document.addEventListener("DOMContentLoaded", function() {
    const descriptions = document.querySelectorAll('.product-description');
    const images = document.querySelectorAll('#products img');
    let prevActiveIndex = 0; 

    // Make the first description and image active by default
    descriptions[0].style.display = 'block';
    images[0].classList.add('active');

    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            // Shrink the previous active image
            if (prevActiveIndex !== index) {
                const prevImg = images[prevActiveIndex];
                prevImg.classList.add('shrink');
                prevImg.addEventListener('animationend', function() {
                    this.classList.remove('active', 'shrink');
                }, { once: true }); // The { once: true } option auto-removes the event listener after it's invoked
            }

            // Delay the grow animation for the new active image
            setTimeout(() => {
                img.classList.add('active');
                descriptions.forEach((description) => {
                    description.style.display = 'none';
                });
                descriptions[index].style.display = 'block';;
            }, 500); // This delay allows the shrink animation to complete

            prevActiveIndex = index;
        });
    });
});


//Mobile nav toogle 
const navBtn = document.querySelector('.nav-btn');
const navOptions = document.querySelector('.nav-options');
const mobileBurger = document.querySelector('.mobile-burger'); 
navBtn.addEventListener('click', toggleMenu);

// toggle menu
function toggleMenu() {
  navOptions.classList.toggle('open');
  mobileBurger.classList.toggle('open');
  navOptions.style.display = navOptions.classList.contains('open') ? 'block' : 'none';
  toggleIcon();
}

// toggle icon
function toggleIcon() {
  const icon = navBtn.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
}

// page listener
document.addEventListener('click', function(event) {
  const isClickInsideNav = mobileBurger.contains(event.target);
  
  if (!isClickInsideNav && navOptions.classList.contains('open')) {
    toggleMenu();
  }
});

// close trough atribute 'a' or 'i'
document.addEventListener('click', function(event) {
  if (event.target.tagName === 'A') {
    if (navOptions.classList.contains('open')) {
      toggleMenu();
    }
  }
});

// 
navBtn.addEventListener('click', function(event) {
  event.stopPropagation();
});