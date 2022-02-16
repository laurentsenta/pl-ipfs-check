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
import { useLinkClickHandler, useSearchParams } from "react-router-dom";

const DEFAULT_BACKEND_URL = process.env.REACT_APP_DEFAULT_BACKEND_URL;

interface IParams {
  backend: string;
  cid: string;
  addr: string;
}

interface IResult {
  ConnectionError: string;
  PeerFoundInDHT: { [key: string]: number };
  CidInDHT: boolean;
  DataAvailableOverBitswap: {
    Duration: number;
    Found: boolean;
    Responded: boolean;
    Error: string;
  };
}

const isValidParams = (params: Partial<IParams>): params is IParams => {
  // To be expanded
  if (!params.addr || !params.backend || !params.cid) {
    return false;
  }
  return true;
};

const fetchCIDLogs = async (params: IParams): Promise<IResult> => {
  const queryString = `multiaddr=${params.addr}&cid=${params.cid}`;

  const url = `${params.backend}?${queryString}`;

  const r = await fetch(url, {
    method: "POST",
    headers: {},
  });

  if (r.ok) {
    return r.json();
  }

  throw await r.text();
};

const Message: React.FC<{
  title: string;
  content?: string;
  failure?: true;
  success?: true;
}> = ({ title, content, children, success }) => {
  const status = success ? "is-success" : "is-error";

  const [expanded, setExpanded] = useState(false);

  const toggle = useCallback(() => {
    setExpanded((x) => !x);
  }, [setExpanded]);

  const hasMore = content || children;

  return (
    <>
      <article className={`notification ${status}`}>
        <div className="header">
          <p>{title}</p>
          {hasMore && <a onClick={toggle}>Details</a>}
        </div>
        {expanded && hasMore && (
          <div className="body">
            {content}
            {children}
          </div>
        )}
      </article>
    </>
  );
};

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

  const s = (key: string, initial: string = "") => {
    const value = searchParams.get(key);
    return value ? value : initial;
  };

  const [addr, setAddr] = useState(s("addr"));
  const [cid, setCID] = useState(s("cid"));
  const [backend, setBackend] = useState(s("backend", DEFAULT_BACKEND_URL));
  const params = useMemo(
    () => omitBy({ addr, backend, cid }, isEmpty) as Partial<IParams>,
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
    // TODO: this effect is likely to run too often
    setSearchParams(params);
  }, [setSearchParams, params]);

  const mutation = useMutation(fetchCIDLogs);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (isValidParams(params)) {
        mutation.mutate(params);
      }
    },
    [mutation, params]
  );

  const canSubmit = isValidParams(params) && !mutation.isLoading;

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
              Run Test
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Clear</button>
          </div>
        </div>
      </form>

      {mutation.error && (
        <>
          <article className="message is-danger">
            <div className="message-header">
              <p>The request failed</p>
            </div>
            <div className="message-body">{`${mutation.error}`}</div>
          </article>
        </>
      )}
      {mutation.data && <Result data={mutation.data} />}
    </div>
  );
};
