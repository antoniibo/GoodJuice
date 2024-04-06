const langBtn = document.querySelector('.lang-btn');
const langOptions = document.querySelector('.lang-options');
const languageDropdown = document.querySelector('.language-dropdown');
const currentLang = localStorage.getItem('lang') || 'eng'; 

// Function to fetch translations from JSON file
async function fetchTranslations() {
  try {
    const response = await fetch('../js/translations.json');
    const translations = await response.json();
    return translations;
  } catch (error) {
    console.error('Error fetching translations:', error);
  }
}

// Function to translate the content
async function translateContent(lang) {
    try {
      const translations = await fetchTranslations();
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = translations[lang][key];
      });
      // Update localStorage with the current language
      localStorage.setItem('lang', lang);
    } catch (error) {
      console.error('Error fetching translations:', error);
      // Handle the error here, like displaying an error message to the user
    }
  }

// Event listener for language button click
langBtn.addEventListener('click', () => {
  langOptions.classList.toggle('open');
  languageDropdown.classList.toggle('open');
  
  // Toggle display property between 'none' and 'block'
  if (langOptions.classList.contains('open')) {
    langOptions.style.display = 'block';
  } else {
    langOptions.style.display = 'none';
  }
});

// Event listener for language option click
const langLinks = document.querySelectorAll('.lang-options li a');
langLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    const lang = link.textContent.toLowerCase();
    translateContent(lang); // Translate content
    langOptions.classList.remove('open'); // Close dropdown
  });
});

// Initial translation on page load
translateContent(currentLang);