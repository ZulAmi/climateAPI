const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

const ecommerces = [
    {
        name: 'amazon',
        address: '#',
        base: '#'
    },
    {
        name: 'shopee',
        address: '#',
        base: '#'
    },
    {
        name: 'lazada',
        address: '#',
        base: '#'
    },
    {
        name: 'carousell',
        address: '#',
        base: '#'
    },
]

const prices = []

ecommerces.forEach(ecommerce => {
    axios.get(ecommerce.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('a:contains("discount")').each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                prices.push({
                    title: title,
                    url: ecommerce.base + url,
                    source: ecommerces.name
                })
            })
        })

})

app
