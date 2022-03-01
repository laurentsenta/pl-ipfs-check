import { AddrField, BackendURLField, CIDField } from "components/CommonFields";
import { IsMyContentAvailableInline } from "components/IsMyContentAvailableInline";
import { IsMyNodeAccessibleInline } from "components/IsMyNodeAccessibleInline";
import { IsMyNodeServingContentInline } from "components/IsMyNodeServingContentInline";
import { useCallback, useState } from "react";

export const ButtonWithModal: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow((x) => !x), [setShow]);

  return (
    <>
      <button className="button outline" onClick={toggle}>
        {title}
      </button>
      <div className={`modal ${show ? "is-active" : ""}`}>
        <div className="modal-background" onClick={toggle}></div>
        <div className="modal-content">
          <div className="box">{children}</div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={toggle}
        ></button>
      </div>
    </>
  );
};

export const DiagnoseAccessContentPage: React.FC = () => {
  return (
    <>
      <h1 className="title">I can't access my content</h1>
      <div className="block">
        <div className="content">
          Ok, you cannot access your content, sorry about that. Let's try to
          find out why.
        </div>
      </div>
      <div className="block">
        <div className="content">
          <p>
            First, let's configure the node we are going to use to test
            accessibility. To be described. Don't worry much about this.
          </p>
        </div>
        <div className="" style={{ maxWidth: "600px" }}>
          <BackendURLField />
        </div>
      </div>
      <div className="block">
        <h1 className="title is-3">1. Is my content on the DHT?</h1>
        <div className="content">
          <p>
            First we need to make sure your content is accessible on the DHT.
            (ref needed). So starting from the backend server we are going to
            request the DHT and make sure your content can be discovered.
          </p>
          <p>
            Enter your content's CID below, hopefully the backend will find some
            peers advertising this content.
          </p>
        </div>
        <div className="" style={{ maxWidth: "600px" }}>
          <CIDField />
        </div>
        <div className="block">
          <IsMyContentAvailableInline />
        </div>
      </div>
      <div className="block">
        <h1 className="title is-3">2. Is my node accessible?</h1>
        <div className="content">
          <p>
            Now we need to make sure that nodes serving your content can be
            reached.
          </p>
          <p>
            Enter your node's address below, hopefully the backend will be able
            to reach out to it.
          </p>
          <ButtonWithModal title="Where do I find my multiaddr?">
            <section className="content">
              <h2 className="">Where do I find my multiaddr?</h2>
              <ul>
                <li className="">
                  <strong>Using This tool</strong>
                  <ul>
                    <li>
                      Run the "Is my content on the DHT?" test and click on any
                      of the provider's addresses
                    </li>
                    <li>
                      Run the "Is my node accessible?" test and click on any of
                      the node advertised addresses
                    </li>
                  </ul>
                  <strong>Using IPFS Desktop or IPFS WebUI</strong>
                  <ul>
                    <li>
                      Open the IPFS WebUI "Status" page via the IPFS Desktop
                      menu or by visiting "http://127.0.0.1:5001/webui" (when
                      using the default config settings)
                    </li>
                    <li>
                      If you want to test your peerID rather than a particular
                      address enter{" "}
                      <code>
                        /p2p/{"{"}YourPeerID{"}"}
                      </code>
                    </li>
                    <li>
                      If you want to test a particular address then click the
                      "Advanced" dropdown to see the node's addresses
                    </li>
                  </ul>
                </li>
                <li className="">
                  <strong>Using the go-ipfs CLI</strong>
                  <ul>
                    <li>
                      If you want to test your peerID rather than a particular
                      address run <code>ipfs id</code> and enter{" "}
                      <code>
                        /p2p/{"{"}YourPeerID{"}"}
                      </code>
                    </li>
                    <li>
                      If you want to test a particular address then choose an
                      entry from the list of addresses output by{" "}
                      <code>ipfs id</code>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
          </ButtonWithModal>
        </div>
        <div className="" style={{ maxWidth: "600px" }}>
          <AddrField />
        </div>
        <div className="block">
          <IsMyNodeAccessibleInline />
        </div>
      </div>
      <div className="block">
        <h1 className="title is-3">3. Is my node serving the content?</h1>
        <div className="content">
          <p>
            If you're node is accessible and the content is advertised on the
            DHT, let's check that your node is actually serving the content.
          </p>
          <p>
            Click below to have the backend try to retrieve data from your node.
          </p>
        </div>
        <div className="block">
          <IsMyNodeServingContentInline />
        </div>
      </div>
      <></>
    </>
  );
};
