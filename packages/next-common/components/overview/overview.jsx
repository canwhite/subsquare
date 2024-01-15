import AccountInfo from "./accountInfo";
import ActiveProposals from "./activeProposals";
import { useChainSettings } from "next-common/context/chain";
import TreasuryState from "./treasuryState";

export default function Overview() {
  const { showAccountManagementTab, hasDotreasury } = useChainSettings();

  return (
    <div className="space-y-6">
      <AccountInfo hideManageAccountLink={showAccountManagementTab === false} />

      {hasDotreasury && <TreasuryState />}

      <div>
        <ActiveProposals />
        {/* news */}
      </div>
    </div>
  );
}
