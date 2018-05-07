import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 271px;
  height: 100%;
  background-color: #2B2F3E;
  padding-left: 27px;
  padding-right: 27px;
  padding-top: 16px;
`;

const TitleLabel = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 36px;
  color: #FFFFFF;
`;

const SecondLabel = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 18px;
  color: #808080;
`;

export default function LeftSideBar() {
  return (
    <Container>
      <TitleLabel>DAIRY APP</TitleLabel>
      <SecondLabel>Comment with no sense</SecondLabel>
    </Container>
  );
}
