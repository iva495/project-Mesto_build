class CardList {
    constructor(container) {
        this.container = container;
        
    }
    addCard(name, link) {
        const { cardElement } = new Card(name, link);
        this.container.appendChild(cardElement);
        disableButton(newCardPopupButton);
    }
}
