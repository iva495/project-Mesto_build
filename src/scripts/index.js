placesList.addEventListener('click', (event) => {
  if (event.target.classList.contains('place-card__image')) {
    imagePop.openImagePopup();
  }
});

newCardForm.addEventListener('input', inputHandler);
newCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  renderCards.addCard(newCardInputName.value, newCardInputLink.value);
  newCardPop.closePopup();
});

editForm.addEventListener('submit', (event) => {
  api.setUserInfo({
    name: editFormInputName.value,
    about: editFormInputAbout.value
  })
    .then(res => {
      userName.textContent = res.name;
      userJob.textContent = res.about;
    });
  editPop.closePopup();
  disableButton(editSaveButton);
  event.preventDefault();
});

editForm.addEventListener('input', editInputHandler);

addCardButton.addEventListener('click', () => {
  newCardPop.openPopup();
  newCardPopupButton.classList.add('popup__button_disabled');
  newCardErrorName.textContent = "";
  newCardErrorLink.textContent = "";
});

editButton.addEventListener('click', () => {
  editPop.openPopup();
  infoEditPopup()
  editSaveButton.classList.add('popup__button_disabled');
});

window.addEventListener('offline', () => {
  window.location.reload();
});

window.addEventListener('online', () => {
  window.location.reload();
});





