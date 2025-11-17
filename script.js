// script.js - Final working version for Contact Page

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const typeField = document.getElementById("requestType");
  const detailsField = document.getElementById("details");

  const previewBox = document.getElementById("emailPreview");
  const previewContent = document.getElementById("emailContent");
  const copyBtn = document.getElementById("copyEmail");

  const restaurantEmail = "manager@oakandember.example";

  function encodeMail(text) {
    return encodeURIComponent(text).replace(/%0A/g, "%0D%0A");
  }

  function buildEmail(name, sender, type, details) {
    const subjectTypes = {
      booking: "Table Booking Request",
      feedback: "Customer Feedback",
      general: "General Enquiry"
    };

    const subject = `${subjectTypes[type]} — ${name}`;

    const body = `
From: ${name}
Reply-to: ${sender}
Request Type: ${type}

Details:
${details}

---
This message was created using the Oak & Ember restaurant booking prototype.
    `.trim();

    return { subject, body };
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const type = typeField.value;
    const details = detailsField.value.trim();

    if (!name || !email || !type || !details) {
      alert("Please fill out all fields.");
      return;
    }

    const { subject, body } = buildEmail(name, email, type, details);

    previewContent.textContent = `To: ${restaurantEmail}\nSubject: ${subject}\n\n${body}`;
    previewBox.style.display = "block";

    const mailtoLink = `mailto:${restaurantEmail}?subject=${encodeMail(subject)}&body=${encodeMail(body)}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 200);
  });

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(previewContent.textContent);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy Email Text"), 1500);
    } catch (err) {
      alert("Could not copy. Select the text manually.");
    }
  });

});

