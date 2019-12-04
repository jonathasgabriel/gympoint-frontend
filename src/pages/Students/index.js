import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '~/services/history';

import {
  Container,
  Header,
  StudentTable,
  CrudButton,
  SearchButton,
  StandardButton,
  SearchBarDiv,
} from './styles';

import api from '~/services/api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [searchStudent, setSearchStudent] = useState('');

  async function loadStudents() {
    const response = await api.get('students');

    setStudents(response.data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function handleInputChange(e) {
    setSearchStudent(e.target.value);
  }

  async function handleDeleteStudent(id) {
    await api.delete(`students/${id}`);

    setStudents(students.filter(student => student.id !== id));
    toast.success('Student deleted successfully');
  }

  async function filterStudent() {
    const response = await api.get(
      searchStudent ? `students?name=${searchStudent}` : 'students'
    );
    setStudents(response.data);
  }

  return (
    <Container>
      <Header>
        <strong>Manage Students</strong>
        <div>
          <StandardButton
            type="button"
            onClick={() => history.push('/students/add')}
          >
            <MdAdd size={20} />
            Add Student
          </StandardButton>
          <SearchBarDiv>
            <SearchButton type="button" onClick={() => filterStudent()}>
              <MdSearch size={20} />
            </SearchButton>
            <input
              placeholder="Search student"
              value={searchStudent}
              onChange={handleInputChange}
            />
          </SearchBarDiv>
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
            <tr key={String(student.id)}>
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
