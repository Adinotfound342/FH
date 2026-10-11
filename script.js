const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fade out before moving to the next page
document.querySelectorAll('a[data-fade]').forEach(link => {
  link.addEventListener('click', e => {
    if (reduceMotion) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => (window.location.href = link.href), 350);
  });
});

// Letter page: lines appear one by one
const lines = document.querySelectorAll('.letter p');
if (lines.length) {
  if (reduceMotion) {
    lines.forEach(p => p.classList.remove('hide'));
  } else {
    lines.forEach((p, i) => setTimeout(() => p.classList.remove('hide'), 400 + i * 900));
  }
}

// Plan page: tiny replies
const reply = document.getElementById('reply');
document.querySelectorAll('[data-msg]').forEach(btn => {
  btn.addEventListener('click', () => { reply.textContent = btn.dataset.msg; });
});

// Reply page: opens WhatsApp with a ready-made message
// EDIT THIS: your number with country code, digits only (India = 91...)
const MY_NUMBER = '919136649818';

function sendOnWhatsApp(text) {
  if (!text.trim()) return;
  window.open(`https://wa.me/${MY_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}
document.querySelectorAll('[data-send]').forEach(btn =>
  btn.addEventListener('click', () => sendOnWhatsApp(btn.dataset.send)));
const sendOwn = document.getElementById('send-own');
if (sendOwn) sendOwn.addEventListener('click', () =>
  sendOnWhatsApp(document.getElementById('own').value));
