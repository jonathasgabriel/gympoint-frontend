import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import en from 'date-fns/locale/en-US';
import history from '~/services/history';

import { Container, Header, StudentTable, CrudButton } from './styles';

import api from '~/services/api';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('enrollments');

      const data = response.data.map(enrollment => {
        return {
          id: enrollment.id,
          student: enrollment.student.name,
          plan: enrollment.plan.title,
          startDate: format(parseISO(enrollment.start_date), 'MMMM d, yyyy', {
            locale: en,
          }),
          endDate: format(parseISO(enrollment.end_date), 'MMMM d, yyyy', {
            locale: en,
          }),
          active: enrollment.active,
        };
      });

      setEnrollments(data);
    }

    loadEnrollments();
  }, []);

  async function handleDeleteEnrollment(id) {
    await api.delete(`enrollments/${id}`);

    setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
    toast.success('Enrollments deleted successfully');
  }

  return (
    <Container>
      <Header>
        <strong>Manage Enrollments</strong>
        <button type="button" onClick={() => history.push('/enrollments/add')}>
          <MdAdd size={20} />
          Add Enrollment
        </button>
      </Header>
      <StudentTable>
        <thead>
          <tr>
            <th>Student</th>
            <th>Plan</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Active</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => (
            <tr>
              <td>
                <span>{enrollment.student}</span>
              </td>
              <td>
                <span>{enrollment.plan}</span>
              </td>
              <td>
                <span>{enrollment.startDate}</span>
              </td>
              <td>
                <span>{enrollment.endDate}</span>
              </td>
              <td>
                <span>
                  {enrollment.active ? (
                    <MdCheckCircle color="#42cb59" />
                  ) : (
                    <MdCheckCircle color="#dddd" />
                  )}
                </span>
              </td>
              <td>
                <div>
                  <CrudButton
                    type="button"
                    edit
                    onClick={() =>
                      history.push(`/enrollments/edit/${enrollment.id}`)
                    }
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
                        handleDeleteEnrollment(enrollment.id);
                    }}
                  >
                    delete
                  </CrudButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </StudentTable>
    </Container>
  );
}
