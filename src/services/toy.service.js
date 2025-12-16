
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'toy/'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getRandomToy,
  getLabels
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
  return httpService.delete(BASE_URL + toyId) // api/toy/c102/remove
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL + toy._id, toy)
  } else {
    return httpService.post(BASE_URL, toy)
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: ''
  }
}

function getRandomToy() {
  const name = _getRandToyName()
  return {
    name,
    price: utilService.getRandomIntInclusive(20, 200),
    // labels: _getRandLabels(name)
  }
}

function _getRandToyName() {
  const names = [
    "Wonder",
    "Spark",
    "Builder",
    "Buddy",
    "Critter",
    "Explorer",
    "Stacker",
    "Hero",
    "Forest",
    "Rainbow"
  ]

  const idx1 = utilService.getRandomIntInclusive(0, names.length - 1)
  let idx2 = utilService.getRandomIntInclusive(0, names.length - 1)

  while (idx2 === idx1) {
    idx2 = utilService.getRandomIntInclusive(0, names.length - 1)
  }

  return names[idx1] + " " + names[idx2]
}

function getDefaultFilter() {
  return {
    txt: '',
    maxPrice: '',
    labels: [],
    sortBy: '',
    stock: '',
    pageIdx: '',
    user: ''
  }
}

function getLabels(toys) {
  if (!toys) return []
  return [
    ...new Set(toys.flatMap(toy =>
      Array.isArray(toy.labels) ?
        toy.labels : []))]
}

// function _getRandLabels(name) {
//     const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll',
//         'Puzzle', 'Outdoor', 'Battery Powered']
        
//     const res = new Set()
//     const match = labels.find(lbl =>
//         lbl.toLowerCase().includes(name.toLowerCase())
//     )
//     if (match) res.add(match)

//     while (res.size < 3) {
//         const randomLabel = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
//         res.add(randomLabel)
//     }
//     return [...res]
// }

