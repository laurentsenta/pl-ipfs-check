import isEmpty from "lodash-es/isEmpty";
import omitBy from "lodash-es/omitBy";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_BACKEND_URL = process.env.REACT_APP_DEFAULT_BACKEND_URL;

export const CheckCID: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const s = (key: string, initial: string = "") => {
    const value = searchParams.get(key);
    return value ? value : initial;
  };

  const [addr, setAddr] = useState(s("addr"));
  const [cid, setCID] = useState(s("cid"));
  const [backend, setBackend] = useState(s("backend", DEFAULT_BACKEND_URL));

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
    const params = omitBy({ addr, backend, cid }, isEmpty);
    setSearchParams(params);
  }, [setSearchParams, addr, backend, cid]);

  return (
    <div className="block p-4">
      <div className="field">
        <label className="label">Multiaddr</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="/p2p/Qm..."
            value={addr}
            onChange={onChangeAddr}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">CID</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="QmData..."
            value={cid}
            onChange={onChangeCID}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Backend URL</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={backend}
            onChange={onChangeBackend}
          />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" type="submit">
            Run Test
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Clear</button>
        </div>
      </div>
      {}
    </div>
  );
};
