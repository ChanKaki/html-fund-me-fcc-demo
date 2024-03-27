
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
import { abi, contractAddresss } from "./constant.js";

const connectionButtom = document.getElementById("connectionButtom")
const fundMeButtom = document.getElementById("fundMeButtom")
const getBalance = document.getElementById("getBalance")
const withdrawButtom = document.getElementById("withDrawButtom")

connectionButtom.onclick = connect
fundMeButtom.onclick = fund
getBalance.onclick = balance
withdrawButtom.onclick = withdraw


async function withdraw() {
    if (typeof window.ethereum != undefined) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        //当前链接登陆的metamask的账户
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddresss, abi, signer);
        try {
            const transactionResponse = await contract.withdraw();
            console.log(">>>> transactionResponse", transactionResponse);
            await listenForTransaction(transactionResponse, provider);
            console.log("withdraw Done!");
        } catch (error) {
            console.log(error);
        }

    }
}

async function connect() {
    if (typeof window.ethereum != undefined) {
        window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("connect success")
        connectionButtom.innerHTML = "Connected!";
    } else {
        connectionButtom.innerHTML = "Please install MetaMask";
    }
}


async function balance() {
    if (typeof window.ethereum != undefined) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balanceAmount = await provider.getBalance(contractAddresss);
        console.log("balance >>>>", ethers.formatEther(balanceAmount));
    }
}

async function fund() {
    if (typeof window.ethereum != undefined) {
        const etherAmount = document.getElementById("ethAmount").value;
        const provider = new ethers.BrowserProvider(window.ethereum);
        //当前链接登陆的metamask的账户
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddresss, abi, signer);
        try {
            const transactionResponse = await contract.fund({ value: ethers.parseUnits(etherAmount) });
            console.log(">>>> transactionResponse", transactionResponse);
            await listenForTransaction(transactionResponse, provider);
            console.log("Done!");
        } catch (error) {
            console.log(error);
        }

    }
}

function listenForTransaction(transactionResponse, provider) {
    return new Promise((resolve, reject) => {
        //process by own thread
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log("complete", transactionReceipt)
            resolve();
        })

    })

}