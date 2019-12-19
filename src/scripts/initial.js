const user = {};

api.getUserInfo()
.then((res)=> {
  for (let key in res) {
    if (res.hasOwnProperty(key)) {
      user[key] = res[key]
    } else console.log(`Ошибка ${key}`)
  }
  userName.textContent = res.name;
  userJob.textContent = res.about;
})

api.getInitialCards()
.then((res) => {
    res.forEach(item => {
        renderCards.addCard(item.name, item.link); 
      })
    
});

noInternet(online);




  
  

  