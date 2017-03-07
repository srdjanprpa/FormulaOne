/*eslint no-undef: "error"*/
/*eslint-env node*/
const F1 = 'https://oip3pj05jc.execute-api.eu-west-1.amazonaws.com/latest/f1'

let api = {
  getCurrentCalendar() {
    let url = `${F1}/current`

    return fetch(url).then((res) => res.json())
  },
  getDriverStandings() {
    const url = `${F1}/current/driver-standings`

    return fetch(url).then((res) => res.json())
  },
  getConstructorStandings() {
    const url = `${F1}/current/constructor-standings`

    return fetch(url).then((res) => res.json())
  },
  getQualifyingResults(data) {
    const url = `${F1}/results/qualifying`

    return fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      return res.json()
    })
  },
  getRaceResults(data) {
    const url = `${F1}/results/race`

    return fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      return res.json()
    })
  }
}

module.exports = api
