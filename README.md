# Phonebook Application

This application allows users to add and delete contacts (a phonebook). Adding and deleting contacts is available **only for registered users**.

## Registration

1. Implement user registration when clicking the "Register" button.  
   The modal template for user registration is available in the partials. You can use a `<template>` or directly take the markup from the partial.
2. Use the **BasicLightbox** library to open and close the registration modal.
3. Upon successful registration, the user receives a **token**, which must be stored in `localStorage`.
4. After successful registration, a logged-in user should have access **only to the Contacts page**.

## Login

1. Implement user login when clicking the "LogIn" button.  
   The modal template for user login is available in the partials. You can use a `<template>` or directly take the markup from the partial.
2. Use the **BasicLightbox** library to open and close the login modal.
3. Upon successful login, the user receives a **token**, which must be stored in `localStorage`.
4. After successful login, a logged-in user should have access **only to the Contacts page**.

## Contacts Page

1. The Contacts page includes a form to create new contacts.  
   When a contact is successfully created, it should be rendered on the page (added to a `<ul>` list).
2. When the page is refreshed, all contacts from the backend should be fetched and displayed in the `<ul>`.
3. Implement contact deletion. After deleting a contact, the displayed list should update accordingly.
4. When the user clicks the "LogOut" button, they should be logged out, the token removed, and only the **main page** should be accessible.

## Backend Documentation

[GoIT Connections API Documentation](https://connections-api.goit.global/docs/)
