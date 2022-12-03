import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import Description from './Description';
import { useState } from 'react';

const FullForm = ({ form }) => {

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
    </div>
    </>
  )
}

export default FullForm

