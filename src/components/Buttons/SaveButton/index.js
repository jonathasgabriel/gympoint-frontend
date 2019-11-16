import React from 'react';
import PropTypes from 'prop-types';

import { MdDone } from 'react-icons/md';

import { Container } from './styles';

export default function SaveButton({ formSubmit }) {
  return (
    <Container form={formSubmit}>
      <MdDone size={20} />
      Save
    </Container>
  );
}

SaveButton.propTypes = {
  formSubmit: PropTypes.string.isRequired,
};
