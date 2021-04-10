import React from "react";

import PropTypes from "prop-types";

export default function SingleComment({ comment }) {
  return (
    <div className="single-comment">
      <div className="comment-user">
        <i class="far fa-user user-icon"></i> - {comment.user}
      </div>
      <div className="comment-text">{comment.comment}</div>
    </div>
  );
}

SingleComment.propTypes = {
  comment: PropTypes.object.isRequired,
};
