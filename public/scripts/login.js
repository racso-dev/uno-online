const form = document.getElementById('signin-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  try {
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    const res = await fetch('/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formDataJsonString,
    }).then((data) => data.json());
    window.localStorage.setItem('token', res.accessToken);
    window.location.href = '/';
  } catch (error) {
    console.error(error);
  }
});
