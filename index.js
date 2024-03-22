
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";


const connectionButtom = document.getElementById("connectionButtom")
const fundMeButtom= document.getElementById("fundMeButtom")

connectionButtom.onclick = connect
fundMeButtom.onclick = fund
async function connect(){
    if(typeof window.ethereum!=undefined        ){
        window.ethereum.request({method:"eth_requestAccounts"});
        console.log("connect success")
        connectionButtom.innerHTML="Connected!";
    }else{
        connectionButtom.innerHTML="Please install MetaMask";
    }
}


async function fund(etherAmount){


}