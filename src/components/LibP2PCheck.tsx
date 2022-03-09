import { fetchNodeIdentify, isValidAddrParams } from "data";
import { useCommonParams } from "data/useCommonParams";
import { FormEventHandler, useCallback, useState } from "react";
import { useMutation } from "react-query";
import { Message } from "./Message";

export const IdentifyMyNode: React.FC = () => {
  const { params, onChangeAddr, onChangeBackend } = useCommonParams();
  const { addr, backend } = params;

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

  return (
    <div className="block my-4">
      <h2 className="title is-4">Is my node configured correctly?</h2>
      <div className="box my-4">
        <div className="content">
          <p>
            Check to see if a third party Backend URl can access a Multiaddress
          </p>
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
            <div>
              <h2 className="title">Result:</h2>
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
            {mutation.error && <Troubleshooting />}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Troubleshooting: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const makeSetter = (x: number) => () => setActiveTab(x);

  return (
    <div>
      <span>Active tag is: {activeTab}</span>
      <h3 className="title is-4">Troubleshooting Steps:</h3>
      <div className="tabs">
        <ul>
          <li className="is-active">
            <a onClick={makeSetter(0)}>Check Node</a>
          </li>
          <li>
            <a onClick={makeSetter(1)}>Check NAT</a>
          </li>
          <li>
            <a onClick={makeSetter(2)}>Hole Punching</a>
          </li>
        </ul>
      </div>
      {activeTab === 0 && (
        <div className="content">
          <p>
            Is it your Node? Try running <code>ipfs daemon</code>. <br />
            If you get the error: <i>someone else has the lock</i> restart with:
            <br />
            <ul>
              <li>
                <code>killall ipfs</code>
              </li>
              <li>
                <code>ipfs daemon</code>
              </li>
            </ul>
          </p>
        </div>
      )}
      {activeTab === 1 && (
        <p>
          Are you having issues connecting peer-to-peer because of a NAT? Try{" "}
          <code>ipfs daemon</code>. <br />
        </p>
      )}
      {activeTab == 2 && (
        <div className="content">
          <p>
            Is it your X? Try running <code>this code</code>. <br />
          </p>
        </div>
      )}
    </div>
  );
};
