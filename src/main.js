const form = document.getElementById('appointmentForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const reason = document.getElementById('reason').value;

  try {
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, date, reason }),
    });

    const data = await res.json();
    alert(data.message);
    form.reset();
  } catch (err) {
    console.error(err);
    alert('Failed to send appointment request.');
  }
});
