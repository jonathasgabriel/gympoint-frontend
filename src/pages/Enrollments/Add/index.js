import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { format, addMonths, parseISO } from 'date-fns';

import SaveButton from '~/components/Buttons/SaveButton';
import BackButton from '~/components/Buttons/BackButton';

import history from '~/services/history';

import api from '~/services/api';

import {
  Container,
  Header,
  InfoWrapper,
  CustomSelect,
  CustomAsyncSelect,
  CustomDatePicker,
} from './styles';

export default function AddEnrollment(props) {
  const [totalPrice, setTotalPrice] = useState();
  const [student, setStudent] = useState();
  const [planOptions, setPlanOptions] = useState([]);
  const [plan, setPlan] = useState();
  const [startDate, setStartDate] = useState();
  const [editMode, setEditMode] = useState(false);

  const loadedOption = useMemo(() => {
    if (plan) {
      const ret = planOptions.find(po => po.value === plan.id);

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
        return {
          value: planOption.id,
          label: planOption.title,
          duration: planOption.duration,
          totalPrice: planOption.price * planOption.duration,
        };
      });

      const selectedPlan = loadedPlans.data.find(
        selectPlan => selectPlan.id === enrollment.data.plan.id
      );
      setPlanOptions(optionedPlans);
      setPlan(selectedPlan);
      setTotalPrice(selectedPlan.price * selectedPlan.duration);
      setStudent({
        value: enrollment.data.student.id,
        label: enrollment.data.student.name,
      });
      setStartDate(parseISO(enrollment.data.start_date));

      setEditMode(true);
    }

    async function loadAddData() {
      const response = await api.get('/plans');

      const optionedPlans = response.data.map(planOption => {
        return {
          value: planOption.id,
          label: planOption.title,
          duration: planOption.duration,
          totalPrice: planOption.price * planOption.duration,
        };
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
          plan_id: plan.value,
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

  const endDate = useMemo(() => {
    if (plan && startDate) {
      return format(addMonths(startDate, plan.duration), 'MM/dd/yyyy');
    }
    return '';
  }, [plan, startDate]);

  function handlePlanChange(e) {
    setPlan(e);
    setTotalPrice(e ? e.totalPrice : '');
  }

  async function loadStudents(value) {
    const res = await api.get(`students?name=${value}`);
    return new Promise(resolve => {
      resolve(
        res.data.map(st => {
          return {
            value: st.id,
            label: st.name,
            ...st,
          };
        })
      );
    });
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

      <Form id="enrollment-form" onSubmit={handleSubmit}>
        <strong>Student</strong>
        <CustomAsyncSelect
          cacheOptions
          isClearable
          defaultOptions
          loadOptions={e => loadStudents(e)}
          value={student}
          onChange={e => setStudent(e)}
        />
        <InfoWrapper>
          <div>
            <strong>Plan</strong>
            <CustomSelect
              isSearchable={false}
              isClearable
              options={planOptions}
              value={loadedOption}
              onChange={e => handlePlanChange(e)}
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
            <Input disabled name="endDate" value={endDate} />
          </div>
          <div>
            <strong>Total Price</strong>
            <Input disabled name="totalPrice" value={totalPrice} />
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
