import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeComment } from "../../actions/post";

function CommentItem({
  avatar,
  name,
  user,
  text,
  date,
  _id,
  postId,
  removeComment,
  auth,
}) {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        {/* <p className="post-date">Posted on {formatDate(date)}</p> */}
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => removeComment(postId, _id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  removeComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
