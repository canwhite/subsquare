import styled, { css } from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 99;
`;

const Mask = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.24);
  position: absolute;
`;

const Content = styled.div`
  background: #ffffff;
  height: 100%;
  display: inline-block;
  position: absolute;
  min-width: 264px;
  padding-left: 32px;
  padding-right: 32px;
  @media screen and (max-width: 600px) {
    padding: 0;
    min-width: 200px;
  }
  ${(p) =>
    p.position === "right" &&
    css`
      right: 0;
    `}
`;

const CloseWrapper = styled.div`
  height: 64px;
  border-bottom: 1px solid #ebeef4;
  display: flex;
  align-items: center;
  ${(p) =>
    p.position === "right" &&
    css`
      justify-content: flex-end;
    `}
`;

const Container = styled.div`
  @media screen and (max-width: 1000px) {
    padding: 0;
  }
  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

const CloseButton = styled.div`
  width: 38px;
  height: 38px;
  border: 1px solid #e0e4eb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  margin-top: 26px;
`;

export default function Sidebar({ onClose, position, children }) {
  return (
    <Wrapper>
      <Mask onClick={onClose} />
      <Content position={position}>
        <CloseWrapper position={position}>
          <Container>
            <CloseButton>
              <img src="/imgs/icons/close.svg" alt="" onClick={onClose} />
            </CloseButton>
          </Container>
        </CloseWrapper>
        <ContentWrapper>
          <Container>{children}</Container>
        </ContentWrapper>
      </Content>
    </Wrapper>
  );
}
