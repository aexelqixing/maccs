import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import Description from './Description';
import { useState } from 'react';

const Form = ({ form }) => {
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
        <p>Start Date: {form.createdAt.substring(0,10)}</p>
        <p>Updated On {form.updatedAt.substring(0,10)}</p>
        <p><span className="form form-creator">Student: {form.student}</span></p>
        {showDescription && <Description form={ form } />}
    </div>
  )
}

export default Form
