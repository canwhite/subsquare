import { useOnchainData } from "next-common/context/post";
import { useState } from "react";
import SecondaryButton from "next-common/components/buttons/secondaryButton";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { latestHeightSelector } from "next-common/store/reducers/chainSlice";
import ClaimedInfo from "./ClaimedInfo";
import { childBountyStatusSelector } from "next-common/store/reducers/childBountySlice";

const Popup = dynamic(() => import("../popup"), {
  ssr: false,
});

export default function Claim() {
  const onChain = useOnchainData();
  const [showPopup, setShowPopup] = useState(false);
  const chainHeight = useSelector(latestHeightSelector);

  const status = useSelector(childBountyStatusSelector);
  if (!status || !status.pendingPayout) {
    return <ClaimedInfo />;
  }

  const { unlockAt } = status.pendingPayout || {};

  return <>
    <SecondaryButton
      isFill
      disabled={chainHeight < unlockAt}
      onClick={() => setShowPopup(true)}>
      Claim
    </SecondaryButton>

    {showPopup && (
      <Popup
        childBounty={onChain}
        onClose={() => setShowPopup(false)}
      />
    )}
  </>;
}
