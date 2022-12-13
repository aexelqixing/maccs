import React from 'react'

const Comment = ({ comment }) => {
  return (
    <div className="comment">
        <h3>{comment.commentBody}</h3>
        <p><span className="form form-creator">{comment.user}</span></p>
    </div>
  )
}

export default Comment
