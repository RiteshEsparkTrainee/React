import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import { MyCheckbox,MyRadioGroup,MyTextInput,MySelect } from './FormComponent';
const Step1 = () => {
    return (
      <>
        <MyTextInput
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Jane"
        />
        <MyTextInput
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Doe"
        />
      </>
    );
  };

  const Step2 = () => {
    return (
      <>
        <MyTextInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="jane@formik.com"
        />
        <MySelect label="Job Type" name="jobType">
          <option value="">Select a job type</option>
          <option value="designer">Designer</option>
          <option value="development">Developer</option>
          <option value="product">Product Manager</option>
          <option value="other">Other</option>
        </MySelect>
        <MyRadioGroup
        label="Preferred Contact Method"
        name="contactMethod"
        options={[
          { label: 'Email', value: 'email' },
          { label: 'Phone', value: 'phone' }
        ]}
      />
      </>
    );
  };

  const Step3 = () => {
    return (
      <MyCheckbox name="acceptedTerms">
        I accept the terms and conditions
      </MyCheckbox>
    );
  };
  
const stepTitles = ["Personal Information", "Job Details", "Terms and Conditions"];
const validationSchemas = [
  Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
  }),
  Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    jobType: Yup.string()
      .oneOf(['designer', 'development', 'product', 'other'], 'Invalid Job Type')
      .required('Required'),
    contactMethod: Yup.string()
      .oneOf(['email', 'phone'], 'Invalid Contact Method')
      .required('Required'),
      
    technologies: Yup.array().of(
          Yup.object().shape({
            selected: Yup.boolean(),
            level: Yup.string().when('selected', {
              is: true,
              then: Yup.string().required('Please select a level of expertise'),
              otherwise: Yup.string()
            })
          })
        )     
      
  }),
  Yup.object({
    acceptedTerms: Yup.boolean()
      .required('Required')
      .oneOf([true], 'You must accept the terms and conditions.'),
  }),
];

const SignupForm = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setStep((s) => s - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      default:
        return null;
    }
  };

  return (
    <>
      <h1>{stepTitles[step]}</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          acceptedTerms: false,
          jobType: '',
          contactMethod: '',
        }}
        validationSchema={validationSchemas[step]}
        onSubmit={(values, { setSubmitting }) => {
          if (step === stepTitles.length - 1) {
            console.log(JSON.stringify(values, null, 2));
          } else {
            nextStep();
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {renderStepContent(step)}
            <div>
              {step > 0 && (
                <button type="button" onClick={prevStep}>
                  Back
                </button>
              )}
              <button type="submit">
                {step === stepTitles.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm
