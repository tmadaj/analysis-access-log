import { countBy } from 'lodash';

export type Log = [
  {
    host: string;
    datetime: {
      day: string;
      hour: string;
      minute: string;
      second: string;
    };
    request: { method: string; url: string; protocol: string; protocolVersion: string };
    responseCode: string;
    documentSize: string;
  },
];

async function getReqPerMinPerMeth(
  log: Log,
): Promise<{ method: string; data: [{ x: string; y: number }] }> {
  const methods = [...new Set(log.map(({ request: { method } }) => method))];

  return methods
    .map((method) => {
      const timestampsMin = log
        .filter(({ request: { method: _method } }) => _method === method)
        .map(({ datetime: { day, hour, minute } }) => new Date(1995, 7, day, hour, minute));
      const counts = countBy(timestampsMin);
      const data = Object.entries(counts)
        .filter(([, val], idx, src) => val !== src[idx + 1]?.[1] || val !== src[idx + 2]?.[1]) // remove constant segments
        .map(([key, val]) => ({ x: new Date(key), y: val }));

      return { method, data };
    })
    .sort(({ data: { length: a } }, { data: { length: b } }) => a - b);
}

async function getMethodsDistr(log: Log): Promise<[{ x: string; y: number }]> {
  const counts = countBy(log, ({ request: { method } }) => method);

  return Object.entries(counts).map(([key, val]) => ({ x: key, y: val }));
}

async function getRespCodeDistr(log: Log): Promise<[{ x: string; y: number }]> {
  const counts = countBy(log, ({ responseCode }) => responseCode);

  return Object.entries(counts).map(([key, val]) => ({ x: key, y: val }));
}

async function getSizeDistr(log: Log): Promise<[{ x: number; y: number }]> {
  const logFiltered = log.filter(
    ({ responseCode, documentSize }) => responseCode === '200' && Number(documentSize) < 1000,
  );
  const counts = countBy(logFiltered, ({ documentSize }) => documentSize);

  return Object.entries(counts).map(([key, val]) => ({ x: Number(key), y: val }));
}

export { getReqPerMinPerMeth, getMethodsDistr, getRespCodeDistr, getSizeDistr };
