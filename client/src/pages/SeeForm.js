import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import axios from 'axios';

const SeeForm = () => {
    let { id } = useParams();
    const [form, setFormObject] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [student, setStudent] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:3001/forms/byId/${id}`).then((response) => {
          setFormObject(response.data);
          setStudent(response.data.student);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
          setComments(response.data);
        });
    }, []);

    const addComment = () => {

      if (!newComment) {
        alert('Please add all the required information.')
        return
      }

      axios.post("http://localhost:3001/comments", {user: student, commentBody: newComment, FormId: id}).then((response) => {
        const commentToAdd = {user: student, commentBody: newComment}
        setComments([...comments, commentToAdd])
        setNewComment("")
      })
    }

  return (
    <>
    <div className={`form ${form.isHighNeeds ? 'highNeeds' : ''}`}>
        <h3>
            {form.proposalName}{' '}
        </h3>
        <p>Start Date: {form.createdAt}</p>
        <p>Updated On {form.updatedAt}</p>
        <p><span className="form form-creator">Student: {form.student}</span></p>
        <div className="description">
        <h3>Description: {form.proposalDescription} </h3>
      <h3>Business Name: {form.businessName}</h3>
      <h3>High Needs: {form.highNeeds ? 'Yes' : 'No'}</h3>
      <h3>Hours: {form.hours}</h3>
      <button className="btn">
            {" "}
            Edit Form {" "}
          </button>
    </div>
    </div>
    <div className="form comment-container">
        <h3>
            Comments
        </h3>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return <Comment key={key} comment={comment} />
          })}
        </div>
        <div className="add-form form-control">
          <input type="text" value={newComment} placeholder="Comment..." onChange={(event) => {setNewComment(event.target.value)}}/>
          <button className="btn" onClick={addComment}>Add Comment</button>
        </div>
    </div>
    </>
  )
}

export default SeeForm
