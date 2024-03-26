
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
import { abi, contractAddresss } from "./constant.js";

const connectionButtom = document.getElementById("connectionButtom")
const fundMeButtom = document.getElementById("fundMeButtom")

connectionButtom.onclick = connect
fundMeButtom.onclick = fund
async function connect() {
    if (typeof window.ethereum != undefined) {
        window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("connect success")
        connectionButtom.innerHTML = "Connected!";
    } else {
        connectionButtom.innerHTML = "Please install MetaMask";
    }
}


async function fund() {
    if (typeof window.ethereum != undefined) {
        const etherAmount = "77";
        const provider = new ethers.BrowserProvider(window.ethereum);
        //当前链接登陆的metamask的账户
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddresss, abi, signer);
        console.log(contract)
        const transactionResponse = await contract.fund({ value: ethers.parseUnits(etherAmount) });
    }
}