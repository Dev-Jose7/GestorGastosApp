import User from "../controllers/account/User.js";
import { completeInput, initSession, instanceTransaction } from "../../assets/js/util.js";

let admin = new User("José", "jfnr398", "1234");
let admin1 = new User("Fernando", "fercho398", "4321");

instanceTransaction(admin);
instanceTransaction(admin1);

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputs = document.querySelectorAll("input[id]");
const statusLogin = document.getElementById("statusLogin");

User.printUserData();
document.querySelector("input[type = 'submit']").addEventListener("click", function(e){
    e.preventDefault();
    let status = completeInput(inputs);
    if(status){
        let account = User.validateUser(inputEmail.value, inputPassword.value);
        console.log(account)
        let session = initSession(account);
        if(session){
            statusLogin.textContent = "Acceso autorizado"
        } else {
            statusLogin.textContent = "Credenciales incorrectas"
        }
    } else {
        statusLogin.textContent = "Complete los campos faltantes"
    }

    setTimeout(() => {
        statusLogin.textContent = ""
    }, 3000);
});