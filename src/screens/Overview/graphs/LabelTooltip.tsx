import React from 'react';
import { VictoryLabel, VictoryTooltip } from 'victory';

function LabelTooltip(props: Props): React.ReactElement {
  const { data, datum, width, height, radius } = props;
  const total = data.reduce((acc, { y }) => acc + y, 0);

  return (
    <g>
      {datum.y / total > 3 / 360 && <VictoryLabel {...props} labelPlacement="vertical" />}
      <VictoryTooltip
        {...props}
        text={`${datum.x}:\n${datum.y}`}
        x={width / 2}
        y={height / 2 + radius * 0.8}
        cornerRadius={radius * 0.8}
        flyoutWidth={radius * 0.8 * 2}
        flyoutHeight={radius * 0.8 * 2}
        orientation="top"
        pointerLength={0}
        flyoutStyle={{ stroke: 0 }}
      />
    </g>
  );
}
LabelTooltip.defaultEvents = VictoryTooltip.defaultEvents;

export default LabelTooltip;
