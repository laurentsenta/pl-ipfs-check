export const DEFAULT_BACKEND_URL = process.env.REACT_APP_DEFAULT_BACKEND_URL;

export interface IParams {
  backend: string;
  cid: string;
  addr: string;
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

export const isValidParams = (params: Partial<IParams>): params is IParams => {
  // To be expanded
  if (!params.addr || !params.backend || !params.cid) {
    return false;
  }
  return true;
};

export const fetchCIDLogs = async (params: IParams): Promise<IResult> => {
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
