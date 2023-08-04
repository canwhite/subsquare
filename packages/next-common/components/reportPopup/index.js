import React, { useCallback, useState } from "react";
import Popup from "../popup/wrapper/Popup";
import noop from "lodash.noop";
import PrimaryButton from "../buttons/primaryButton";
import { PopupButtonWrapper } from "../popup/wrapper";
import RadioOptionGroup from "next-common/components/radioOptionGroup";
import nextApi from "next-common/services/nextApi";
import { usePost } from "next-common/context/post";
import { useDispatch } from "react-redux";
import { newSuccessToast } from "next-common/store/reducers/toastSlice";

export default function ReportPopup({ setShow = noop }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("malicious");
  const post = usePost();

  const options = [
    {
      value: "malicious",
      label: "This proposal is malicious",
    },
    {
      value: "abusive",
      label: "This proposal includes abusive or hateful content",
    },
    {
      value: "spam",
      label: "It appears that the proposer's account is hacked",
    },
    {
      value: "duplicate",
      label: "It’s a duplicated proposal",
    },
  ];

  const doReport = useCallback(async () => {
    setIsLoading(true);
    try {
      const reason = options.find(
        (item) => item.value === selectedOption,
      ).label;

      let postType = "post";
      let postId = post._id;

      if (post.rootPost) {
        postType = post.rootPost.postType;
        postId = post.rootPost.postId;
      }

      const { result, error } = await nextApi.post("report", {
        postType,
        postId,
        reason,
      });

      if (result) {
        dispatch(newSuccessToast("Reported successfully"));
      }

      if (error) {
        dispatch(newSuccessToast(error.message));
      }

      setShow(false);
    } finally {
      setIsLoading(false);
    }
  }, [post, selectedOption]);

  return (
    <Popup title="Report" onClose={() => setShow(false)}>
      <div className="text-[14px]">
        <div className="font-bold mb-[16px]">What’s the problem?</div>
        <RadioOptionGroup
          options={options}
          selected={selectedOption}
          setSelected={setSelectedOption}
        />
      </div>
      <PopupButtonWrapper>
        <PrimaryButton isLoading={isLoading} onClick={doReport}>
          Submit
        </PrimaryButton>
      </PopupButtonWrapper>
    </Popup>
  );
}
