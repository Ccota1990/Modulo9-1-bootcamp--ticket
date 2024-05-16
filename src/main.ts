import { productos } from "./modelo";
import "./style.css";
import { calculaTicket } from "./ticket-compra";



const ticket = calculaTicket(productos);
console.log(ticket)