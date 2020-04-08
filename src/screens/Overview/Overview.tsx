import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import Dashboard from 'components/Dashboard';
import ueid from 'utils/ueid';
import { ReqPerMin, MethDistr, RespCodeDistr, SizeDistr, Log } from './graphs';

const panelsConfig = [
  {
    id: ueid(),
    title: 'Requests per minute',
    Content: ReqPerMin,
  },
  {
    id: ueid(),
    title: 'Distribution of HTTP methods',
    Content: MethDistr,
  },
  {
    id: ueid(),
    title: 'Distribution of HTTP response codes',
    Content: RespCodeDistr,
  },
  {
    id: ueid(),
    title: 'Distribution of response sizes',
    subtitle: '[Filtered by 200 OK and < 1000B]',
    Content: SizeDistr,
  },
];

async function fetchLog(): Promise<Log> {
  const response = await fetch('assets/epa-http.json');

  return response.json();
}

export default function Overview(): React.ReactNode {
  const [log, setLog] = useState(null);

  useEffect(() => fetchLog().then(setLog), []);

  return (
    <>
      <Header title="Overview" />
      <Dashboard panels={panelsConfig} data={log} />
    </>
  );
}
