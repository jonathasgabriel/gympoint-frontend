import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

export const Content = styled.div`
  width: 100%;
  background: #fff;
  max-width: 315px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  text-align: center;

  img {
    margin-top: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;

    input {
      width: 250px;
      height: 45px;
      border-radius: 4px;
      border: solid 1px #dddddd;
      background-color: #ffffff;
      padding-left: 15px;
      margin-top: 8px;

      &::placeholder {
        color: #999999;
      }
    }

    span {
      color: #444444;
      font-size: 16px;
      font-weight: bold;
      margin: 25px 0px 0px 32px;
      align-self: flex-start;
    }

    button {
      margin: 25px 0 25px;
      height: 45px;
      width: 250px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.09, '#ee4d64')};
      }
    }
  }
`;
