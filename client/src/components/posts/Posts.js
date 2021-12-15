import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../../actions/post";
import Loading from "../layout/Loading";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

function Posts({ getAllPosts, post: { posts, loading } }) {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <PostForm />
      {posts.map((post) => {
        return <PostItem key={post._id} {...post} />;
      })}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

const mapDispatchToProps = {
  getAllPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
