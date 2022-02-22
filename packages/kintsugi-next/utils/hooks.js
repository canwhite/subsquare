import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentNodeSelector } from "store/reducers/nodeSlice";
import { getAddressVote, getElectorate } from "./referendumUtil";
import useChainApi from "next-common/utils/hooks/useApi";
import useIsMounted from "next-common/utils/hooks/useIsMounted";
import { getVotingBalance } from "./escrow/votingBalance";

export function useForm(initialState = {}, onSubmit, clearError) {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (clearError) clearError();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const reset = () => {
    setFormData(initialState);
  };

  return { formData, handleInputChange, handleSubmit, reset };
}

export function useApi(chain) {
  const nodeUrl = useSelector(currentNodeSelector);
  return useChainApi(chain, nodeUrl);
}

export function useElectorate(height) {
  const api = useApi("kintsugi");
  const [electorate, setElectorate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();
  useEffect(() => {
    if (api) {
      setIsLoading(true);
      getElectorate(api, height)
        .then((value) => {
          if (isMounted.current) {
            setElectorate(value);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [api, height]);
  return [electorate, isLoading];
}

export function useLoaded(isLoading) {
  const [loadStatus, setLoadStatus] = useState(0);
  useEffect(() => {
    if (loadStatus === 0 && isLoading) {
      setLoadStatus(1);
    }
    if (loadStatus === 1 && !isLoading) {
      setLoadStatus(2);
    }
  }, [isLoading]);
  return loadStatus === 2;
}

export function useAddressVotingBalance(address) {
  const api = useApi("kintsugi");
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();
  useEffect(() => {
    if (api && address) {
      setIsLoading(true);
      getVotingBalance(api, address)
        .then((value) => {
          if (isMounted.current) {
            setBalance(value);
          }
        })
        .finally(() => {
          if (isMounted.current) {
            setIsLoading(false);
          }
        });
    }
  }, [api, address]);
  return [balance, isLoading];
}

export function useAddressVote(referendumIndex, address) {
  const api = useApi("kintsugi");
  const [vote, setVote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();
  useEffect(() => {
    if (api && address) {
      setIsLoading(true);
      getAddressVote(api, referendumIndex, address)
        .then((vote) => {
          if (isMounted.current) {
            setVote(vote);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [api, referendumIndex, address]);
  return [vote, isLoading];
}
