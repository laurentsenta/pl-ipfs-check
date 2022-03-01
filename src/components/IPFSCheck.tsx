import {
  fetchFindCIDInDHT,
  fetchNodeIdentify,
  fetchPeerIDIsFound,
  fetchViaBitswap,
  isValidAddrParams,
  isValidCIDParams,
  isValidParams,
} from "data";
import { useCommonParams } from "data/useCommonParams";
import { FormEventHandler, useCallback } from "react";
import { useMutation } from "react-query";
import { Message } from "./Message";

export const IsMyContentAvailableInline: React.FC = () => {
  const { params, setAddr } = useCommonParams();
  const mutation = useMutation(fetchFindCIDInDHT);
  const canSubmit = isValidCIDParams(params) && !mutation.isLoading;

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (isValidCIDParams(params)) {
        mutation.mutate(params);
      }
    },
    [mutation, params]
  );

  const error =
    mutation.error ||
    mutation.data?.parseCIDError ||
    mutation.data?.findProvidersError;
  const data = mutation.error ? undefined : mutation.data?.providers;

  return (
    <div className="block">
      <div className="block my-4">
        <form onSubmit={onSubmit}>
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
          </div>
        </form>
      </div>
      <div className="block my-4">
        <h3 className="title is-4">Result</h3>
        {error && (
          <Message
            rawData={{ error: mutation.error, data: mutation.data }}
            failure
            title="The request failed"
            content={`${error}`}
          />
        )}
        {data && (
          <Message success title="Success" rawData={mutation.data}>
            <p>Our backend found {data.length} providers for this CID.</p>
            <ul>
              {data.map((k) => {
                return (
                  <li key={k.ID}>
                    Peer: {k.ID}
                    <br />
                    <ul>
                      {k.Addrs.map((a) => {
                        const onClick = () => {
                          setAddr(`${a}/p2p/${k.ID}`);
                        };
                        return (
                          <li onClick={onClick} key={a}>
                            {a}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </Message>
        )}
      </div>
    </div>
  );
};

export const IsMyNodeAccessibleInline: React.FC = () => {
  const { params } = useCommonParams();
  const mutation = useMutation(fetchNodeIdentify);
  const canSubmit = isValidAddrParams(params) && !mutation.isLoading;

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (isValidAddrParams(params)) {
        mutation.mutate(params);
      }
    },
    [mutation, params]
  );

  const data = mutation.error ? undefined : mutation.data;
  const error =
    mutation.error ||
    data?.connectToPeerError ||
    data?.identifyPeerError ||
    data?.parseAddressError ||
    data?.pingError;

  return (
    <div className="block">
      <div className="block my-4">
        <form onSubmit={onSubmit}>
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
          </div>
        </form>
      </div>
      <div className="block my-4">
        <h3 className="title is-4">Result:</h3>
        {error && (
          <Message
            failure
            title="The request failed"
            content={`${error}`}
            rawData={{ error: mutation.error, data: mutation.data }}
          />
        )}
        {!error && data && (
          <Message success title="Success" rawData={data}>
            <p>
              The backend was able to reach out to the node {data.id} in{" "}
              {data.pingDurationMS} milliseconds.
            </p>
            <p>
              The node advertised the following protocols:
              <ul>
                {data.protocols?.map((p) => {
                  return <li key={p}>{p}</li>;
                })}
              </ul>
            </p>
            <p>
              The node advertised the following addresses: TODO: reuse component
              above to make the addresses clickable.
              <ul>
                {data.addresses?.map((a) => {
                  return <li key={a}>{a}</li>;
                })}
              </ul>
            </p>
          </Message>
        )}
      </div>
    </div>
  );
};

export const IsMyNodeServingContentInline: React.FC = () => {
  const { params } = useCommonParams();
  const mutation = useMutation(fetchViaBitswap);
  const canSubmit = isValidParams(params) && !mutation.isLoading;

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (isValidParams(params)) {
        mutation.mutate(params);
      }
    },
    [mutation, params]
  );

  const data = mutation.error ? undefined : mutation.data;

  const error =
    mutation.error ||
    data?.parseAddressError ||
    data?.parseCIDError ||
    data?.getBlockError;

  return (
    <div className="block">
      <div className="block my-4">
        <form onSubmit={onSubmit}>
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
          </div>
        </form>
      </div>
      <div className="block my-4">
        <h3 className="title is-4">Result:</h3>
        {error && (
          <Message
            failure
            title="The request failed"
            content={`${error}`}
            rawData={{ error: mutation.error, data: mutation.data }}
          />
        )}
        {!error && data && (
          <Message success title="Success" rawData={data}>
            <p>
              The backend was able to retrieve the bitswap content in{" "}
              {data.durationMS} milliseconds. The payload was{" "}
              {data.blockSizeBytes} bytes.
            </p>
          </Message>
        )}
      </div>
    </div>
  );
};

export const IsMyContentAvailable: React.FC = () => {
  const { params, onChangeCID, onChangeBackend } = useCommonParams();
  const { cid, backend } = params;

  const mutation = useMutation(fetchFindCIDInDHT);
  const canSubmit = isValidCIDParams(params) && !mutation.isLoading;

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (isValidCIDParams(params)) {
        mutation.mutate(params);
      }
    },
    [mutation, params]
  );

  return (
    <div className="block my-4">
      <h2 className="title is-4">Is my content available?</h2>
      <div className="box my-4">
        <div className="content">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="columns">
          <div className="column is-5">
            <form onSubmit={onSubmit}>
              <div className="field">
                <label className="label">CID</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="bafy..."
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
              </div>
            </form>
          </div>
          <div className="column is-7">
            <h3 className="title is-4">Result:</h3>
            {mutation.error && (
              <Message
                failure
                title="The request failed"
                content={`${mutation.error}`}
              />
            )}
            {mutation.data && (
              <Message success title="Success">
                <pre>{JSON.stringify(mutation.data, undefined, 2)}</pre>
              </Message>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const IsMyNodeAccessible: React.FC = () => {
  const { params, onChangeAddr, onChangeBackend } = useCommonParams();
  const { addr, backend } = params;

  const mutation = useMutation(fetchPeerIDIsFound);
  const canSubmit = isValidAddrParams(params) && !mutation.isLoading;

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (isValidAddrParams(params)) {
        mutation.mutate(params);
      }
    },
    [mutation, params]
  );

  return (
    <div className="block my-4">
      <h2 className="title is-4">Is my node accessible?</h2>
      <div className="box my-4">
        <div className="content">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="columns">
          <div className="column is-5">
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
              </div>
            </form>
          </div>
          <div className="column is-7">
            <h3 className="title is-4">Result:</h3>
            {mutation.error && (
              <Message
                failure
                title="The request failed"
                content={`${mutation.error}`}
              />
            )}
            {mutation.data && (
              <Message success title="Success">
                <pre>{JSON.stringify(mutation.data, undefined, 2)}</pre>
              </Message>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const IsMyNodeServingContent: React.FC = () => {
  return (
    <>
      <div className="block my-4">
        <h2 className="title is-4">Is my node serving content?</h2>

        <div className="box columns my-4">
          <div className="column">
            <div className="content">
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="column">
            <h2>Result</h2>
          </div>
        </div>
      </div>
    </>
  );
};
