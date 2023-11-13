// 1CT
// 1. 生成主钱包
// 2. 签名personal-sign生成公钥
// 3. sha3签名结果，生成私钥
// 4. 导出地址

const {
    ethers
} = require("ethers")

const init =async ()=>{
    const baseWallet = new ethers.Wallet.createRandom()
    console.log('address ', baseWallet.address)
    console.log('private ',baseWallet.privateKey)
    console.log('public ', baseWallet.publicKey)
}





init()