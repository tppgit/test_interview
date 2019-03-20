'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')
const _ = require('lodash')

const table = 'products'

function isNoExisted(data) {
    return _.isUndefined(data) || _.isNull(data) || _.isEmpty(data)
}

module.exports = {

    get: (req, res) => {
        let whereClause = ''
        if(!isNoExisted(req.query)) {
            console.log("Query:", req.query)
            const {productId, name, color, price} = req.query
            whereClause += !isNoExisted(productId) ? " and productId='" + productId + "'" : ""
            whereClause += !isNoExisted(name) ? " and name like ('%" + name + "%')" : ""
            whereClause += !isNoExisted(color) ? " and color like ('%" + color + "%')" : ""
            whereClause += !isNoExisted(price) ? " and price='" + price + "'" : ""
        }
        let sql = 'SELECT * FROM products where 1=1' + whereClause
        console.log("SQL:", sql)
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let productId = req.params.productId;
        let sql = 'UPDATE products SET ? WHERE id = ?'
        db.query(sql, [data, productId], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO products SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}