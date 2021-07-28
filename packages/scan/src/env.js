const CHAINS = {
  KARURA: "karura",
};

function currentChain() {
  const allChains = Object.values(CHAINS);

  if (allChains.includes(process.env.CHAIN)) {
    return process.env.CHAIN;
  } else {
    return CHAINS.KARURA;
  }
}

module.exports = {
  currentChain,
  CHAINS,
};
