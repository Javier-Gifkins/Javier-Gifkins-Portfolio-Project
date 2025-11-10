// Theme Toggle Functionality

// Define the two themes
const themes = {
  normal: {
    '--color-primary': '#0d3ab6',
    '--color-font': '#ffffff',
    '--color-accent': '#3ccbe7',
    '--color-text': '#ff0000',
    '--color-background': '#656565',
    '--color-link': '#ffffff',
    '--color-delete': '#c74444'
  },
  highContrast: {
    '--color-primary': '#000000',
    '--color-font': '#ff0000',
    '--color-accent': '#ffff00',
    '--color-text': '#ff00f2',
    '--color-background': '#ffa600',
    '--color-delete': '#ff0000'
  }
};

// Load saved theme preference or default to normal
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'highContrast';
  applyTheme(savedTheme);
}

// Apply theme by setting CSS variables
function applyTheme(themeName) {
  const theme = themes[themeName];
  const root = document.documentElement;
  
  for (const [property, value] of Object.entries(theme)) {
    root.style.setProperty(property, value);
  }
  
  localStorage.setItem('theme', themeName);
  updateButtonText(themeName);
}

// Toggle between themes
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'highContrast';
  const newTheme = currentTheme === 'normal' ? 'highContrast' : 'normal';
  applyTheme(newTheme);
}

// Update button text based on current theme
function updateButtonText(themeName) {
  const button = document.getElementById('themeToggleBtn');
  if (button) {
    button.textContent = themeName === 'normal' ? 'High Contrast' : 'Normal';
  }
}

// Load theme when page loads
document.addEventListener('DOMContentLoaded', loadTheme);
