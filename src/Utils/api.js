/*eslint no-undef: "error"*/
/*eslint-env node*/
const F1 = 'http://ergast.com/api/f1'

let api = {
  getCalendar(year) {
    let url = `${F1}/${year}.json`

    return fetch(url).then((res) => res.json())
  },
  getDriverStandings() {
    const url = `${F1}/current/driverStandings.json`

    return fetch(url).then((res) => res.json())
  },
  getConstructorStandings() {
    const url = `${F1}/current/constructorStandings.json`

    return fetch(url).then((res) => res.json())
  }
}

module.exports = api
