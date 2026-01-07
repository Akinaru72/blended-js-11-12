import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

import { signupUser, setAuthToken, fetchContacts } from "./js/api";
import { LS_KEY } from "./js/refs";

const header = document.querySelector("header");
const registerBtn = header.querySelector(".sign-up-btn");
const registerTemplate = document.querySelector("#register");

async function getContacts() {
  try {
    const data = await fetchContacts();
    console.log("Contacts:", data);
  } catch (error) {
    console.log("Error fetching contacts:", error);
  }
}

console.log(getContacts());

let modal = null;

registerBtn.addEventListener("click", openRegisterModal);

function openRegisterModal() {
  modal = basicLightbox.create(registerTemplate.innerHTML, {
    onShow(instance) {
      instance
        .element()
        .querySelector(".register-form")
        .addEventListener("submit", onRegisterSubmit);
    },
  });

  modal.show();
}

async function onRegisterSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value.trim();

  if (!name || !email || !password) {
    alert("Fill all fields");
    return;
  }

  try {
    const data = await signupUser({
      name,
      email,
      password,
    });

    // 🔐 сохраняем токен
    localStorage.setItem(LS_KEY, data.token);
    setAuthToken(data.token);

    modal.close();

    console.log("Registered user:", data.user);
    // 👉 тут показать Contacts
  } catch (error) {
    console.log(error);
    alert("Registration failed");
  }
}
