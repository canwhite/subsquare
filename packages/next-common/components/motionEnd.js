import React from "react";
import { useSelector } from "react-redux";
import CountDown from "next-common/components/countDown";
import { useEstimateBlocksTime } from "next-common/utils/hooks";
import { bigNumber2Locale, isMotionEnded } from "next-common/utils";
import { finalizedHeightSelector } from "../store/reducers/chainSlice";

export default function MotionEnd({ motion, type = "full" }) {
  const currentFinalHeight = useSelector(finalizedHeightSelector);
  const motionEndHeight = motion?.voting?.end;
  const motionStartHeight = motion?.indexer?.blockHeight;
  const estimatedBlocksTime = useEstimateBlocksTime(
    currentFinalHeight - motionEndHeight
  );
  const motionEnd = isMotionEnded(motion);

  if (
    motionEnd ||
    !motionEndHeight ||
    !currentFinalHeight ||
    currentFinalHeight >= motionEndHeight ||
    !estimatedBlocksTime
  ) {
    return null;
  }

  const elapsePercent =
    (currentFinalHeight - motionStartHeight) /
    (motionEndHeight - motionStartHeight);
  return (
    <>
      <CountDown percent={parseInt(elapsePercent * 100)} />
      {type === "full" ? (
        <span>{`End in ${estimatedBlocksTime}, #${bigNumber2Locale(
          motionEndHeight.toString()
        )}`}</span>
      ) : type === "simple" ? (
        <span>{`End in ${estimatedBlocksTime}`}</span>
      ) : null}
    </>
  );
}
