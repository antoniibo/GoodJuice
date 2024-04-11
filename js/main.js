//langauge toogle
const langBtn = document.querySelector('.lang-btn');
const langOptions = document.querySelector('.lang-options');
const languageDropdown = document.querySelector('.language-dropdown'); 
const defaultLanguage = 'Eng';

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
        langOptions.classList.remove('closed');
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
        }, 500); 
      });
    });

    // Function to translate the page
    function translatePage(language, translationData) {
        if (translationData[language]) { 
          document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translationData[language][key]) { 
              el.textContent = translationData[language][key];
            } else {
              console.error(`Translation key '${key}' not found for language '${language}'`);
            }
          });
        } else {
          console.error(`Language '${language}' not found in translation data`);
        }
    }
});

//juices desccription toogle
document.addEventListener("DOMContentLoaded", function() {
    const descriptions = document.querySelectorAll('.product-description');

    descriptions[0].style.display = 'block'; // Display the first description by default

    document.querySelectorAll('#products img').forEach((img, index) => {
        img.addEventListener('click', function() {
            // Remove 'active' class from all images
            document.querySelectorAll('#products img').forEach((img) => {
                img.classList.remove('active');
            });
            // Add 'active' class to the clicked image
            img.classList.add('active');

            // Hide all descriptions
            descriptions.forEach((description) => {
                description.style.display = 'none';
            });
            // Display the description corresponding to the clicked image
            descriptions[index].style.display = 'block';
        });
    });
});
