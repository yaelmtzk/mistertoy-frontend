
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service-local.js'

const STORAGE_KEY = 'toyDB'

const gToys = [
  {
    _id: 't101',
    name: 'Talking Doll',
    imgUrl: 'hardcoded-url-for-now',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: 1631031801011,
    inStock: true
  },
  {
    _id: 't102',
    name: 'Wooden Puzzle Board',
    imgUrl: 'hardcoded-url-for-now',
    price: 45,
    labels: ['Puzzle', 'Art', 'Box game'],
    createdAt: 1631032801011,
    inStock: true
  },
  {
    _id: 't103',
    name: 'Racing Car',
    imgUrl: 'hardcoded-url-for-now',
    price: 89,
    labels: ['On wheels', 'Outdoor', 'Battery Powered'],
    createdAt: 1631033801011,
    inStock: false
  },
  {
    _id: 't104',
    name: 'Baby Rattle',
    imgUrl: 'hardcoded-url-for-now',
    price: 25,
    labels: ['Baby', 'Art', 'Doll'],
    createdAt: 1631034801011,
    inStock: true
  },
  {
    _id: 't105',
    name: 'Garden Play Set',
    imgUrl: 'hardcoded-url-for-now',
    price: 150,
    labels: ['Outdoor', 'Box game', 'Baby'],
    createdAt: 1631035801011,
    inStock: true
  },
  {
    _id: 't106',
    name: 'Electric Train',
    imgUrl: 'hardcoded-url-for-now',
    price: 199,
    labels: ['On wheels', 'Battery Powered', 'Puzzle'],
    createdAt: 1631036801011,
    inStock: false
  },
  {
    _id: 't107',
    name: 'Creative Art Kit',
    imgUrl: 'hardcoded-url-for-now',
    price: 60,
    labels: ['Art', 'Box game', 'Puzzle'],
    createdAt: 1631037801011,
    inStock: true
  },
  {
    _id: 't108',
    name: 'Outdoor Ball Set',
    imgUrl: 'hardcoded-url-for-now',
    price: 55,
    labels: ['Outdoor', 'Baby', 'Box game'],
    createdAt: 1631038801011,
    inStock: true
  },
  {
    _id: 't109',
    name: 'Battery Robot',
    imgUrl: 'hardcoded-url-for-now',
    price: 135,
    labels: ['Battery Powered', 'Puzzle', 'On wheels'],
    createdAt: 1631039801011,
    inStock: true
  },
  {
    _id: 't110',
    name: 'Plush Doll',
    imgUrl: 'hardcoded-url-for-now',
    price: 70,
    labels: ['Doll', 'Baby', 'Art'],
    createdAt: 1631040801011,
    inStock: false
  },
  {
    _id: 't111',
    name: 'Outdoor Explorer Kit',
    imgUrl: 'hardcoded-url-for-now',
    price: 90,
    labels: ['Outdoor', 'Puzzle', 'Box game'],
    createdAt: 1631041801011,
    inStock: true
  },
  {
    _id: 't112',
    name: 'Coloring Station',
    imgUrl: 'hardcoded-url-for-now',
    price: 35,
    labels: ['Art', 'Baby', 'Box game'],
    createdAt: 1631042801011,
    inStock: true
  },
  {
    _id: 't113',
    name: 'Battery Helicopter',
    imgUrl: 'hardcoded-url-for-now',
    price: 160,
    labels: ['Battery Powered', 'On wheels', 'Outdoor'],
    createdAt: 1631043801011,
    inStock: false
  },
  {
    _id: 't114',
    name: 'Doll House',
    imgUrl: 'hardcoded-url-for-now',
    price: 220,
    labels: ['Doll', 'Box game', 'Art'],
    createdAt: 1631044801011,
    inStock: true
  },
  {
    _id: 't115',
    name: 'Baby Soft Blocks',
    imgUrl: 'hardcoded-url-for-now',
    price: 40,
    labels: ['Baby', 'Puzzle', 'Art'],
    createdAt: 1631045801011,
    inStock: true
  },
  {
    _id: 't116',
    name: 'Super Fast Kart',
    imgUrl: 'hardcoded-url-for-now',
    price: 180,
    labels: ['On wheels', 'Battery Powered', 'Outdoor'],
    createdAt: 1631046801011,
    inStock: false
  },
  {
    _id: 't117',
    name: 'Puzzle Cube',
    imgUrl: 'hardcoded-url-for-now',
    price: 30,
    labels: ['Puzzle', 'Box game', 'Art'],
    createdAt: 1631047801011,
    inStock: true
  },
  {
    _id: 't118',
    name: 'Outdoor Chalk Set',
    imgUrl: 'hardcoded-url-for-now',
    price: 28,
    labels: ['Art', 'Outdoor', 'Baby'],
    createdAt: 1631048801011,
    inStock: true
  },
  {
    _id: 't119',
    name: 'Battery Fire Truck',
    imgUrl: 'hardcoded-url-for-now',
    price: 140,
    labels: ['Battery Powered', 'On wheels', 'Box game'],
    createdAt: 1631049801011,
    inStock: true
  },
  {
    _id: 't120',
    name: 'Princess Doll Set',
    imgUrl: 'hardcoded-url-for-now',
    price: 110,
    labels: ['Doll', 'Baby', 'Puzzle'],
    createdAt: 1631050801011,
    inStock: false
  }
]

_createToys()

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getRandomToy,
  getDefaultFilter,
  getLabels
}

function query(filterBy = {}) {
  let { txt, maxPrice, labels, sortBy, stock } = filterBy
  console.log('query');
  
  return storageService.query(STORAGE_KEY)
    .then(toys => {

      if (txt) {
        const regex = new RegExp(txt, 'i')
        toys = toys.filter((toy) => regex.test(toy.name))
      }

      if (maxPrice) {
        toys = toys.filter((toy) => toy.price <= maxPrice)
      }
      
      if (labels) {
        const labelToFilter = labels
        toys = toys.filter((toy) =>
          toy.labels.some((label) =>
            label.includes(labelToFilter))
        )
      }

      if (sortBy) {
        if (sortBy === 'txt') {
          toys = toys.sort((a, b) => a.name.localeCompare(b.name))
        }
        else if (sortBy === 'price') {
          toys = toys.sort((a, b) => a.price - b.price)
        }
        else if (sortBy === 'created') {
          toys = toys.sort((a, b) => a.createdAt - b.createdAt)
        }

        // if (sortDir === -1) filtered.reverse()
      }

      if(stock) {
        console.log(stock);
        if (stock === 'true') toys = toys.filter((toy) => toy.inStock === true)
        if (stock === 'false') toys = toys.filter((toy) => toy.inStock === false)
      }

      return Promise.resolve(toys)
    })
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  // return Promise.reject('Not now!')
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    // when switching to backend - remove the next line
    // toy.owner = userService.getLoggedinUser()
    toy._id = utilService.makeId()
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 
      'Puzzle', 'Outdoor', 'Battery Powered']
    toy.labels = _getRandLabels(toy.name, labels)

    return storageService.post(STORAGE_KEY, toy)
  }
}

function getEmptyToy() {
  return {
    _id: '',
    name: '',
    price: '',
    imgUrl: 'hardcoded-url-for-now',
    inStock: true,
    labels: [],
    createdAt: Date.now()
  }
}

function getRandomToy() {
  return {
    name: _getRandToyName(),
    price: utilService.getRandomIntInclusive(20, 200),
    _id: '',
    imgUrl: 'hardcoded-url-for-now',
    inStock: true,
    labels: [],
    createdAt: Date.now()
  }
}

function getDefaultFilter() {
  return { txt: '', maxPrice: '', labels: '', sortBy: '', stock: '' }
}

function getLabels(toys) {
  if (!toys) return []
  return [
    ...new Set(toys.flatMap(toy =>
      Array.isArray(toy.labels) ?
        toy.labels : []))]
}

///////////////////////////////////////////////////////////////////////////

function _createToys() {
  let toys = utilService.loadFromStorage(STORAGE_KEY)
  if (!toys || !toys.length) {
    toys = gToys
    utilService.saveToStorage(STORAGE_KEY, toys)
  }
}

function _getRandLabels(name, labels) {
  const res = new Set()
  const match = labels.find(lbl =>
    lbl.toLowerCase().includes(name.toLowerCase())
  )
  if (match) res.add(match)

  while (res.size < 3) {
    const randomLabel = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
    res.add(randomLabel)
  }
  return [...res]
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
