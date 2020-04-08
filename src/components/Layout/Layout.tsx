import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Viewport = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export default function Layout({ children }: Props): React.ReactNode {
  // Place for global overlay components, nav, sidebars, modals, notifications, etc.
  return <Viewport>{children}</Viewport>;
}
