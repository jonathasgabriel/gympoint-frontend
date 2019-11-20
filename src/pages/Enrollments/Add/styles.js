import styled from 'styled-components';

import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    border-radius: 4px;
    background: #fff;

    > input {
      margin: 5px 40px;
      border-radius: 4px;
      border: solid 1px #dddddd;
      height: 44px;
      padding: 0 15px;
    }

    > strong {
      margin: 25px 40px 0;
      width: 118px;
      height: 16px;
      font-family: Roboto;
      font-size: 14px;
      font-weight: bold;
      color: #444444;
    }
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  margin: -5px 40px 25px;
  flex-wrap: wrap;

  input {
    min-width: 150px;
    max-width: 270px;
    height: 45px;
    border-radius: 4px;
    border: solid 1px #dddddd;
    padding: 0 15px;
    margin-top: 5px;
  }

  > div {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  strong {
    margin: 25px 0 0;
    width: 118px;
    height: 16px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
  }
`;

export const CustomSelect = styled(Select)`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 270px;
  height: 45px;
  border-radius: 4px;
  margin-top: 5px;

  div {
    display: flex;
    margin: 0;
    padding-left: 5px;
    padding-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    span {
      margin-bottom: 15px;
    }
  }
`;

export const CustomAsyncSelect = styled(AsyncSelect)`
  margin: 5px 40px;

  #react-select-2-input {
    margin: 15px 15px 15px 15px;
  }

  div {
    align-items: center;
    height: 45px;

    div {
      margin-left: 3px;
      div {
        margin-top: 13px;
      }
    }

    span {
      margin-bottom: 10px;
    }
  }
`;

export const CustomDatePicker = styled(DatePicker)`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    justify-content: space-between;

    input {
      margin-left: 15px;
      width: 237px;
      height: 36px;
      border-radius: 4px;
      padding-left: 40px;
      border: solid 1px #dddddd;
    }
  }

  strong {
    width: 215px;
    height: 28px;
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    color: #444444;
  }
`;
