import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import SaveButton from '~/components/Buttons/SaveButton';
import BackButton from '~/components/Buttons/BackButton';

import history from '~/services/history';

import api from '~/services/api';

import {
  Container,
  Header,
  InfoWrapper,
  CustomSelect,
  CustomDatePicker,
} from './styles';

const schema = Yup.object().shape({
  startDate: Yup.string().required('Start date is required'),
});

export default function AddEnrollment(props) {
  const [student, setStudent] = useState();
  const [planOptions, setPlanOptions] = useState([]);
  const [plan, setPlan] = useState();
  const [startDate, setStartDate] = useState();
  const [editMode, setEditMode] = useState(false);

  const loadedOption = useMemo(() => {
    if (plan) {
      const ret = planOptions.find(po => po.value === plan);

      return ret;
    }
    return '';
  }, [plan, planOptions]);

  useEffect(() => {
    async function loadEditData(id) {
      const [enrollment, loadedPlans] = await Promise.all([
        api.get(`/enrollments/${id}`),
        api.get('/plans'),
      ]);

      const optionedPlans = loadedPlans.data.map(planOption => {
        return { value: planOption.id, label: planOption.title };
      });

      setPlanOptions(optionedPlans);
      setPlan(enrollment.data.plan.id);
      setEditMode(true);
    }

    async function loadAddData() {
      const response = await api.get('/plans');

      const optionedPlans = response.data.map(planOption => {
        return { value: planOption.id, label: planOption.title };
      });

      setPlanOptions(optionedPlans);
    }

    const { id } = props.match.params;

    if (id) {
      loadEditData(id);
    } else {
      loadAddData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit() {
    try {
      if (editMode) {
        const { id } = props.match.params;

        await api.put(`enrollments/${id}`, {
          student_id: student.id,
          plan_id: plan.id,
          start_date: startDate,
        });

        toast.success('Enrollment updated successfully');
      } else {
        await api.post('enrollments', {
          student_id: student.id,
          plan_id: plan.id,
          start_date: startDate,
        });

        toast.success('Enrollment added successfully');
      }

      history.push('/enrollments');
    } catch (err) {
      toast.error(
        'Error while trying to create the enrollment, please verify your data'
      );
    }
  }

  return (
    <Container>
      <Header>
        <strong>{editMode ? 'Edit Enrollment' : 'Create Enrollment'}</strong>
        <div>
          <BackButton redirectPage="/enrollments" />
          <SaveButton formSubmit="enrollment-form" />
        </div>
      </Header>

      <Form id="enrollment-form" schema={schema} onSubmit={handleSubmit}>
        <strong>Student</strong>
        <Input name="student" placeholder="Full name" />
        <InfoWrapper>
          <div>
            <strong>Plan</strong>
            <CustomSelect
              isSearchable={false}
              options={planOptions}
              value={loadedOption}
              onChange={e => setPlan(e.value)}
            />
          </div>
          <div>
            <strong>Start Date</strong>
            <CustomDatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
            />
          </div>
          <div>
            <strong>End Date</strong>
            <Input disabled name="endDate" />
          </div>
          <div>
            <strong>Total Price</strong>
            <Input disabled name="totalPrice" />
          </div>
        </InfoWrapper>
      </Form>
    </Container>
  );
}

AddEnrollment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
