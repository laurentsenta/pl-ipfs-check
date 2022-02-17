import { CheckCID } from "components/CheckCID";

export const IPFSCheckPage: React.FC = () => {
  return (
    <>
      <h1 className="title">
        Check the retrievability of CID from an IPFS peer
      </h1>
      <h2 className="subtitle">
        Paste in a host peers multiaddr and a Content ID, to check if it is
        expected to be retrievable
      </h2>
      <CheckCID />
    </>
  );
};
