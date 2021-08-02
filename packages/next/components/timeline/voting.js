import styled from "styled-components";

import Account from "components/account";
import Progress from "./progress";

const TitleWrapper = styled.div`
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > :last-child {
    display: flex;
    align-items: center;
    color: #506176;
    > img {
      margin-left: 4px;
    }
  }
`;

const CuratorWrapper = styled.div`
  margin: 4px 0;
  background: #f6f7fa;
  padding: 12px 28px;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 28px;
    > :first-child {
      color: #506176;
      min-width: 120px;
    }
  }
`;

export default function Voting({ data }) {
  return (
    <div>
      <TitleWrapper>
        <Account name="Kathryn" />
        <div>
          <div>proposeCurator</div>
          <img src="/imgs/icons/approve.svg" />
        </div>
      </TitleWrapper>
      <CuratorWrapper>
        <div>
          <div>Curator</div>
          <Account name="Jaco" />
        </div>
        <div>
          <div>Fee</div>
          <div>22.22 KSM</div>
        </div>
      </CuratorWrapper>
      <Progress
        total={12}
        data={[
          true,
          true,
          true,
          false,
          false,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ]}
      />
    </div>
  );
}
