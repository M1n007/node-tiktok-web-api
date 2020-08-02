const fetch = require('node-fetch');

const nodeFetch = {
    post: (uri, payload = {}, headers = {}) => new Promise((resolve, reject) => {
        fetch(uri, {
            method:'POST',
            headers: headers,
            body:payload
        })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    }),
    get: (uri, headers = {}) => new Promise((resolve, reject) => {
        fetch(uri, {
            method:'GET',
            headers: headers
        })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

module.exports = { nodeFetch }