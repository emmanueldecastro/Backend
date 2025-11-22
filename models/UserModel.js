import pool from "../config/db.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (name, email, password) => {
    if(name.trim() === '' || 
        email.trim() === '' || 
        password.trim() === '') {
        const error = new TypeError(
            'Name, Email and Password are required.'
        )
        error.statusCode = 400;
        throw error;
    }

    if(!validator.isEmail(email)){
        const error = new TypeError('Invalid email Address.')
        error.statusCode = 400;
        throw error;
    }

    if(!validator.isStrongPassword(password)){
        const error = new TypeError('Password is not strong enough.')
        error.statusCode = 400;
        throw error;
    }

    const [user] = await pool.query("SELECT Email FROM tbluser WHERE Email = ?", [email]);

    if(user.length === 1){
        const error = new TypeError(`The email ${email} is already used.`)
        error.statusCode = 400;
        throw error;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const [newUser] = await pool.query(
        "INSERT INTO tbluser (Name, Email, Password) VALUES (?, ?, ?)", [name, email, hashedPassword]
    );

    return newUser;
}

export const loginUser = async (email, password) => {
    if(email.trim() === '' || 
        password.trim() === '') {
        const error = new TypeError(
            'Email and Password are required.'
        )
        error.statusCode = 400;
        throw error;
    }

    const [user] = await pool.query("SELECT * FROM tbluser WHERE Email = ?", [email]);

    if(user.length === 0){ 
        const error = new TypeError(`An account with email ${email} does not exist.`)
        error.statusCode = 400;
        throw error;
    }

    if(!bcrypt.compareSync(password, user[0].Password)){
        const error = new TypeError('Incorrect password.')
        error.statusCode = 400;
        throw error;
    }

    const token = jwt.sign(
        {id: user[0].id},
            process.env.SECRET,
            {expiresIn: '1d'}
    );

    return token;

}

export const getUser = async (id) => {
    if(parseInt(id) === NaN){
        throw new Error('Invalid ID.');
    }

    const [user] = await pool.query('SELECT * FROM tbluser WHERE Id = ?', [id]);

    return user;
}   