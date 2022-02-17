import {
  IsMyContentAvailable,
  IsMyNodeAccessible,
  IsMyNodeServingContent,
} from "components/IPFSCheck";
import { IdentifyMyNode } from "components/LibP2PCheck";

export const DiagnosePage: React.FC = () => {
  return (
    <>
      <h1 className="title">Diagnose</h1>
      <>
        <IdentifyMyNode />
        <IsMyContentAvailable />
        <IsMyNodeAccessible />
        <IsMyNodeServingContent />
      </>
    </>
  );
};
