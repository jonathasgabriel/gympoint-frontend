import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import Modal from 'react-modal';

import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  Container,
  Header,
  HelpOrderTable,
  CrudButton,
  ModalContent,
} from './styles';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
};

Modal.setAppElement('#root');

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedHelpOrder, setSelectedHelpOrder] = useState({});

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('help-orders');

      setHelpOrders(response.data);
    }

    loadHelpOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOpenModal(helpOrder) {
    setSelectedHelpOrder({
      id: helpOrder._id,
      question: helpOrder.question,
    });
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSubmit({ answer }) {
    await api.put(`help-orders/${selectedHelpOrder.id}/answer`, {
      answer,
    });

    setHelpOrders(helpOrders.filter(ho => ho._id !== selectedHelpOrder.id));
    toast.success('Help order answered successfully');
    setIsOpen(false);
  }

  return (
    <Container>
      <Header>
        <strong>Manage Help Orders</strong>
      </Header>
      <HelpOrderTable>
        <thead>
          <tr>
            <th>Student</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {helpOrders.map(helpOrder => (
            <tr key={String(helpOrder.id)}>
              <td>
                <span>{helpOrder.studentName}</span>
              </td>
              <td>
                <CrudButton
                  type="button"
                  edit
                  onClick={() => handleOpenModal(helpOrder)}
                >
                  answer
                </CrudButton>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customModalStyles}
                  contentLabel="Help Order Modal"
                >
                  <ModalContent>
                    <strong>Student question</strong>
                    <p>{selectedHelpOrder.question}</p>
                    <strong>Your answer</strong>
                    <Form onSubmit={handleSubmit}>
                      <Input multiline name="answer" />
                      <button type="submit">Submit answer</button>
                    </Form>
                  </ModalContent>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </HelpOrderTable>
    </Container>
  );
}
