import { DEFAULT_BACKEND_URL, fetchNodeIdentify, IParamsAddr } from "data";
import { isEmpty, omitBy } from "lodash-es";
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

export const IdentifyMyNode: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const s = (key: string, initial: string = ""): string => {
    const value = searchParams.get(key);
    return value ? value : initial;
  };

  const [addr, setAddr] = useState(s("addr"));
  const [backend, setBackend] = useState(s("backend", DEFAULT_BACKEND_URL));

  const params = useMemo(
    () => omitBy({ addr, backend }, isEmpty) as Partial<IParamsAddr>,
    [addr, backend]
  );

  const mutation = useMutation(fetchNodeIdentify);
  const canSubmit = true; // isValidParams(params) && !mutation.isLoading;

  const onChangeAddr: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setAddr(e.target.value);
    },
    [setAddr]
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
      mutation.mutate(params as any); // TODO: fix
    },
    [mutation, params]
  );

  return (
    <div className="block my-4">
      <h2 className="title is-4">Identify My Node</h2>
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
