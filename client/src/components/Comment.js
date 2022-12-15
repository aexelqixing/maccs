import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className={comment.isAdmin ? "admin" : "comment"}>
      <h3>{comment.commentBody}</h3>
      <p>
        <span className="form form-creator">{comment.username}</span> Sent on{" "}
        {comment.createdAt ? comment.createdAt.substring(0, 10) : "..."}{" "}
        {comment.createdAt ? comment.createdAt.substring(11, 19) : ""}
      </p>
    </div>
  );
};

export default Comment;
