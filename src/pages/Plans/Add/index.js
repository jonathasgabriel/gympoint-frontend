import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import SaveButton from '~/components/Buttons/SaveButton';
import BackButton from '~/components/Buttons/BackButton';

import history from '~/services/history';

import api from '~/services/api';

import { Container, Header, InfoWrapper, CustomInput } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  duration: Yup.number().required('Duration is required'),
  price: Yup.number().required('Price is required'),
});

export default function AddPlan(props) {
  const [editMode, setEditMode] = useState(false);
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [planId, setPlanId] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    async function loadPlan(id) {
      const response = await api.get(`plans/${id}`);

      setEditMode(true);
      setPrice(response.data.price);
      setDuration(response.data.duration);
      setTitle(response.data.title);
      setPlanId(id);
    }

    const { id } = props.match.params;

    if (id) {
      loadPlan(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit() {
    try {
      if (editMode) {
        await api.put(`plans/${planId}`, {
          title,
          duration,
          price,
        });

        toast.success('Plan updated successfully');
      } else {
        await api.post('plans', {
          title,
          duration,
          price,
        });

        toast.success('Plan added successfully');
      }

      history.push('/plans');
    } catch (err) {
      console.tron.log(err);
      toast.error(
        'Error while trying to add the plan, please verify your data'
      );
    }
  }

  const totalPrice = useMemo(() => {
    if (duration && price) {
      return duration * price;
    }
    return '';
  }, [duration, price]);

  return (
    <Container>
      <Header>
        <strong>{editMode ? 'Edit Plan' : 'Add Plan'}</strong>
        <div>
          <BackButton redirectPage="/plans" />
          <SaveButton formSubmit="plan-form" />
        </div>
      </Header>

      <Form id="plan-form" schema={schema} onSubmit={handleSubmit}>
        <strong>Title</strong>
        <Input
          name="title"
          placeholder="Plan unique title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <InfoWrapper>
          <div>
            <strong>Duration</strong>
            <Input
              name="duration"
              type="number"
              placeholder="Duration in months"
              value={duration}
              onChange={e => setDuration(e.target.value)}
            />
          </div>
          <div>
            <strong>Price</strong>
            <Input
              name="price"
              type="number"
              placeholder="Price in USD"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div>
            <strong>Total Price</strong>
            <CustomInput
              disabled
              name="totalPrice"
              type="number"
              value={totalPrice}
            />
          </div>
        </InfoWrapper>
      </Form>
    </Container>
  );
}

AddPlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
