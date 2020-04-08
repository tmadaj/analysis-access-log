import styled from 'styled-components';
import theme from 'styles/themeProxy';

export default styled.div`
  flex: 1 1 34%;
  min-width: 30rem;
  min-height: 20rem;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid ${theme.palette.gray30};
  background: ${theme.swatches.primaryBg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
