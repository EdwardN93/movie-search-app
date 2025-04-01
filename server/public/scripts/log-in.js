async function signIn(formData) {
  const url = "http://192.168.1.137:3000";

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
      }),
    };
    console.log(options);
    const res = await fetch(`${url}/signin`, options);
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    addToken(data.accessToken);
    window.location.href = `http://192.168.1.137:3000/index.html`;
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener("submit", getFormData);

function getFormData(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const formdataJSON = Object.fromEntries(formData.entries());
  //   console.log(JSON.stringify(formdataJSON));
  signIn(formdataJSON);
  form.reset();
}

function addToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
}
