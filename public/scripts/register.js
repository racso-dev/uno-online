const form = document.getElementById("signup-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;

    try {
        const formData = new FormData(form);

        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);
        console.log(formDataJsonString)
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: formDataJsonString
        }).then((data) => data.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))

    }
    catch (error) {
        console.error(error)
    }
})
