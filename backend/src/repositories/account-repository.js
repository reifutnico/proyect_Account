import pg from "pg";
import { DBConfig } from "./db.js";

export default class AccountRepository {
    constructor() {
        const { Client } = pg;
        this.DBClient = new Client(DBConfig);
        this.DBClient.connect();
    }

    async getUser(user, password) {
        let returnEntity = null;
        try {
            const sql = "SELECT * FROM users WHERE username = $1 AND password_hash = $2";
            const values = [user, password];
            const result = await this.DBClient.query(sql, values);
            if (result.rows.length > 0) {
                returnEntity = result.rows[0];
            }
        } catch (error) {
            console.log("Error in getUser:", error);
            throw error;
        }
        return returnEntity;
    }

    async registerUser(username, email, passwordHash) {
        try {
            const sql = 'INSERT INTO users (username, email, password_hash, role_id) VALUES ($1, $2, $3, $4) RETURNING *';
            const values = [username, email, passwordHash, 2]; 
            const result = await this.DBClient.query(sql, values);
            return result.rows[0]; 
        } catch (error) {
            console.log("Error in registerUser:", error);
            throw error;
        }
    }

    async registerPendingUser(username, email, passwordHash) {
        try {
            const sql = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *';
            const values = [username, email, passwordHash]; 
            const result = await this.DBClient.query(sql, values);
            await this.deletePendingUser(email);
            return result.rows[0]; 
        } catch (error) {
            console.log("Error in registerUser:", error);
            throw error;
        }
    }

    
    async deletePendingUser(email) {
        try {
            const sql = 'DELETE FROM pending_users WHERE email = $1';
            const values = [email]; 
            const result = await this.DBClient.query(sql, values);
            return result.rows[0]; 
        } catch (error) {
            console.log("Error in deletePendingUser:", error);
            throw error;
        }
    }
    async getPendingUser(email) {
        try {
            const sql = 'SELECT * FROM pending_users WHERE email = $1';
            const values = [email]; 
            const result = await this.DBClient.query(sql, values);
            return result.rows[0]; 
        } catch (error) {
            console.log("Error in getPendingUser:", error);
            throw error;
        }
    }

    
    async confirmUser(email) {
        try {
            const sql = 'INSERT INTO users (username, email, password_hash, role_id) VALUES ($1, $2, $3, $4) RETURNING *';
            const values = [username, email, passwordHash, 2]; 
            const result = await this.DBClient.query(sql, values);
            return result.rows[0]; 
        } catch (error) {
            console.log("Error in registerUser:", error);
            throw error;
        }
    }

    async closeConnection() {
        await this.DBClient.end();
    }
}
