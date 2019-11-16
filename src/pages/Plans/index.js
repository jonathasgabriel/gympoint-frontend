import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import history from '~/services/history';

import { Container, Header, PlanTable, CrudButton } from './styles';

import api from '~/services/api';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      setPlans(response.data);
    }

    loadPlans();
  }, []);

  async function handleDeletePlan(id) {
    await api.delete(`plans/${id}`);

    setPlans(plans.filter(plan => plan.id !== id));
    toast.success('Plan deleted successfully');
  }

  return (
    <Container>
      <Header>
        <strong>Manage Plans</strong>
        <button type="button" onClick={() => history.push('/plans/add')}>
          <MdAdd size={20} />
          Add Plan
        </button>
      </Header>
      <PlanTable>
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration (in months)</th>
            <th>Price (per month)</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr>
              <td>
                <span>{plan.title}</span>
              </td>
              <td>
                <span>{plan.duration}</span>
              </td>
              <td>
                <span>{plan.price}</span>
              </td>
              <td>
                <div>
                  <CrudButton
                    type="button"
                    edit
                    onClick={() => history.push(`/plans/edit/${plan.id}`)}
                  >
                    edit
                  </CrudButton>
                  <CrudButton
                    type="button"
                    onClick={() => {
                      if (
                        // eslint-disable-next-line no-alert
                        window.confirm(
                          'Are you sure you wish to delete this item?'
                        )
                      )
                        handleDeletePlan(plan.id);
                    }}
                  >
                    delete
                  </CrudButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </PlanTable>
    </Container>
  );
}
