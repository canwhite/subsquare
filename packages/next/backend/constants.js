const SupportChains = [
  // "polkadot",
  "kusama",
  "karura",
];

const SS58Format = Object.freeze({
  Polkadot: 0,
  Kusama: 2,
  Karura: 8,
  Substrate: 42,
});

const ContentType = Object.freeze({
  Markdown: "markdown",
  Html: "html",
});

const PostTitleLengthLimitation = 160;

const TipStateMap = {
  NewTip: "Tipping",
  tip: "Tipping",
  TipRetracted: "Retracted",
  TipClosed: "Closed",
};


module.exports = {
  SupportChains,
  SS58Format,
  ContentType,
  PostTitleLengthLimitation,
  TipStateMap,
};
