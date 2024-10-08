import Transaccion from "../operation/Transaccion.js";
import Category from "../tag/Category.js";

export default class User{
    static userData = [];
    static counterUser = 0;

    constructor(name, email, password){
        this._id = ++User.counterUser;
        this._name = name;
        this._email = email;
        this._password = password;
        this._transactions = new Transaccion();
        this._categories = new Category();
        User.userData.push(this);
    }

    getId(){
        return this._id;
    }

    getName(){
        return this._name;
    }

    getEmail(){
        return this._email;
    }

    getTransactions(){
        return this._transactions;
    }

    getCategories(){
        return this._categories;
    }

    setId(id){
        this._id = id;
    }

    static printUserData(){
        console.log("Lista de usuarios");
        for (let i = 0; i < User.userData.length; i++) {
            console.log(User.userData[i]);
        }
    }


    static validateUser(email, password){
        for (let i = 0; i < User.userData.length; i++) {
            if(User.userData[i]._email == email && User.userData[i]._password == password){

                return User.userData[i];
            }
        }
        return false;
    }

}