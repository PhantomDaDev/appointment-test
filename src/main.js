const form = document.getElementById('appointmentForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const appointmentData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    date: document.getElementById('date').value,
    reason: document.getElementById('reason').value,
  };

  try {
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    const result = await response.json();
    alert(result.message);
    form.reset();
  } catch (error) {
    console.error('Error sending appointment:', error);
    alert('Failed to send appointment.');
  }
});
