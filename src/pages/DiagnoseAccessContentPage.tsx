import { AddrField, BackendURLField, CIDField } from "components/CommonFields";
import {
  IsMyContentAvailableInline,
  IsMyNodeAccessibleInline,
  IsMyNodeServingContentInline,
} from "components/IPFSCheck";

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
