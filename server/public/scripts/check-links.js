const showLogin = document.querySelector("#refLog");
const showSignUp = document.querySelector("#refSign");
const subMediaPrimary = document.querySelector(".primary");

const checkForToken = () => {
  const token = localStorage.getItem("token");
  return JSON.parse(token);
};

const checkIfLoggedIn = () => {
  if (checkForToken()) {
    showLogin.textContent = "Log out";
    showLogin.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = `http://192.168.1.137:3000/index.html`;
    });
    showSignUp.remove();
  }
};

const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const [, payload] = token.split(".");
  return JSON.parse(atob(payload));
};

const checkCurrentAccountType = async () => {
  const loggedInUser = getCurrentUser();
  if (!loggedInUser) return;
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${checkForToken()}`,
    },
  };
  try {
    const res = await fetch(
      `http://192.168.1.137:3000/users/${loggedInUser.sub}`,
      options
    );

    const user = await res.json();

    showAccountPageAndAdminPage(user.accType);
  } catch (err) {
    console.log(err);
  }
};

const showAccountPageAndAdminPage = (user = "user") => {
  if (checkForToken()) {
    const liAccountPage = document.createElement("li");
    const accountPage = document.createElement("a");
    accountPage.href = `http://192.168.1.137:3000/account.html`;
    accountPage.textContent = `My Account`;
    liAccountPage.append(accountPage);
    subMediaPrimary.append(liAccountPage);

    if (user === "admin") {
      const liAdminPage = document.createElement("li");
      const adminPage = document.createElement("a");
      adminPage.href = "#"; //`http://192.168.1.137:3000/admin.html`;
      adminPage.textContent = `Admin Settings`;
      liAdminPage.append(adminPage);
      subMediaPrimary.append(liAdminPage);
    }
  }
};

checkCurrentAccountType();
checkIfLoggedIn();
