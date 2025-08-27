import { pool } from '../db.js';
import Joi from 'joi';

const createSchema = joi.object({
    user_id: joi.number().integer().required(),
    experience_id:joi.number().integer().required(),
    quotes:joi.number().integer().min(1).required(),
    booking_status_name: joi_string().valid('pending','confirmed','cancelled','rejected').optional()
});

const updateSchema = joi.object({
    quotes: joi.number().integer().min(1).optional(),
    booking_status_name: joi_string().valid('pending','confirmed','cancelled','rejected').optional()
}).min(1);


async function getStautsIdByName(name, conn = pool){
    const [[row]] = await conn.query(
        'SELECT booking_status_id AS id FROM booking_status WHERE booking_status_name = ?', [name]
    ); 
    if(!row) throw new Error(`Estado inválido: ${name}`);
    return row.id;  
}

async function FkExits(conn,table, idField, idValue) {
    const [[row]] = await conn.query(`SELECT 1 FROM ${table} WHERE ${idField}=?`, [idValue]);
    return !!row;    
}

export async function getAllBoikings(req, res) {
    try{
        const [rows] = await pool.query(`
            SELECT b.booking_id, b.user_id, b.experience_id, b.quotes,
                s.booking_status_name AS status,
                b.created_at, b.updated_at
            FROM bookings b
            LEFT JOIN booking_status s ON s.booking_status_id = b.booking_status_id
            ORDER BY b.created_at DESC
        `);
        res.json(rows);
    } catch (err){
        res.status(500).json({message: err.message});
    }
}