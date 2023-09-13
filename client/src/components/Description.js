import React from 'react'
import { useNavigate } from 'react-router-dom';

const Description = ({ form }) => {
    let navigate = useNavigate()

  return (
    <div className="description">
      <h3>Description: {form.proposalDescription} </h3>
      <h3>Business Name: {form.businessName}</h3>
      <h3>High Needs: {form.isHighNeeds ? 'Yes' : 'No'}</h3>
      {form.isOnline ? <h3>Location: Online </h3> : <h3>Address: {form.streetAddress}, {form.city}, {form.state} {form.zipcode}</h3>}
      <h3>Hours: {form.hours}</h3>
      <button className="btn" onClick={() => navigate(`/form/${form.id}`)}>
            {" "}
            See Full Form {" "}
          </button>
    </div>
  )
}

export default Description