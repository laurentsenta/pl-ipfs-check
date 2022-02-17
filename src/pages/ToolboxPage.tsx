export const ToolboxPage: React.FC = () => {
  return (
    <>
      <h1 className="title">More Tools</h1>
      <div className="content">
        <h3>DHT Crawling</h3>
        <ul>
          <li>https://github.com/whyrusleeping/ipfs-counter</li>
          <li>https://github.com/raulk/dht-hawk</li>
          <li>https://github.com/vyzo/ipfs-crawl</li>
        </ul>
        <h3>IPFS Issues</h3>
        <ul>
          <li>https://github.com/aschmahmann/ipfs-ds</li>
          <li>https://github.com/aschmahmann/vole</li>
          <li>https://github.com/aschmahmann/ipfs-check</li>
          <li>https://github.com/whyrusleeping/ipfs-see-all</li>
          <li>https://github.com/whyrusleeping/repofix</li>
          <li>https://github.com/achingbrain/ipfs-unixfs-cli</li>
        </ul>
        <h3>libp2p</h3>
        <ul>
          <li>https://github.com/mxinden/libp2p-lookup</li>
        </ul>
        <h3>Misc</h3>
        <ul>
          <li>https://github.com/notassigned/p2p-tools</li>
          <li>https://github.com/sebastiendan/ipfs-perfs</li>
          <li>https://github.com/mrd0ll4r/ipfs-tools</li>
        </ul>
      </div>
    </>
  );
};
