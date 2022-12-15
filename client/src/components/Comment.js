import React from 'react'

const Comment = ({ comment }) => {
  return (
    <div className="comment">
        <h3>{comment.commentBody}</h3>
        <p><span className="form form-creator">{comment.user}</span> Sent on {comment.createdAt.substring(0,10)} {comment.createdAt.substring(11, 18)}</p>
    </div>
  )
}

export default Comment
