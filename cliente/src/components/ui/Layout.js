import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: #000000;
  animation:slideInUp;
  animation-duration: 2s;
`;
const MainContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  @media (max-width: 540px) {
    flex-direction: column;
  }
`;
const Container = styled.div`
  flex: 65%;

  @media (max-width: 540px) {
    flex: 100%;
    align-self: center;
  }
`;
const Logo = styled.img`
  margin-top: 3em;
  animation: slideInRight;
  animation-duration: 2s;

  @media (max-width: 540px) {
    width: 70%;
  }
`;

const Author = styled.h2`
  font-weight: bold;
  font-size: calc(15px + 10 * ((100vw - 320px) / 680));
  animation: slideInDown;
  animation-duration: 2s;  

  span {
    font-size: calc(1px + 10 * ((100vw - 320px) / 680));    
  }
`;

const GreyTitle=styled.h1`
    animation:slideInLeft;
    animation-duration: 2s;
`

const layout = () => {
  return (
    <MainContainer>
      <Container>
        <Author>
          OscarTirado <span> &copy;</span>
        </Author>
        <GreyTitle>Users</GreyTitle>
        <GreyTitle>
          BERI<span style={{ color: "#000000" }}>BLOCK</span>
        </GreyTitle>
        <Title>Management</Title>
      </Container>
      <div style={{ textAlign: "center" }}>
        <Logo src="bb_logo.png" alt="MG GROUP" />
      </div>
    </MainContainer>
  );
};

export default layout;
