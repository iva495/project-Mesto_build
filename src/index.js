
let initialCards = []; 
const form = document.forms.new;
const buttonPop = document.querySelector('.user-info__button');
const popup = document.querySelector('.popup');
const buttonClose = document.querySelector('.popup__close');
const popupName = document.querySelector('.popup__input_type_name');
const popupLink = document.querySelector('.popup__input_type_link-url');
const buttonPopChenge = document.querySelector('.change-info__button');
const buttonChengeClose = document.querySelector('.popupChange__close');
const popupChenge = document.getElementById('chang');
const formChenge = document.forms.chenge;
const popupChengeName = document.querySelector('.popupChange__input_type_name');
const popupChengeLand = document.querySelector('.popupChange__input_type_land');
const popupImg = document.querySelector('.popupImg');
const buttonImgClose = document.querySelector('.popupImg__close');
const placeList = document.querySelector('.places-list');
const lang = {
  validationLenghtRu: 'Должно быть от 2 до 30 символов',
  validationNecessarilyRu: "Это обязательное поле",
  validationLinkRu: "Здесь должна быть ссылка"
}

const tweets = [
  'Какой-то странный тред',
  'Твит, адресованный Илону Маску',
  'Ответ на инфоповод'
];

class Api {
  constructor(key, user) {
    this.key = key;
    this.user = user;
  }

  getHeder() {
    fetch(`${this.user}/users/me`, {
      headers: {
        authorization: this.key
      }
    })
      .then(res => {
        if (res.ok)
          return res.json();
      })
      .then((result) => {
        headInfo(result);
      })
      .catch((err) => {
        console.log("Что-то пошло не так");
      });
  }

  getCards() {
    fetch(`${this.user}/cards`, {
      headers: {
        authorization: this.key
      }
    })
      .then(res => {
        if (res.ok)
          return res.json();
      })
      .then((result) => {
        let temp;
        result.forEach(function (element) {
          temp = {
            name: element.name,
            link: element.link
          }
          initialCards.push(temp);
        });
        let cardList = new CardList(placeList, initialCards); //ca
        cardList.render();
      })
      .catch((err) => {
        console.log("Что-то пошло не так");
      });
  }

  newHeader() {
    const form = event.currentTarget;
    const new_name = form.elements.chengeName.value;
    const new_Land = form.elements.chengeLand.value;
    fetch(`${this.user}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: new_name,
        about: new_Land
      })
    })
      .then(res => {
        if (res.ok)
          return res.json();
      })
      .then((result) => {
        headInfo(result);
      })
      .catch((err) => {
        console.log("Что-то пошло не так");
      });
  }
}

class Card {
  constructor(item) {
    this.item = item;
    placeList.addEventListener('click', this.open);
  }


  open(e) {
    let openPhoto = 0;

    let deleteCard = e.target.closest('.place-card__delete-icon');
    if (deleteCard) openPhoto--;

    let cardOpen = e.target.closest('.place-card__image');
    if (cardOpen) {
      if (openPhoto >= 0) {
        const link = e.target.closest('.place-card__image').style.backgroundImage.slice(5);
        document.querySelector('.popupImg__popusPic').src = link.substring(0, link.length - 2);
        document.querySelector('.popupImg').classList.add('popupImg_is-opened');
      }
      openPhoto++;
    }
  }

  create() {

    let link = "url(" + this.item.link + ")"

    const placecard = document.createElement('div');
    placecard.classList.add('place-card');

    const card__image = document.createElement('div');
    card__image.classList.add('place-card__image');
    card__image.style.backgroundImage = link;

    const card__description = document.createElement('div');
    card__description.classList.add('place-card__description');

    const deleteicon = document.createElement('button');
    deleteicon.classList.add('place-card__delete-icon');

    const card__name = document.createElement('h3');
    card__name.classList.add('place-card__name');
    card__name.textContent = this.item.name;

    const likeicon = document.createElement('button');
    likeicon.classList.add('place-card__like-icon');

    card__image.appendChild(deleteicon);
    card__description.appendChild(card__name);
    card__description.appendChild(likeicon);
    placecard.appendChild(card__image);
    placecard.appendChild(card__description);

    return placecard;
  }
}

class CardList {
  constructor(container, arr) {
    this.container = container;
    this.arr = arr;
  }
  render() {
    this.arr.forEach((item) => {
      this.createCard(item);
    });
  }
  createCard(item) {
    let card = new Card(item);

    let place = card.create(item);
    this.container.appendChild(place);
  }
}

class Popup {
  constructor() {
    buttonPop.addEventListener('click', { handleEvent: this.open, popup: popup, dopClass: "popup_is-opened" });
    buttonClose.addEventListener('click', { handleEvent: this.close, popup: popup, dopClass: "popup_is-opened" });
    popupName.addEventListener('keydown', activNonActivPopup);
    popupName.addEventListener('keyup', activNonActivPopup);
    popupLink.addEventListener('keydown', activNonActivPopup);
    popupLink.addEventListener('keyup', activNonActivPopup);
    form.addEventListener('submit', this.preventEvent);
    //popup 1
    buttonPopChenge.addEventListener('click', { handleEvent: this.open, popup: popupChenge, dopClass: "popupChange_is-opened" });
    buttonChengeClose.addEventListener('click', { handleEvent: this.close, popup: popupChenge, dopClass: "popupChange_is-opened" });
    popupChengeName.addEventListener('keydown', activNonActivPopupChenge);
    popupChengeName.addEventListener('keyup', activNonActivPopupChenge);
    popupChengeLand.addEventListener('keydown', activNonActivPopupChenge);
    popupChengeLand.addEventListener('keyup', activNonActivPopupChenge);
    formChenge.addEventListener('submit', this.preventEventChenge);
    //popup 2
    buttonImgClose.addEventListener('click', { handleEvent: this.close, popup: popupImg, dopClass: "popupImg_is-opened" });
    //popup 3
  }

  open() {
    this.popup.classList.add(this.dopClass);
    if (this.dopClass == "popupChange_is-opened") {
      const formChenge = document.forms.chenge;
      formChenge.elements.chengeName.value = document.querySelector('.user-info__name').innerHTML;
      formChenge.elements.chengeLand.value = document.querySelector('.user-info__job').innerHTML;
    }
  }

  close() {
    this.popup.classList.remove(this.dopClass);
  }

  preventEvent(event) {
    const popup = document.querySelector('.popup')
    const form = event.currentTarget;
    const new_name = form.elements.name.value;
    const new_link = form.elements.link.value;
    const cardList = new CardList(placeList, [{ name: new_name, link: new_link }]);
    form.reset();
    event.preventDefault();
    cardList.render();
    popup.classList.remove('popup_is-opened');
  }

  preventEventChenge(event) {
    const popupChenge = document.getElementById('chang');
    const api = new Api('0812cab5-1e67-4712-9a52-8d0c36dd4534', 'http://95.216.175.5/cohort5');
    api.newHeader();
    event.preventDefault();
    popupChenge.classList.remove('popupChange_is-opened');
  }
}
let api = new Api("0812cab5-1e67-4712-9a52-8d0c36dd4534", 'http://95.216.175.5/cohort5');
api.getHeder();
api.getCards();
let popupClass = new Popup();

function headInfo(result) {
  document.querySelector('.user-info__name').innerHTML = result.name;
  document.querySelector('.user-info__job').innerHTML = result.about;
  document.querySelector('.user-info__photo').style.backgroundImage = `url(${result.avatar})`;
}

function errorChange(pole, err) {
  if (pole.value.length == 1 || pole.value.length > 31)
    err.innerHTML = lang.validationLenghtRu;
  else if (pole.value.length == 0)
    err.innerHTML = lang.validationNecessarilyRu;
  else
    err.innerHTML = "";
}

function errorPopup() {
  const popupName = document.querySelector('.popup__input_type_name');
  const popupLink = document.querySelector('.popup__input_type_link-url');
  const errName = document.querySelector('.popup__error_name');
  const errLink = document.querySelector('.popup__error_link');

  if (popupName.value.length == 1 || popupName.value.length > 31)
    errName.innerHTML = lang.validationLenghtRu;
  else if (popupName.value.length == 0)
    errName.innerHTML = lang.validationNecessarilyRu;
  else
    errName.innerHTML = "";

  if (popupLink.value.length > 0 && (popupLink.value.slice(0, 7) == "http://" && popupLink.value.length > 7) || (popupLink.value.slice(0, 8) == "https://" && popupLink.value.length > 8))
    errLink.innerHTML = "";
  else if (popupLink.value.length == 0)
    errLink.innerHTML = lang.validationNecessarilyRu;
  else
    errLink.innerHTML = lang.validationLinkRu;
}

function proverka() {
  const popupName = document.querySelector('.popup__input_type_name');
  const popupLink = document.querySelector('.popup__input_type_link-url');
  if (popupName.value.length > 1 && popupName.value.length < 31 &&
    ((popupLink.value.slice(0, 7) == "http://" && popupLink.value.length > 7) ||
      (popupLink.value.slice(0, 8) == "https://" && popupLink.value.length > 8))) return true
  return false;

}

function activNonActivPopup() {
  if (proverka()) {
    document.querySelector('.popup__button').style.background = 'black';
    document.querySelector('.popup__button').style.color = 'white';
  } else {
    document.querySelector('.popup__button').style.removeProperty("background");
    document.querySelector('.popup__button').style.removeProperty("color");
  }
  errorPopup();
}

function activNonActivPopupChenge() {
  let popupChengeName = document.querySelector('.popupChange__input_type_name');
  let popupChengeLand = document.querySelector('.popupChange__input_type_land');
  if (popupChengeName.value.length > 1 && popupChengeLand.value.length > 1 && popupChengeName.value.length < 31 && popupChengeLand.value.length < 31) {
    document.querySelector('.popupChange__button').style.background = 'black';
    document.querySelector('.popupChange__button').style.color = 'white';
  } else {
    document.querySelector('.popupChange__button').style.removeProperty("background");
    document.querySelector('.popupChange__button').style.removeProperty("color");
  }

  errorChange(popupChengeName, document.querySelector('.popupChange__error_name'));
  errorChange(popupChengeLand, document.querySelector('.popupChange__error_land'));
}
