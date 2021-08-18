import Layout from "components/layout";

import Overview from "components/overview";
import Menu from "components/menu";
import Trends from "components/trends";
import Footer from "components/footer";
import { getMainMenu, mainMenu } from "utils/constants";
import { withLoginUser, withLoginUserRedux } from "../../lib";
import nextApi from "../../services/nextApi";

export default withLoginUserRedux(({ OverviewData, loginUser }) => {
  return (
    <Layout
      user={loginUser}
      left={<Menu menu={getMainMenu()} />}
      right={
        <>
          <Trends loginUser={loginUser} />
          <Footer />
        </>
      }
    >
      <Overview OverviewData={OverviewData} />
    </Layout>
  );
});

export const getServerSideProps = withLoginUser(async (context) => {
  const { result: posts } = await nextApi.fetch("posts?chain=karura");

  const discussions = posts?.items?.map((post) => {
    const { author } = post;
    return {
      time: "just now",
      comments: post.commentsCount,
      title: post.title,
      author: author.username,
      authorEmailMd5: author.emailMd5,
      status: null,
      ...(author.addresses ? { address: author.addresses[0].address } : {}),
    };
  });

  return {
    props: {
      OverviewData: [
        {
          category: "Discussions",
          items: discussions,
        },
      ],
    },
  };
});
