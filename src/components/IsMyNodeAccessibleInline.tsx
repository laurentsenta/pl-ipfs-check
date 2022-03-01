import { fetchNodeIdentify, isValidAddrParams } from "data";
import { useCommonParams } from "data/useCommonParams";
import { FormEventHandler, useCallback } from "react";
import { useMutation } from "react-query";
import { ClickablePeerAddrList } from "./ClickablePeerAddrList";
import { Message } from "./Message";
import { ResultTitle } from "./ResultTitle";

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
        <ResultTitle
          raw={{ error: mutation.error, data: mutation.data }}
          error={!!error}
          success={!!data}
        />
        {error && (
          <Message failure title="An error occured">
            <div className="content">
              <p>
                The backend couldn't reach out to your node. It failed with the
                following error: <br />
                <strong>{`${error}`}</strong>
              </p>
              <p>
                Tips to fix it:
                <ul>
                  <li>
                    check that the node can be reached from the outside. [SEE
                    NAT Configuration]
                  </li>
                </ul>
              </p>
            </div>
          </Message>
        )}
        {!error && data && (
          <>
            <Message success title="">
              <div className="content">
                <p>
                  The backend was able to reach out to the node {data.id} in{" "}
                  {data.pingDurationMS} milliseconds.
                </p>
              </div>
            </Message>
            <div className="content">
              <p>
                The node advertised the following protocols:
                <ul>
                  {data.protocols?.map((p) => {
                    return <li key={p}>{p}</li>;
                  })}
                </ul>
              </p>
              <p>
                The node advertised the following addresses. Click on any of
                this address to try connect to it.
              </p>
              <ClickablePeerAddrList ID={data.id} Addrs={data.addresses} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
