import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'

const Form = ({ form }) => {
  return (
    <div className={`form ${form.isHighNeeds ? 'highNeeds' : ''}`}>
        <h3>
            {form.proposalName}{' '}
            <FaPencilAlt 
                style={{ color: '#f48c06', cursor: 'pointer' }} 
            />
        </h3>
        <p>Start Date: {form.createdAt}</p>
        <p>Updated On {form.updatedAt}</p>
        <p><span className="form form-creator">Student: {form.student}</span></p>
    </div>
  )
}

export default Form
