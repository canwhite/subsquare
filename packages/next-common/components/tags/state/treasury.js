import React from "react";
import {
  ActiveTag,
  ClosedTag,
  NegativeTag,
  PositiveTag,
  StartTag,
} from "./styled";

const stateTagMap = {
  Proposed: StartTag,
  Awarded: PositiveTag,
  Approved: PositiveTag,
  Rejected: NegativeTag,
  ApproveVoting: PositiveTag,
  RejectVoting: NegativeTag,
};

const tipStateTagMap = {
  Tipping: StartTag,
  Retracted: NegativeTag,
  Closed: ClosedTag,
  Slashed: NegativeTag,

  "Report Awesome": StartTag,
  tipNew: StartTag,
  Tip: ActiveTag,
  "Tip Retracted": NegativeTag,
  "Tip Closed": ClosedTag,
};

const bountyStateTagMap = {
  Proposed: StartTag,
  Approved: PositiveTag,
  Funded: ActiveTag,
  Active: ActiveTag,
  PendingPayout: ActiveTag,
  Rejected: NegativeTag,
  Canceled: NegativeTag,
  Claimed: PositiveTag,

  "Propose Bounty": StartTag,
  BountyBecameActive: ActiveTag,
  acceptCurator: PositiveTag,
  BountyExtended: ActiveTag,
  BountyAwarded: PositiveTag,
  BountyClaimed: PositiveTag,
  BountyRejected: NegativeTag,
  BountyApproved: PositiveTag,
  CuratorUnassigned: NegativeTag,
  CuratorProposed: StartTag,

  // in timeline
  CloseVoting: NegativeTag,
  ApproveVoting: PositiveTag,
  RejectVoting: NegativeTag,
};

const childBountyStateTagMap = {
  Added: StartTag,
  CuratorProposed: ActiveTag,
  Active: ActiveTag,
  PendingPayout: ActiveTag,
  Rejected: NegativeTag,
  Canceled: NegativeTag,
  Claimed: PositiveTag,

  // in timeline
  proposeCurator: ActiveTag,
  acceptCurator: ActiveTag,
  Awarded: PositiveTag,
};

const spendStateTagMap = {
  Approved: StartTag,
  Paid: PositiveTag,
  Processed: PositiveTag,
  Voided: NegativeTag,
};

export function TreasuryTag({ state }) {
  const Tag = stateTagMap[state] || ClosedTag;
  return <Tag>{state}</Tag>;
}

export function TipTag({ state }) {
  let Tag = tipStateTagMap[state] || ClosedTag;
  if ((state || "").startsWith("Tipping")) {
    Tag = ActiveTag;
  }

  return <Tag>{state}</Tag>;
}

export function BountyTag({ state }) {
  let Tag = bountyStateTagMap[state] || ClosedTag;
  return <Tag>{state}</Tag>;
}

export function ChildBountyTag({ state }) {
  let Tag = childBountyStateTagMap[state] || ClosedTag;
  return <Tag>{state}</Tag>;
}

export function SpendTag({ state }) {
  let Tag = spendStateTagMap[state] || ClosedTag;
  return <Tag>{state}</Tag>;
}
