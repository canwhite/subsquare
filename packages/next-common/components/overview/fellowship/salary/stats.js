import useSubFellowshipSalaryStats from "next-common/hooks/fellowship/salary/useSubFellowshipSalaryStats";
import useFellowshipSalaryPeriods from "next-common/hooks/fellowship/salary/useFellowshipSalaryPeriods";
import Summary from "next-common/components/summary/v2/base";
import { useSalaryAsset } from "next-common/hooks/useSalaryAsset";
import { cn } from "next-common/utils";
import isNil from "lodash.isnil";
import chunk from "lodash.chunk";
import { useNavCollapsed } from "next-common/context/nav";
import LoadableContent from "next-common/components/common/loadableContent";
import RemainLabel from "./remainLabel";
import getCycleIndexSummaryItem from "next-common/components/fellowship/salary/cycles/summary";
import getCycleBudgetSummaryItem from "next-common/components/fellowship/salary/cycles/summary/budget";
import getCycleRegistrationSummaryItem from "next-common/components/fellowship/salary/cycles/summary/registration";
import getCycleUnregisteredPaidSummaryItem from "next-common/components/fellowship/salary/cycles/summary/unregisteredPaid";
import getCyclePotSummaryItem from "next-common/components/fellowship/salary/cycles/summary/pot";
import getCycleTotalPeriodSummaryItem from "next-common/components/fellowship/salary/cycles/summary/totalPeriod";
import { useCalcPeriodBlocks } from "next-common/hooks/useCalcPeriodBlocks";

export default function FellowshipSalaryStats() {
  const [navCollapsed] = useNavCollapsed();
  const stats = useSubFellowshipSalaryStats();
  const { registrationPeriod, payoutPeriod } = useFellowshipSalaryPeriods();
  const { decimals, symbol } = useSalaryAsset();

  const budgetValue = stats?.budget;
  const totalRegistrationsValue = stats?.totalRegistrations;
  const totalUnregisteredPaidValue = stats?.totalUnregisteredPaid;
  let potValue =
    budgetValue - totalUnregisteredPaidValue - totalRegistrationsValue || null;
  potValue = potValue < 0 ? 0 : potValue;

  const totalCyclePeriod = registrationPeriod + payoutPeriod || null;
  const cycleStartAt = stats?.cycleStart || null;
  const payoutStartAt = cycleStartAt + registrationPeriod || null;

  const registrationPeriodData = useCalcPeriodBlocks(
    registrationPeriod,
    cycleStartAt,
  );
  const payoutPeriodData = useCalcPeriodBlocks(payoutPeriod, payoutStartAt);

  const cyclePeriodData = useCalcPeriodBlocks(totalCyclePeriod, cycleStartAt);
  const [totalPeriodDay] = chunk(cyclePeriodData.totalPeriodTime.split(" "), 2);

  const desktopPlaceholderVisibleItem = {
    className: cn(navCollapsed ? "max-sm:hidden" : "max-md:hidden"),
  };
  const mobilePlaceholderVisibleItem = {
    className: cn(navCollapsed ? "sm:hidden" : "md:hidden"),
  };

  const cycleIndexItem = getCycleIndexSummaryItem(stats?.cycleIndex);
  const budgetItem = getCycleBudgetSummaryItem(budgetValue, decimals, symbol);
  const totalRegistrationsItem = getCycleRegistrationSummaryItem(
    totalRegistrationsValue,
    decimals,
    symbol,
  );

  const totalPeriodItem = getCycleTotalPeriodSummaryItem(
    totalCyclePeriod,
    totalPeriodDay,
    cyclePeriodData.gonePercentage,
    cyclePeriodData.remainBlocks,
  );

  const totalUnregisteredPaidItem = getCycleUnregisteredPaidSummaryItem(
    totalUnregisteredPaidValue,
    decimals,
    symbol,
  );
  const potItem = getCyclePotSummaryItem(potValue, decimals, symbol);

  const timeItem = {
    content: (
      <LoadableContent isLoading={isNil(totalCyclePeriod)}>
        <div className="space-y-1">
          <RemainLabel
            percentage={registrationPeriodData.gonePercentage}
            label={"Registration"}
            remain={registrationPeriodData.remainBlocks}
            time={registrationPeriodData.totalPeriodTime.split(" ")}
          />
          <RemainLabel
            percentage={payoutPeriodData.gonePercentage}
            label={"Payout"}
            remain={payoutPeriodData.remainBlocks}
            time={payoutPeriodData.totalPeriodTime.split(" ")}
          />
        </div>
      </LoadableContent>
    ),
  };

  const desktopSummaryItems = [
    cycleIndexItem,
    budgetItem,
    potItem,
    totalPeriodItem,
    desktopPlaceholderVisibleItem,
    totalRegistrationsItem,
    totalUnregisteredPaidItem,
    mobilePlaceholderVisibleItem,
    timeItem,
  ];

  const mobileSummaryItems = [
    cycleIndexItem,
    mobilePlaceholderVisibleItem,
    budgetItem,
    potItem,
    totalRegistrationsItem,
    totalUnregisteredPaidItem,
    totalPeriodItem,
    desktopPlaceholderVisibleItem,
    timeItem,
  ];

  return (
    <>
      <Summary
        items={desktopSummaryItems}
        className={desktopPlaceholderVisibleItem.className}
      />
      <Summary
        items={mobileSummaryItems}
        className={mobilePlaceholderVisibleItem.className}
      />
    </>
  );
}
