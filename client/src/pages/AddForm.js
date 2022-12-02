import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const AddForm = () => {
  return (
    <div className="addFormPage">
      <Formik >
        <Form>
            <label>Student WPI Address: </label>
            <Field id="inputCreateForm" name="student" placeholder="lshilowa@wpi.edu"/>
            <label>Proposal Name: </label>
            <Field id="inputCreateForm" name="proposalName" placeholder="Doing Your STEM Project"/>
            <label>Business Name: </label>
            <Field id="inputCreateForm" name="businessName" placeholder="Mass Academy of Math and Science"/>
            <label>High Needs </label>
            <input type="checkbox" value={false}></input>
            <button type="submit"> Add Form </button>
        </Form>
      </Formik>
    </div>
  )
}

export default AddForm
