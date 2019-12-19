const url = {
    URL_BASE: 'http://95.216.175.5/cohort5',
    TOKEN: '83481d9c-7872-40df-af71-ec567ff51fc9',
}
const api = new Api({
  URL_BASE: url.URL_BASE,
  headers: {
    authorization: url.TOKEN,
    'Content-Type': 'application/json'
  }
});