export const DEFAULT_BACKEND_URL = process.env.REACT_APP_DEFAULT_BACKEND_URL;

export interface IParamsAddrAndCID {
  backend: string;
  cid: string;
  addr: string;
}

export interface IParamsAddr {
  backend: string;
  addr: string;
}
export interface IParamsCID {
  backend: string;
  cid: string;
}

export interface IResult {
  ConnectionError: string;
  PeerFoundInDHT: { [key: string]: number };
  CidInDHT: boolean;
  DataAvailableOverBitswap: {
    Duration: number;
    Found: boolean;
    Responded: boolean;
    Error: string;
  };
}

export const isValidParams = (
  params: Partial<IParamsAddrAndCID>
): params is IParamsAddrAndCID => {
  // To be expanded
  if (!params.addr || !params.backend || !params.cid) {
    return false;
  }
  return true;
};

export const isValidAddrParams = (
  params: Partial<IParamsAddrAndCID>
): params is IParamsAddr => {
  // To be expanded
  if (!params.addr || !params.backend) {
    return false;
  }
  return true;
};

export const isValidCIDParams = (
  params: Partial<IParamsCID>
): params is IParamsCID => {
  // To be expanded
  if (!params.cid || !params.backend) {
    return false;
  }
  return true;
};

export const fetchCIDLogs = async (
  params: IParamsAddrAndCID
): Promise<IResult> => {
  const queryString = `multiaddr=${params.addr}&cid=${params.cid}`;

  const url = `${params.backend}?${queryString}`;

  const r = await fetch(url, {
    method: "POST",
    headers: {},
  });

  if (r.ok) {
    return r.json();
  }

  throw await r.text();
};

interface IIdentify {
  publicKey: string;
  listenAddrs: string[];
  protocols: string[];
  observedAddr: string;
  protocolVersion: string;
  agentVersion: string;
  signedPeerRecord: string;
}

export const fetchNodeIdentify = async (
  params: IParamsAddr
): Promise<IIdentify> => {
  const queryString = `addr=${params.addr}`;

  const url = `${params.backend}/identify?${queryString}`;

  const r = await fetch(url, {
    method: "GET",
    headers: {},
  });

  if (r.ok) {
    return r.json();
  }

  throw await r.text();
};

export const fetchCIDIsBeingServed = async (
  params: IParamsCID
): Promise<IIdentify> => {
  const queryString = `cid=${params.cid}`;

  const url = `${params.backend}/find-cid?${queryString}`;

  const r = await fetch(url, {
    method: "GET",
    headers: {},
  });

  if (r.ok) {
    return r.json();
  }

  throw await r.text();
};

interface IFoundPeer {}

export const fetchPeerIDIsFound = async (
  params: IParamsAddr
): Promise<IFoundPeer> => {
  const queryString = `addr=${params.addr}`;

  const url = `${params.backend}/find-peer?${queryString}`;

  const r = await fetch(url, {
    method: "GET",
    headers: {},
  });

  if (r.ok) {
    return r.json();
  }

  throw await r.text();
};
