const UZHRewardToken = artifacts.require("UZHRewardToken");
const UZHStableToken = artifacts.require("UZHStableToken");
const YieldFarm = artifacts.require("YieldFarm");

module.exports = async function(deployer, network, accounts) {
  // Deploy Stable Token
  await deployer.deploy(UZHStableToken);
  const uzhethToken = await UZHStableToken.deployed();

  // Deploy Amogus Token
  await deployer.deploy(UZHRewardToken);
  const uzhrewardToken = await UZHRewardToken.deployed();

  // Deploy YieldFarm
  await deployer.deploy(YieldFarm, uzhrewardToken.address, uzhethToken.address);
  const yieldFarm = await YieldFarm.deployed();

  // Transfer all tokens to YieldFarm (1 million)
  await uzhrewardToken.transfer(yieldFarm.address, "1000000000000000000000000");

  // Transfer 100 UZHETH Tokens to investor
  await uzhethToken.transfer(accounts[1], "100000000000000000000");
};
