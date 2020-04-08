import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  VictoryArea,
  VictoryStack,
  VictoryChart,
  VictoryAxis,
  VictoryLegend,
  VictoryTheme,
} from 'victory';
import Throbber from 'components/Throbber';
import { getReqPerMinPerMeth, Log } from './dataConvUtils';

interface Props {
  log: Log;
  size: {
    width: number;
    height: number;
  };
}

const timeTicks = [
  [30, 0],
  [30, 4],
  [30, 8],
  [30, 12],
  [30, 16],
  [30, 20],
  [31, 0],
].map(([d, h]) => new Date(1995, 7, d, h));

function formatTimeTick(t): string {
  const date = moment(t);
  const template = !date.hour() && !date.minute() ? 'D MMM' : 'H:mm';

  return date.format(template);
}

export default function RequestsPerMinPerMethod({
  log,
  size: { width, height },
}: Props): React.ReactElement {
  const [dataByMeth, setData] = useState(null);

  useEffect(() => {
    if (log) getReqPerMinPerMeth(log).then(setData);
  }, [log]);

  return !dataByMeth ? (
    <Throbber />
  ) : (
    <VictoryChart
      height={height}
      width={width}
      domainPadding={{ y: [0, 5] }}
      theme={VictoryTheme.material}
    >
      <VictoryLegend
        orientation="horizontal"
        x={50}
        data={dataByMeth.map(({ method }) => ({ name: method }))}
      />
      <VictoryAxis tickFormat={formatTimeTick} tickValues={timeTicks} />
      <VictoryAxis dependentAxis />
      <VictoryStack scale={{ x: 'time' }}>
        {dataByMeth.map(({ method, data }) => (
          <VictoryArea key={method} data={data} />
        ))}
      </VictoryStack>
    </VictoryChart>
  );
}
