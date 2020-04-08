import React, { Props } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/themeProxy';
import { setTheme } from 'src/redux/actions';
import { getTheme } from 'src/redux/selectors';
import Button from 'components/Button';

interface Props {
  title: string;
  buttons: React.ReactElement[];
}

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0 1rem;
  border-bottom: 1px solid ${theme.palette.gray30};
`;

const Headline = styled.h1`
  margin: 0.5rem 1rem;
`;

const RightButton = styled(Button)`
  margin-left: auto;
`;

export default function ({ title, children }: Props): React.ReactElement {
  const activeTheme: Theme = useSelector(getTheme, shallowEqual);
  const reverseTheme = activeTheme === 'light' ? 'dark' : 'light';

  function toggleTheme(): void {
    setTheme(reverseTheme);
  }

  return (
    <Header>
      <Headline>{title}</Headline>
      {children}
      <RightButton onClick={toggleTheme}>{reverseTheme} theme</RightButton>
    </Header>
  );
}
