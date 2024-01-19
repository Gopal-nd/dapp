// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}
async function cosoleBalance(addresses) {
  let count = 0;
  for (const add of addresses) {
    console.log(`Adress ${count} balance:`, await getBalance(add));
    count += 1;
  }
}
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.table(
      `At ${timestamp},name ${name},address ${from}, message ${message}`
    );
  }
}
async function main() {
  const [owner, form1, form2, form3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("chai");
  const contract = await chai.deploy(); //instence of contract

  await contract.deployed();
  console.log("Address of contract:", contract.address);

  const addresses = [owner.address, form1.address, form2.address, form3.address]; //contract.address
  console.log("Before Buying");
  await cosoleBalance(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  const amazing = "best of cource";
  await contract.connect(form1).buyChai("form1", amazing, amount);
  await contract.connect(form2).buyChai("form2", amazing, amount);
  await contract.connect(form3).buyChai("form3", amazing, amount);

  console.log("after Buying");
  await cosoleBalance(addresses);

  const memos = await contract.getMemose()
  consoleMemos(memos)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error("error is 56324", error);
  process.exitCode = 1;
});
