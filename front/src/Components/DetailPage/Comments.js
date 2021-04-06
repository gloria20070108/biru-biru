import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import SingleComment from "./SingleComment";

export default function Comments({ id }) {
  const [comments, setComments] = useState([]);

  // TODO: have the fetch function work with real backend and pagination
  const featchCommentsByPage = () => {
    const res = [];

    for (let i = 0; i < 10; i++) {
      res.push({
        id: "comment-" + i,
        beer_id: id,
        text: "good beer, this is test comment " + i,
        user: "test_user_" + i,
      });
    }

    setComments(res);
  };

  useEffect(() => {
    featchCommentsByPage();
  }, []);

  const submitComment = () => {
    console.log("submitting comment:");
    featchCommentsByPage();
  };

  const resetComment = () => {
    console.log("canceling comment");
  };

  const pervPage = () => {
    console.log("prev page");
    featchCommentsByPage();
  };

  const nextPage = () => {
    console.log("next page");
    featchCommentsByPage();
  };

  return (
    <div>
      <div className="comments-header">Comments</div>
      <div className="comment-input">
        <textarea
          className="comment-input-textarea"
          name="comment-input"
          cols="30"
          rows="3"
        ></textarea>
        <button
          className="btn btn-sm btn-success submit-btn"
          onClick={submitComment}
        >
          Submit
        </button>
        <button
          className="btn btn-sm btn-secondary cancel-btn"
          onClick={resetComment}
        >
          Cancel
        </button>
      </div>
      <div className="existing-comments">
        {(() => {
          if (comments.length > 0) {
            return (
              <div>
                <i
                  class="fas fa-angle-left pagination-icon"
                  onClick={pervPage}
                ></i>
                <span>
                  {"1"} - {"10"} of {"1000"}
                </span>
                <i
                  class="fas fa-angle-right pagination-icon"
                  onClick={nextPage}
                ></i>
              </div>
            );
          }
        })()}

        {comments.map((value, index) => {
          return <SingleComment key={value.id} comment={value} />;
        })}
      </div>
    </div>
  );
}

Comments.propTypes = {
  id: PropTypes.string.isRequired,
};
