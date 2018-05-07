import React from 'react';
import styled from 'styled-components';

import ItemsListContainer from 'containers/ItemsListContainer';
import CommentsContainer from 'containers/CommentsContainer';
import LeftSideBar from 'components/LeftSideBar';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-right: 32px;
`;

export default function AppContainer() {
  return (
    <Wrapper>
      <LeftSideBar />
      <ItemsListContainer />
      <CommentsContainer />
    </Wrapper>
  );
}
