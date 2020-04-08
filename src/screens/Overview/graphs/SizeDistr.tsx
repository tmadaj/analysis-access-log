import React, { useEffect, useState } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryTheme,
} from 'victory';
import Throbber from 'components/Throbber';
import { getSizeDistr, Log } from './dataConvUtils';

interface Props {
  log: Log;
  size: {
    width: number;
    height: number;
  };
}

function formatSizeLabel({ datum: { x, y } }): string {
  return `${x}B: ${y}`;
}

export default function SizeDistr({ log, size: { width, height } }: Props): React.ReactElement {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (log) getSizeDistr(log).then(setData);
  }, [log]);

  return !data ? (
    <Throbber />
  ) : (
    <VictoryChart
      containerComponent={<VictoryVoronoiContainer labels={formatSizeLabel} />}
      height={height}
      width={width}
      domainPadding={{ y: [0, 10] }}
      scale={{ y: 'sqrt' }}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        fixLabelOverlap
        label="size [B]"
        style={{
          axisLabel: { padding: 30 },
        }}
      />
      <VictoryAxis dependentAxis />
      <VictoryBar data={data} domain={{ x: [0, 1000] }} />
    </VictoryChart>
  );
}
