const showLogin = document.querySelector("#refLog");
const showSignUp = document.querySelector("#refSign");
const subMediaPrimary = document.querySelector(".primary");

const checkForToken = () => {
  const token = localStorage.getItem("token");
  return token;
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

const showAccountPage = () => {
  if (checkForToken()) {
    const liAccountPage = document.createElement("li");
    const accountPage = document.createElement("a");
    accountPage.href = `http://192.168.1.137:3000/account.html`;
    accountPage.textContent = `My Account`;
    liAccountPage.append(accountPage);
    subMediaPrimary.append(liAccountPage);
  }
};

checkIfLoggedIn();
showAccountPage();
