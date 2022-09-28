import { login, logout } from "./api/users.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";

const main = document.querySelector("main");

document.getElementById("logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page("/", homeView);
page("/dashboard", dashboardView);
page("/details/:id", detailsView);
page("/edit/:id", editView);
page("/login", loginView);
page("/register", registerView);
page("/create", createView);

updateNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  ctx.updateNav = updateNav;
  next();
}
function renderMain(templateResult) {
  render(templateResult, main);
}

function updateNav() {
  const userData = getUserData();
  if (userData) {
    Array.from(document.querySelectorAll(".user")).map(
      (e) => (e.style.display = "block")
    );
    Array.from(document.querySelectorAll(".guest")).map(
      (e) => (e.style.display = "none")
    );
  } else {
    Array.from(document.querySelectorAll(".guest")).map(
      (e) => (e.style.display = "block")
    );
    Array.from(document.querySelectorAll(".user")).map(
      (e) => (e.style.display = "none")
    );
  }
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
