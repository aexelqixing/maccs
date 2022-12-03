import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FullForm from '../components/FullForm';
import axios from 'axios';

const SeeForm = () => {
    let { id } = useParams();
    const [formObject, setFormObject] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3001/forms/byId/${id}`).then((response) => {
          setFormObject(response.data);
    });
    })

  return (
    <FullForm form={formObject} />
  )
}

export default SeeForm
