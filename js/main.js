// Dropdown toggle
const langBtn = document.querySelector('.lang-btn');
const langOptions = document.querySelector('.lang-options');
const languageDropdown = document.querySelector('.language-dropdown');

langBtn.addEventListener('click', () => {
  langOptions.classList.toggle('open'); // Toggle open class on click
  languageDropdown.classList.toggle('open');
  
  // Toggle display property between 'none' and 'block'
  if (langOptions.classList.contains('open')) {
    langOptions.style.display = 'block';
  } else {
    langOptions.style.display = 'none';
  }
});