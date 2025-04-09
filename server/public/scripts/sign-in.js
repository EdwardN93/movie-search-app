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
        favorites: [],
        dislikes: [],
        watchlist: [],
      }),
    };

    console.log(options);
    const res = await fetch(`${url}/register`, options);
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    addToken(data.accessToken);
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener("submit", getFormData);

function getFormData(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const formdataJSON = Object.fromEntries(formData.entries());
  signIn(formdataJSON);
  form.reset();
  alert("Account created successfully!\n\nYou will be redirected to home page");
  const timeout = setTimeout(() => {
    window.location.href = `http://192.168.1.137:3000/index.html`;
    clearInterval(timeout);
  }, 2000);
}

function addToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
}
