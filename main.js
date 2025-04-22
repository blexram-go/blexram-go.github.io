const sections = {
    '': document.querySelector('.content-container'),
    '#about': document.querySelector('.about-container'),
    '#projects': document.querySelector('.projects-container'),
    '#contact': document.querySelector('.contact-container'),
};

const typingSpeed = 20;
const lineDelay = 500;

const typeLine = async (lineElement, text) => {
    lineElement.textContent = '';
    for (let ch of text) {
        lineElement.textContent += ch;
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
    }
};

const typeSection = async (container) => {
    const lines = container.querySelectorAll('.line');
    for (let line of lines) {
        const text = line.getAttribute('data-text');
        await typeLine(line, text);
        await new Promise(r => setTimeout(r, lineDelay));
    }
}

function showSection() {
    const hash = window.location.hash;
    Object.entries(sections).forEach(([key, el]) => {
      if (!el) return;
      el.style.display = (key === hash) ? 'block' : 'none';
    });
    const active = sections[hash] || sections[''];
    active.querySelectorAll('.line').forEach(el => el.textContent = '');
    typeSection(active);
}

document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const responseMsg = document.getElementById('responseMsg');
  
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
  
      const data = await res.json();
  
      if (data.success) {
        responseMsg.textContent = 'Contact % Message sent ✅';
        form.reset();
      } else {
        responseMsg.textContent = 'Contact % Failed to send message ❌';
      }
    } catch (err) {
      responseMsg.textContent = 'Contact % Error sending message ❌';
    }
});
  

window.addEventListener('DOMContentLoaded', showSection);
window.addEventListener('hashchange', showSection);