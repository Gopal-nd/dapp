const hre = require("hardhat");

async function main() {

    const chai = await hre.ethers.getContractFactory("chai");
    const contract = await chai.deploy(); //instence of contract
  
    await contract.deployed();
    console.log("Address of contract:", contract.address);
}
main().catch((error) => {
    console.error("error is 56324", error);
    process.exitCode = 1;
  });
  