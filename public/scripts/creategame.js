const form = document.getElementById('creategame');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  try {
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    const res = await fetch('http://localhost:3000/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token'),
      },
      body: formDataJsonString,
    }).then((data) => data.json());
  } catch (error) {
    console.error(error);
  }
});

