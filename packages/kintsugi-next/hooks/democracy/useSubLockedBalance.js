import useApi from "next-common/utils/hooks/useApi";
import useIsMounted from "next-common/utils/hooks/useIsMounted";
import { useEffect, useState } from "react";

export default function useSubLockedBalance(address) {
  const api = useApi();
  const isMounted = useIsMounted();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!api || !address) {
      setBalance(0);
      return;
    }

    let unsub;
    api.query.escrow
      .locked(address, (rawBalance) => {
        setBalance(rawBalance.amount.toString());
      })
      .then((result) => (unsub = result));

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [api, isMounted, address]);

  return balance;
}
