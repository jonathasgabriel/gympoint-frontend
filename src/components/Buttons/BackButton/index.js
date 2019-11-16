import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import history from '~/services/history';

import { Container } from './styles';

export default function BackButton({ redirectPage }) {
  return (
    <Container type="button" onClick={() => history.push(redirectPage)}>
      <MdKeyboardArrowLeft size={20} />
      Back
    </Container>
  );
}

BackButton.propTypes = {
  redirectPage: PropTypes.string.isRequired,
};
