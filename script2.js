// Theme Toggle
const toggleButton = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('toggle-icon');
const body = document.body;

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  body.classList.toggle('light');
  
  toggleIcon.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
  
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.add(savedTheme);
toggleIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Roadmap Animation
const timelineItems = document.querySelectorAll('.timeline-item');

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
  );
};

const checkTimelineItems = () => {
  timelineItems.forEach((item) => {
    if (isInViewport(item)) {
      item.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', checkTimelineItems);
window.addEventListener('load', checkTimelineItems);

// EmailJS Contact Form
(function() {
  emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS User ID
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formStatus = document.getElementById('form-status');
  formStatus.textContent = 'Sending...';
  
  const templateParams = {
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(() => {
      formStatus.textContent = 'Message sent successfully!';
      document.getElementById('contact-form').reset();
    }, (error) => {
      formStatus.textContent = 'Failed to send message. Try again later.';
      console.error('EmailJS error:', error);
    });
});