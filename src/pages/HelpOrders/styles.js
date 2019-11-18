import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 54px auto;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;

  strong {
    height: 28px;
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    color: #444444;
  }
`;

export const HelpOrderTable = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  margin-top: 4px;

  thead th {
    width: 100%;
    text-align: left;
    padding: 12px;
    width: 46px;
    height: 19px;
    font-family: Roboto;
    font-size: 16px;
    color: #444444;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    width: 79px;
    height: 20px;
    font-family: Roboto;
    font-size: 16px;
    color: #666666;
  }

  strong {
    color: #333;
    display: block;
  }

  div {
    display: flex;
  }
`;

export const CrudButton = styled.button`
  color: #4d85ee;
  margin: 5px;
  background: none;
  border: none;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 14px;
    color: #444;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 26px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;

    textarea {
      border: 1px solid #ddd;
      height: 127px;
      margin-bottom: 21px;
      padding: 13px 15px;
      color: #999;
      font-size: 16px;
    }

    button {
      background: #ee4d64;
      border: none;
      color: #fff;
      padding: 13px 134px;
    }
  }
`;
