import { DEFAULT_BACKEND_URL, IParamsAddrAndCID } from "data";
import { isEmpty, omitBy } from "lodash-es";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

export const useCommonParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const s = (key: string, initial: string = ""): string => {
    const value = searchParams.get(key);
    return value ? value : initial;
  };

  const [addr, setAddr] = useState(s("addr"));
  const [backend, setBackend] = useState(s("backend", DEFAULT_BACKEND_URL));
  const [cid, setCID] = useState(s("cid"));

  const params = useMemo(
    () => omitBy({ addr, backend, cid }, isEmpty) as Partial<IParamsAddrAndCID>,
    [addr, backend, cid]
  );

  const onChangeAddr: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setAddr(e.target.value);
    },
    [setAddr]
  );

  const onChangeCID: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setCID(e.target.value);
    },
    [setCID]
  );

  const onChangeBackend: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setBackend(e.target.value);
    },
    [setBackend]
  );

  useEffect(() => {
    setSearchParams(params);
  }, [setSearchParams, params]);

  return {
    params,
    onChangeAddr,
    onChangeBackend,
    onChangeCID,
  };
};
