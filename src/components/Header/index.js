import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Content } from './styles';
import logo from '~/assets/logo-header.svg';

export default function Header() {
  const dispatch = useDispatch();

  const username = useSelector(state => state.user.user.name);

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <Link to="/students"> Students</Link>
          <Link to="/plans"> Plans</Link>
          <Link to="/enrollments"> Enrollments</Link>
          <Link to="/students"> Help Orders</Link>
        </nav>

        <div>
          <span>{username}</span>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </Content>
    </Container>
  );
}
