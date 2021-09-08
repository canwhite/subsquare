import styled, { css } from "styled-components";
import KVList from "components/kvList";

import User from "components/user";
import ExternalLink from "../externalLink";
import InnerDataTable from "../table/innerDataTable";
import Links from "../timeline/links";
import Timeline from "../timeline";
import { timelineData } from "../../utils/data";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #ebeef4;
  box-shadow: 0 6px 7px rgba(30, 33, 52, 0.02),
  0 1.34018px 1.56354px rgba(30, 33, 52, 0.0119221),
  0 0.399006px 0.465507px rgba(30, 33, 52, 0.00807786);
  border-radius: 6px;
  padding: 48px;
  @media screen and (max-width: 600px) {
    padding: 24px;
    border-radius: 0;
  }

  :hover {
    .edit {
      display: block;
    }
  }
`;

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;

  > :not(:first-child) {
    ::before {
      content: "·";
      font-size: 12px;
      color: #9da9bb;
      margin: 0 8px;
    }
  }
`;


const Title = styled.div`
  max-width: 750px;
  overflow: hidden;
  word-break: break-all;
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  margin-bottom: 12px;
`;



const TypeWrapper = styled.div`
  display: inline-block;
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  background: linear-gradient(0deg, #FEF4F7, #FEF4F7), #E81F66;
  font-weight: 500;
  font-size: 12px;
  padding: 0 8px;
  ${(p) =>
          p.color &&
          css`
            color: ${p.color};
          `}
`;

const StatusWrapper = styled.div`
  background: #2196f3;
  border-radius: 2px;
  font-weight: 500;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  padding: 0 8px;
  color: #ffffff;
`;

const getTypeColor = (type) => {
  switch (type) {
    case "Democracy":
      return "#E81F66";
    case "Council":
      return "#E81F66";
    case "Treasury":
      return "#FF9800";
    default:
      return null;
  }
};

const Index = styled.div`
  font-weight: bold;
  font-size: 12px;
`;

const FlexWrapper = styled.div`

  display: flex;
  justify-content: space-between;
`

export default function MotionDetail({data, chain}) {
  if (!data) {
    return null;
  }

  return (
    <div>
      <Wrapper>
        <div>
          <DividerWrapper style={{marginBottom: 12}}>
            {data.motionIndex && <Index>{`#${data.motionIndex}`}</Index>}
            <span style={{fontSize: 12, color: "#506176"}}>{data?.proposal?.method}</span>
          </DividerWrapper>
          <Title>{`Motion #${data.index}: ${data?.proposal?.section}.${data?.proposal?.method}`}</Title>
          <FlexWrapper>
            <DividerWrapper>
              <User user={data?.author} add={data.proposer} chain={chain}/>
              {data.type && (
                <div>
                  <TypeWrapper color={getTypeColor(data.type)}>
                    {data.type}
                  </TypeWrapper>
                </div>
              )}
            </DividerWrapper>
            {data.status && <StatusWrapper>{data.status}</StatusWrapper>}
          </FlexWrapper>
        </div>

      </Wrapper>


      <KVList title={"Business"} data={[
        ["Link to", <ExternalLink href="/">Treasury Proposal #123</ExternalLink>],
        ["Beneficiary", "12"],
        ["Value", "38.66 KSM"],
        ["Bond", "1.933 KSM"],
      ]}/>

      <KVList title={"Metadata"} data={[
        ["Proposer", <>
          <User add={`sLB7WSuhgzkn9wkPLCobzf6YjqvJVnnCAZmXtYF4GYcZ6cw`} fontSize={14}/>
          <Links chain={chain} address={`sLB7WSuhgzkn9wkPLCobzf6YjqvJVnnCAZmXtYF4GYcZ6cw`} style={{marginLeft: 8}}/>
        </>],
        ["Beneficiary", "12"],
        ["Value", "38.66 KSM"],
        ["Bond", "1.933 KSM"],
        ["Call", ""],
        [ <InnerDataTable data={data.author} padding={24}/>],
      ]}/>

      <Timeline data={timelineData}/>

    </div>

  );
}
