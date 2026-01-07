export const contactsListEl = document.querySelector(".contacts-list");

export const renderContact = (contact) => {
  const li = document.createElement("li");
  li.className = "contact-item";
  li.id = contact.id;
  li.innerHTML = `
    <span>${contact.name}: ${contact.number}</span>
    <button class="delete-btn">Delete</button>
  `;
  contactsListEl.appendChild(li);
};

export const clearContacts = () => {
  contactsListEl.innerHTML = "";
};
