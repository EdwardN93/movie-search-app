function getLoggedInUser() {
  const token = localStorage.getItem("token");
  if (!token) return null; // No user logged in

  const [, payload] = token.split(".");
  const decoded = JSON.parse(atob(payload));
  return decoded;
}

const user = getLoggedInUser();
console.log(user);

async function fetchUserDetails() {
  const loggedInUser = getLoggedInUser();

  if (!loggedInUser) return;

  const response = await fetch(`http://192.168.1.137:3000/users/`);

  if (response.ok) {
    const userData = await response.json();
    const user = userData.filter(
      (curUser) => curUser.email === loggedInUser.email
    );
    user.forEach((element) => {
      const userNameDisplay = document.querySelector(".profile-name");
      const favoriteMovies = document.querySelector(".favorites");

      if (element.favorites.length < 1)
        favoriteMovies.textContent = "No favorites to show";

      userNameDisplay.textContent = element.name;
    });
  }
}

fetchUserDetails();
