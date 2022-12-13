import React from 'react'

const Comment = ({ comment }) => {
  return (
    <div className="comment">
        <h3>{comment.commentBody}</h3>
        <p><span className="form form-creator">{comment.user}</span> Sent on {comment.updatedAt.substring(0,10)} {comment.updatedAt.substring(11, 18)}</p>
    </div>
  )
}

export default Comment
