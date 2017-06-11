// F1 API v6
const F1 = 'https://bsbbycpjma.execute-api.eu-central-1.amazonaws.com/latest/f1'

let api = {
  getCurrentCalendar() {
    let url = `${F1}/current/calendar`

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
  getQualifyingResults(season, round) {
    const url = `${F1}/results/season/${season}/round/${round}/qualifying`

    return fetch(url).then((res) => res.json())
  },
  getRaceResults(season, round) {
    const url = `${F1}/results/season/${season}/round/${round}/race`

    return fetch(url).then((res) => res.json())
  },
  getConstructorDetails(constructorId) {
    const url = `${F1}/constructor/${constructorId}/details`

    return fetch(url).then((res) => res.json())
  },
  getConstructorDrivers(constructorId) {
    const url = `${F1}/constructor/${constructorId}/drivers/details`

    return fetch(url).then((res) => res.json())
  },
  getCircuitInfo(circuitId) {
    const url = `${F1}/circuit/${circuitId}/details`

    return fetch(url).then((res) => res.json())
  }
}

module.exports = api
