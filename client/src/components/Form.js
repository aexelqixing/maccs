import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import Description from './Description';
import { useState } from 'react';

const Form = ({ form, isAdmin }) => {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className={`form ${form.isHighNeeds ? 'highNeeds' : ''}`}>
        <h3>
            {form.proposalName}{' '}
            <FaPencilAlt 
                style={{ color: '#f48c06', cursor: 'pointer' }} 
                onClick={() => setShowDescription(!showDescription)}
            />
        </h3>
        <p>Start Date: {form.createdAt.substring(0,10)} {form.createdAt.substring(11,19)}</p>
        <p>Updated On {form.updatedAt.substring(0,10)} {form.updatedAt.substring(11,19)}</p>
        <p>{isAdmin && <span className="form form-creator">Student: {form.student}</span>} <span className={`status-all ${form.status === 'not approved' ? 'rejected' : form.status}`}>{form.status}</span></p>
        {showDescription && <Description form={ form } />}
    </div>
  )
}

export default Form
