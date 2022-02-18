export const Tooltip: React.FC<{ message: string }> = ({ message }) => {
  return (
    <span
      className="icon has-tooltip-arrow has-tooltipl-multiline"
      data-tooltip={message}
    >
      ℹ️
    </span>
  );
};

export const TooltipMultiaddr: React.FC = () => {
  return (
    <Tooltip
      message="The multiaddress is the&#10;location of your node, created by combining&#10;the string `/libp2p/` with the PeerID"
    />
  );
};
