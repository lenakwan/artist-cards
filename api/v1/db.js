const express = require("express");
const {
  Pool
} = require('pg');
const port = process.env.PORT || 3000;



const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})



module.exports.pool = pool;