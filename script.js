// script.js - Contact / Booking page behaviour

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const typeField = document.getElementById('requestType');
  const detailsField = document.getElementById('details');

  const previewSection = document.getElementById('emailPreview');
  const previewContent = document.getElementById('emailContent');
  const copyBtn = document.getElementById('copyEmail');

  // Restaurant email target
  const restaurantEmail = 'manager@oakandember.example';

  if (!form) {
    console.error('contactForm not found. Check HTML IDs.');
    return;
  }

  function encodeForMailto(text) {
    return encodeURIComponent(text).replace(/%0A/g, '%0D%0A');
  }

  function buildEmailPayload({ name, fromEmail, type, details }) {
    const subjectMap = {
      booking: 'Table Booking Request',
      feedback: 'Feedback',
      general: 'General Enquiry'
    };

    const subject = `${subjectMap[type] || 'Enquiry'} — ${name}`;
    const body = [
      `From: ${name}`,
      `Reply-to: ${fromEmail}`,
      `Request type: ${type}`,
      ``,
      `Details:`,
      details,
      ``,
      `---`,
      `This message was generated from the Oak & Ember booking prototype.`
    ].join('\r\n');

    return { subject, body };
  }

  function showPreview(subject, body) {
    previewContent.textContent = `To: ${restaurantEmail}\nSubject: ${subject}\n\n${body}`;
    previewSection.hidden = false;
  }

  // Copy button
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const text = previewContent.textContent;
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy Email Text'), 1500);
      } catch {
        alert('Copy failed — please select the text manually.');
      }
    });
  }

  // Handle submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameField.value.trim();
    const fromEmail = emailField.value.trim();
    const type = typeField.value;
    const details = detailsField.value.trim();

    if (!name || !fromEmail || !type || !details) {
      alert('Please fill out all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
      alert('Please enter a valid email.');
      emailField.focus();
      return;
    }

    const { subject, body } = buildEmailPayload({
      name,
      fromEmail,
      type,
      details
    });

    // Show preview
    showPreview(subject, body);

    const mailto = `mailto:${restaurantEmail}?subject=${encodeForMailto(subject)}&body=${encodeForMailto(body)}`;

    setTimeout(() => {
      window.location.href = mailto;
    }, 200);
  });
});
