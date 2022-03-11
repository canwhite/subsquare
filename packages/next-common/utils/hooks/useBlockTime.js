import { useEffect, useState } from "react";
import { getBlockTimeByHeight } from "../blockTime";

export default function useLatestBlockTime(api, blockHeight) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (api) {
      getBlockTimeByHeight(api, blockHeight).then((blockTime) =>
        setTime(blockTime)
      );
    }
  }, [api, blockHeight]);

  return time;
}
