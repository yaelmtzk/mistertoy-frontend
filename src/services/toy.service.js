
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
    getRandomToy
}


function query(filterBy = {}) {
    console.log('query:')
    return httpService.get(BASE_URL, { params: filterBy })
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
        vendor: 'Puzzle' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000)
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '', minSpeed: '' }
}



