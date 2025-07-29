AOS.init();
// You can also pass an optional settings object
// below listed default settings
AOS.init({

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

// // Listen for a submit
// document.querySelector(".contact-form").addEventListener("submit", submitForm);


const educationSection = document.querySelector('.education-section');
const experienceSection = document.querySelector('.experience-section');
const extraSection = document.querySelector('.extra-section');
const toggleButtons = document.querySelectorAll('.toggle-btn');

// Set default to Experience
experienceSection.style.display = 'block';
educationSection.style.display = 'none';
extraSection.style.display = 'none';

toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.getAttribute('data-toggle') === 'education') {
      educationSection.style.display = 'block';
      experienceSection.style.display = 'none'; // Changed 'gone' to 'none'
      extraSection.style.display = 'none'; // Changed 'gone' to 'none'
    } else if(button.getAttribute('data-toggle') === 'experience'){
      educationSection.style.display = 'none'; // Changed 'gone' to 'none'
      experienceSection.style.display = 'block';
      extraSection.style.display = 'none'; // Changed 'gone' to 'none'
    } else {
      educationSection.style.display = 'none';
      experienceSection.style.display = 'none';
      extraSection.style.display = 'block';
    }
    toggleButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const viewAllButton = document.getElementById("viewAllButton");
  const popup = document.getElementById("popup");
  const closeButton = document.getElementById("closeButton");

  viewAllButton.addEventListener("click", function () {
    popup.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    popup.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const viewAllCertButton = document.getElementById("viewAllCertButton");
  const popupCert = document.getElementById("popupCert");
  const closeCertButton = document.getElementById("closeCertButton");

  viewAllCertButton.addEventListener("click", function () {
    popupCert.style.display = "block";
  });

  closeCertButton.addEventListener("click", function () {
    popupCert.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === popupCert) {
      popupCert.style.display = "none";
    }
  });
});

// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("themeToggle");
    const themeToggleMobile = document.getElementById("themeToggleMobile");
    
    // Check for saved theme preference or default to light theme
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcons(currentTheme);
    
    // Toggle theme on desktop button click
    if (themeToggle) {
        themeToggle.addEventListener("click", function() {
            toggleTheme();
        });
    }
    
    // Toggle theme on mobile button click
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener("click", function() {
            toggleTheme();
        });
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcons(newTheme);
        
        // Update navbar background with smooth transition
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transition = 'background 0.3s ease';
        }
    }
    
    function updateThemeIcons(theme) {
        const icons = document.querySelectorAll('#themeToggle i, #themeToggleMobile i');
        icons.forEach(icon => {
            if (theme === "dark") {
                icon.className = "las la-moon";
            } else {
                icon.className = "las la-sun";
            }
        });
        
        // Update tooltips
        const buttons = document.querySelectorAll('#themeToggle, #themeToggleMobile');
        buttons.forEach(button => {
            if (theme === "dark") {
                button.title = "Switch to Light Mode";
            } else {
                button.title = "Switch to Dark Mode";
            }
        });
    }
});