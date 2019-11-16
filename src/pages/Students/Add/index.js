import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import SaveButton from '~/components/Buttons/SaveButton';
import BackButton from '~/components/Buttons/BackButton';

import history from '~/services/history';

import api from '~/services/api';

import { Container, Header, InfoWrapper } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is required'),
  age: Yup.string().required('Age is required'),
  weight: Yup.string().required('Weight is required'),
  height: Yup.string().required('Height is required'),
});

export default function AddStudent(props) {
  const [initialStudent, setInitialStudent] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function loadStudent(id) {
      const response = await api.get(`students/${id}`);

      setInitialStudent(response.data);
      setEditMode(true);
    }

    const { id } = props.match.params;

    if (id) {
      loadStudent(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      if (editMode) {
        await api.put(`students/${initialStudent.id}`, {
          name,
          email,
          age,
          weight,
          height,
        });

        toast.success('Student updated successfully');
      } else {
        await api.post('students', {
          name,
          email,
          age,
          weight,
          height,
        });

        toast.success('Student registered successfully');
      }

      history.push('/students');
    } catch (err) {
      toast.error(
        'Error while trying to register the student, please verify your data'
      );
    }
  }

  return (
    <Container>
      <Header>
        <strong>{editMode ? 'Edit Student' : 'Register Student'}</strong>
        <div>
          <BackButton redirectPage="/students" />
          <SaveButton formSubmit="student-form" />
        </div>
      </Header>

      <Form
        id="student-form"
        initialData={initialStudent}
        schema={schema}
        onSubmit={handleSubmit}
      >
        <strong>Full Name</strong>
        <Input name="name" placeholder="Full name" />
        <strong>E-mail</strong>
        <Input name="email" type="email" placeholder="example@example.com" />
        <InfoWrapper>
          <div>
            <strong>Age</strong>
            <Input name="age" type="number" />
          </div>
          <div>
            <strong>Weight</strong>
            <Input name="weight" type="number" />
          </div>
          <div>
            <strong>Height</strong>
            <Input name="height" type="number" />
          </div>
        </InfoWrapper>
      </Form>
    </Container>
  );
}

AddStudent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
