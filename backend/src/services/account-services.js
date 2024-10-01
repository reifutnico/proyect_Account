import { query } from "express";

import AccountRepository from "../repositories/account-repository.js";
import login from "../auth/login.js";
const AccountRepositories= new AccountRepository();
import bcrypt from "bcrypt";

export default class AccountServices {


    async login(user, pass) {
      try {
          const userRecord = await this.getUserByPayload(user);  
          if (!userRecord) {
              return false;
          }
          const isMatch = await bcrypt.compare(pass, userRecord.password_hash);
          if (isMatch) {
              const token = await login(userRecord)  
              return token;
          } else {
              return false;
          }
      } catch (error) {
          console.log(error);
          throw error;  
      }
  }
  

    async getUserByPayload(user){
        return await AccountRepositories.findUserByUsername(user) 
      }

      async registerPendingUser(username, email, passwordHash)
      {
        console.log("entre registerPendingUser");
        
      await AccountRepositories.registerPendingUser(username, email, passwordHash);
      return "inserted registerPendingUser";
      }

      async getPendingUser(email)
      {
      const response = await AccountRepositories.getPendingUser(email);
      return response;
      }

      
      async getUserByIdToken(id)
      {
      const response = await AccountRepositories.getUserByIdToken(id);
      return response;
      }



      async registerUser(username, email, passwordHash)
        {
        await AccountRepositories.registerUser(username, email, passwordHash);
        return "inserted";
        }


        async confirmUser(email) { 
          const result = await AccountRepositories.confirmUser(email);
          return result;
      }
}