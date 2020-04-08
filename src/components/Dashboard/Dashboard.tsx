import React from 'react';
import styled from 'styled-components';
import theme from 'styles/themeProxy';
import MeasuredContainer from 'components/MeasuredContainer';
import Panel from './Panel';

const Dashboard = styled.div`
  width: 100%;
  height: 100%;
  flex: 1 1 0;
  overflow: auto;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
  align-content: stretch;
  background: ${theme.swatches.secondaryBg};
`;

const StretchMeasuredContainer = styled(MeasuredContainer)`
  flex: 1 1 0;
  width: 100%;
  overflow: hidden;
`;

interface Props {
  panels: [];
  data: Log;
}

export default function ({ panels = [], data = [] }: Props): React.ReactElement {
  return (
    <Dashboard>
      {panels.map(({ id, title, subtitle, Content }) => (
        <Panel key={id}>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <StretchMeasuredContainer>
            <Content log={data} />
          </StretchMeasuredContainer>
        </Panel>
      ))}
    </Dashboard>
  );
}
