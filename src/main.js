import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

import { LS_KEY } from "./js/refs";
import {
  signupUser,
  loginUser,
  logoutUser,
  setAuthToken,
  fetchContacts,
  addContact,
  deleteContact,
} from "./js/api";

import {
  contactsListEl,
  renderContact,
  clearContacts,
} from "./js/render-functions";

const header = document.querySelector("header");
const registerBtn = header.querySelector(".sign-up-btn");
const loginBtn = header.querySelector(".login-btn");
const logoutBtn = header.querySelector(".logout-btn");

const registerTemplate = document.querySelector("#register");
const loginTemplate = document.querySelector("#login");

const contactForm = document.querySelector(".contact-form");
const nameInput = contactForm?.querySelector("[name='name']");
const numberInput = contactForm?.querySelector("[name='number']");

let modal = null;

// ======================= РЕЄСТРАЦІЯ =======================
registerBtn.addEventListener("click", () => {
  modal = basicLightbox.create(registerTemplate.innerHTML, {
    onShow: (instance) => {
      const form = instance.element().querySelector(".register-form");
      form.addEventListener("submit", onRegisterSubmit);
    },
    onClose: (instance) => {
      const form = instance.element().querySelector(".register-form");
      form.removeEventListener("submit", onRegisterSubmit);
    },
  });
  modal.show();
});

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
    const data = await signupUser({ name, email, password });
    setAuthToken(data.token);
    modal.close();
    alert("Registration successful!");
    showContactsPage();
  } catch (err) {
    alert("Registration failed");
    console.log(err);
  }
}

// ======================= ЛОГІН =======================
loginBtn.addEventListener("click", () => {
  modal = basicLightbox.create(loginTemplate.innerHTML, {
    onShow: (instance) => {
      const form = instance.element().querySelector(".login-form");
      form.addEventListener("submit", onLoginSubmit);
    },
    onClose: (instance) => {
      const form = instance.element().querySelector(".login-form");
      form.removeEventListener("submit", onLoginSubmit);
    },
  });
  modal.show();
});

async function onLoginSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value.trim();

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  try {
    const data = await loginUser({ email, password });
    setAuthToken(data.token);
    modal.close();
    alert("Login successful!");
    showContactsPage();
  } catch (err) {
    alert("Login failed");
    console.log(err);
  }
}

// ======================= CONTACTS PAGE =======================
async function showContactsPage() {
  // Показуємо форму контактів
  document.querySelector(".contacts-section").style.display = "block";
  header.querySelector(".auth-section").style.display = "none";

  await loadContacts();
}

async function loadContacts() {
  clearContacts();
  try {
    const contacts = await fetchContacts();
    contacts.forEach(renderContact);
  } catch (err) {
    console.log(err);
  }
}

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const number = numberInput.value.trim();
  if (!name || !number) return;

  try {
    const contact = await addContact({ name, number });
    renderContact(contact);
    contactForm.reset();
  } catch (err) {
    console.log(err);
  }
});

contactsListEl.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const li = e.target.closest("li");
  try {
    await deleteContact(li.id);
    li.remove();
  } catch (err) {
    console.log(err);
  }
});

// ======================= LOGOUT =======================
logoutBtn.addEventListener("click", async () => {
  try {
    await logoutUser();
    document.querySelector(".contacts-section").style.display = "none";
    header.querySelector(".auth-section").style.display = "flex";
    alert("Logged out");
  } catch (err) {
    console.log(err);
  }
});

// ======================= INIT =======================
(function init() {
  const token = localStorage.getItem(LS_KEY);
  if (token) {
    setAuthToken(token);
    showContactsPage();
  }
})();
