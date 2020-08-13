import React from 'react';
import './App.css';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { rutFormat, rutValidate, rutClean } from 'rut-helpers';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 10px;
  width: 100%;
`;

function App() {

  
  const {register, handleSubmit, errors, getValues, setValue, formState} = useForm({
    mode: 'onBlur'
  });

  const { dirtyFields } = formState;
  
  const onSubmit = (values, e) => {
    e.preventDefault();
    values.rut = rutClean(values.rut);
    console.log(values);
  }

  const handleBlur = (e) => {
    if(e.target.name === 'rut') {
      const formatRut = rutFormat(getValues(e.target.name));
      setValue(e.target.name, formatRut, { shouldValidate: true });
    }
  }

  // console.log(errors);
  console.log(dirtyFields);

  const validations = {
    required: {
      value: true,
      message: 'Campo requerido'
    },
    minLength: {
      value: 3,
      message: 'Minimo de chars'
    }, 
    validate: value => rutValidate(value) || 'Rut validation failed'
  }
    
  return (
    <div className="App">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          type="text"
          name="rut"
          placeholder="Rut"
          ref={register(validations)}
          onBlur={handleBlur}
        />

        {errors?.rut && <small>{ errors.rut.message }</small>}
        <Input 
          type="text"
          name="pass"
          placeholder="password"
          ref={register}
        />
        {errors?.pass && <small>{ errors.pass.message }</small>}

        <button style={{marginTop: 10, padding: 10, width: 100+'%', boxSizing: 'border-box'}}>Submit</button>
      </Form>
    </div>
  );
}

export default App;
