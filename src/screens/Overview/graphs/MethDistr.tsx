import React, { useEffect, useState } from 'react';
import { VictoryPie, VictoryTheme } from 'victory';
import Throbber from 'components/Throbber';
import LabelTooltip from './LabelTooltip';
import { getMethodsDistr, Log } from './dataConvUtils';

interface Props {
  log: Log;
  size: {
    width: number;
    height: number;
  };
}

export default function MethodDistr({ log, size: { width, height } }: Props): React.ReactElement {
  const [data, setData] = useState(null);
  const innerRadius = Math.min(width, height) / 4;

  useEffect(() => {
    if (log) getMethodsDistr(log).then(setData);
  }, [log]);

  return !data ? (
    <Throbber />
  ) : (
    <VictoryPie
      height={height}
      width={width}
      data={data}
      sortKey="y"
      innerRadius={innerRadius}
      padAngle={1}
      labelComponent={<LabelTooltip height={height} width={width} radius={innerRadius} />}
      theme={VictoryTheme.material}
    />
  );
}
