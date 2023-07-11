const express = require("express");

const User = require("../models/User.model");
const router = express.Router();
const bcrypt = require("bcryptjs");


router.get('/main', (req, res) => {
    res.render('auth/main')
})

router.get('/private', (req, res) => {
    res.render('auth/private')
})