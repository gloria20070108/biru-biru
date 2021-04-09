import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import SingleComment from "./SingleComment";

export default function Comments({ id }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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

  const submitComment = async () => {
    const res = await fetch("/addNewComment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        beer_id: id,
        new_comment: newComment,
      }),
    });

    if (res.status === 200) {
      resetComment();
      featchCommentsByPage();
    } else {
      alert("Post new comment failed!");
    }
  };

  const resetComment = () => {
    setNewComment("");
  };

  const pervPage = () => {
    console.log("prev page");
    featchCommentsByPage();
  };

  const nextPage = () => {
    console.log("next page");
    featchCommentsByPage();
  };

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
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
          value={newComment}
          onChange={handleNewCommentChange}
        ></textarea>
        <button
          className="btn btn-sm btn-success submit-btn"
          disabled={newComment === ""}
          onClick={submitComment}
        >
          Submit
        </button>
        <button
          className="btn btn-sm btn-secondary cancel-btn"
          disabled={newComment === ""}
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
