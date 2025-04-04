import SummaryItem from "next-common/components/summary/layout/item";
import Link from "next/link";
import LoadableContent from "next-common/components/common/loadableContent";
import NativeTokenSymbolAsset from "../common/nativeTokenSymbolAsset";
import FiatPriceLabel from "../common/fiatPriceLabel";
import { usePolkadotTreasury } from "next-common/context/treasury/polkadotTreasury";
import Tooltip from "next-common/components/tooltip";

const TARGET_LINK = "https://polkadot.subsquare.io/treasury/bounties";

export default function Bounties() {
  const {
    bountiesCount,
    dotTreasuryBalanceOnBounties: dot,
    isDotTreasuryBalanceOnBountiesLoading: isLoading,
  } = usePolkadotTreasury();

  const Title = (
    <>
      <Link
        href={TARGET_LINK}
        className="text12Medium text-textTertiary hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Bounties
      </Link>
      {isLoading ? null : (
        <>
          <span>{" · "}</span>
          <Tooltip content="Approved bounties">
            <span>{bountiesCount}</span>
          </Tooltip>
        </>
      )}
    </>
  );

  return (
    <SummaryItem title={Title}>
      <LoadableContent isLoading={isLoading}>
        <div className="flex flex-col gap-[4px]">
          <div>
            <FiatPriceLabel free={dot} />
          </div>
          <div className="flex flex-col gap-y-1 !ml-0">
            <NativeTokenSymbolAsset free={dot} />
          </div>
        </div>
      </LoadableContent>
    </SummaryItem>
  );
}
