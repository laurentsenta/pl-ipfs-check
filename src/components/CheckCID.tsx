import {
  DEFAULT_BACKEND_URL,
  fetchCIDLogs,
  IParamsAddrAndCID,
  IResult,
  isValidParams,
} from "data";
import isEmpty from "lodash-es/isEmpty";
import omitBy from "lodash-es/omitBy";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMutation } from "react-query";
import { useSearchParams } from "react-router-dom";
import { Message } from "./Message";

const Result: React.FC<{ data: IResult }> = ({ data }) => {
  return (
    <>
      {data.ConnectionError !== "" ? (
        <Message
          failure
          title="Could not connect to multiaddr"
          content={data.ConnectionError}
        />
      ) : (
        <Message success title="Successfully connected to multiaddr" />
      )}
      {isEmpty(data.PeerFoundInDHT) ? (
        <Message
          failure
          title="Could not find any multiaddrs in the dht"
          content={data.ConnectionError}
        />
      ) : (
        <Message success title="Found multiaddrs advertised in the DHT">
          <ul>
            {Object.entries(data.PeerFoundInDHT).map(([peerAddr, value]) => (
              <li key={peerAddr}>{peerAddr}</li>
            ))}
          </ul>
        </Message>
        // TODO: port the idea of finding your address in the multiaddress (l.137 from original web)
      )}
      {!data.CidInDHT ? (
        <Message failure title="Could not find the multihash in the DHT" />
      ) : (
        <Message success title="Found multihash advertised in the DHT" />
      )}
      {data.DataAvailableOverBitswap.Error ? (
        <Message
          failure
          title="There was an error downloading the CID from the peer"
          content={data.DataAvailableOverBitswap.Error}
        />
      ) : (
        <Message success title="The data is available over bitswap" />
        // TODO: port back the other checks
      )}
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </>
  );
};

export const CheckCID: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const s = (key: string, initial: string = ""): string => {
    const value = searchParams.get(key);
    return value ? value : initial;
  };

  const [addr, setAddr] = useState(s("addr"));
  const [cid, setCID] = useState(s("cid"));
  const [backend, setBackend] = useState(s("backend", DEFAULT_BACKEND_URL));

  const params = useMemo(
    () => omitBy({ addr, backend, cid }, isEmpty) as Partial<IParamsAddrAndCID>,
    [addr, backend, cid]
  );

  const mutation = useMutation(fetchCIDLogs);
  const canSubmit = isValidParams(params) && !mutation.isLoading;

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

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (isValidParams(params)) {
        mutation.mutate(params);
      }
    },
    [mutation, params]
  );

  return (
    <div className="block p-4">
      <form onSubmit={onSubmit}>
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
            <button
              className="button is-link"
              type="submit"
              disabled={!canSubmit}
            >
              {mutation.isLoading ? "Loading..." : "Run Test"}
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Clear</button>
          </div>
        </div>
      </form>
      {mutation.error && (
        <Message
          failure
          title="The request failed"
          content={`${mutation.error}`}
        />
      )}
      {mutation.data && <Result data={mutation.data} />}
    </div>
  );
};
