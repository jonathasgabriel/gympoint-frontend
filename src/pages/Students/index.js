import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '~/services/history';

import { Container, Header, StudentTable, CrudButton } from './styles';

import api from '~/services/api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [searchStudent, setSearchStudent] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    loadStudents();
  }, []);

  function handleInputChange(e) {
    setSearchStudent(e.target.value);
    console.tron.log(searchStudent);
  }

  async function handleDeleteStudent(id) {
    await api.delete(`students/${id}`);

    setStudents(students.filter(student => student.id !== id));
    toast.success('Student deleted successfully');
  }

  return (
    <Container>
      <Header>
        <strong>Manage Students</strong>
        <div>
          <button type="button" onClick={() => history.push('/students/add')}>
            <MdAdd size={20} />
            Add Student
          </button>
          <input
            placeholder="Search student"
            value={searchStudent}
            onChange={handleInputChange}
          />
        </div>
      </Header>
      <StudentTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Age</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr>
              <td>
                <span>{student.name}</span>
              </td>
              <td>
                <span>{student.email}</span>
              </td>
              <td>
                <span>{student.age}</span>
              </td>
              <td>
                <div>
                  <CrudButton
                    type="button"
                    edit
                    onClick={() => history.push(`/students/edit/${student.id}`)}
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
                        handleDeleteStudent(student.id);
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
