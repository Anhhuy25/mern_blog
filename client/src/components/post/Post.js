import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import Loading from "../layout/Loading";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

function Post({ getPost, post: { post, loading } }) {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return loading || post === null ? (
    <Loading />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem {...post} showActions={false} />
      <CommentForm postId={post._id} />
      {post.comments.map((comment) => {
        return <CommentItem key={comment._id} {...comment} postId={post._id} />;
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
  getPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
