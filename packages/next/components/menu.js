import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import OverviewIcon from "../public/imgs/icons/overview.svg";
import DiscussionIcon from "../public/imgs/icons/discussions.svg";
import TipIcon from "../public/imgs/icons/tips.svg";
import ProposalIcon from "../public/imgs/icons/proposals.svg";
import MotionIcon from "../public/imgs/icons/type-motions.svg";
import ReferendaIcon from "../public/imgs/icons/type-referenda.svg";
import DemocracyProposalIcon from "../public/imgs/icons/type-proposals.svg";
import UserIcon from "../public/imgs/icons/user.svg";
import AddressIcon from "../public/imgs/icons/address.svg";
import BellIcon from "../public/imgs/icons/bell.svg";

const Wrapper = styled.div`
  padding-top: 37px;

  > :not(:first-child) {
    margin-top: 16px;
  }
`;

const Title = styled.div`
  padding: 0 12px 12px;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.16em;
  color: #9da9bb;
`;

const Item = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;

  :hover {
    color: #6848ff;

    > svg {
      * {
        fill: #6848ff;
      }
    }
  }

  > div {
    flex: 1 1 auto;
  }

  > :not(:first-child) {
    margin-left: 8px;
  }

  ${(p) =>
    p.active &&
    css`
      font-weight: 600;
      background: #ebeef4;
      color: #6848ff;

      > svg {
        * {
          fill: #6848ff;
        }
      }
    `}
`;

export default function Menu({ menu }) {
  const router = useRouter();

  const iconMap = new Map();
  iconMap.set("overview", <OverviewIcon />);
  iconMap.set("discussions", <DiscussionIcon />);
  iconMap.set("tips", <TipIcon />);
  iconMap.set("proposals", <ProposalIcon />);
  iconMap.set("motions", <MotionIcon />);
  iconMap.set("referenda", <ReferendaIcon />);
  iconMap.set("democracyProposals", <DemocracyProposalIcon />);
  iconMap.set("democracyExternals", <DemocracyProposalIcon />);
  iconMap.set("techCommProposals", <DemocracyProposalIcon />);
  iconMap.set("account", <UserIcon />);
  iconMap.set("linked-address", <AddressIcon />);
  iconMap.set("notification", <BellIcon />);

  return (
    <Wrapper>
      {menu.map((item, index) => (
        <div key={index}>
          {item.name && <Title>{item.name}</Title>}
          {item.items.map((item, index) => (
            <Item
              key={index}
              active={
                router.pathname === item.pathname ||
                (router.pathname === "/[chain]" && item.pathname === "/")
              }
              onClick={() => {
                if (item.pathname) {
                  if (item.pathname.startsWith("/[chain]")) {
                    let currChain = router.query.chain;
                    if (!currChain) {
                      currChain = localStorage.getItem("chain") || "karura";
                    }
                    router.push({
                      pathname: item.pathname,
                      query: { chain: currChain },
                    });
                  } else {
                    router.push(item.pathname);
                  }
                }
              }}
            >
              {iconMap.get(item.value)}
              <div>{item.name}</div>
            </Item>
          ))}
        </div>
      ))}
    </Wrapper>
  );
}
