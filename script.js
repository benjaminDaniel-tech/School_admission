// Basic client-side validation + friendly message
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('admissionForm');
  const message = document.getElementById('message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    message.textContent = '';

    // Simple validation checks:
    const requiredIds = ['firstName','dob','gender','classApply','parentName','email','phone'];
    for (const id of requiredIds) {
      const el = document.getElementById(id);
      if (!el.value || el.value.trim() === '') {
        el.focus();
        message.style.color = 'crimson';
        message.textContent = 'Please fill all required fields (marked *).';
        return;
      }
    }

    // Phone: only digits, 10 digits (adjust if needed)
    const phone = document.getElementById('phone').value.replace(/\s+/g,'');
    if (!/^\d{10}$/.test(phone)) {
      document.getElementById('phone').focus();
      message.style.color = 'crimson';
      message.textContent = 'Enter a valid 10-digit phone number.';
      return;
    }

    // Email basic check
    const email = document.getElementById('email').value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('email').focus();
      message.style.color = 'crimson';
      message.textContent = 'Enter a valid email address.';
      return;
    }

    // If everything ok: simulate submission (replace with actual network call)
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());

    // For demo, we just show a success message and the submitted name.
    message.style.color = 'green';
    message.textContent = `Application submitted for ${dataObj.firstName} ${dataObj.lastName || ''}.`;

    // Optionally reset form after submission:
    form.reset();

    // If you want to send to a server, use fetch:
    // fetch('/submit-admission', { method:'POST', body: formData })
    //  .then(res => res.json()).then(...).catch(...);
  });
});
