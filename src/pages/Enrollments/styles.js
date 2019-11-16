import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 142px;
    height: 36px;
    border-radius: 4px;
    background-color: #ee4d64;
    color: #fff;
    font-family: Roboto;
    font-size: 14px;
  }

  strong {
    min-width: 215px;
    height: 28px;
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    color: #444444;
  }
`;

export const StudentTable = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 4px;

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
  color: ${props => (props.edit ? '#4d85ee' : '#de3b3b')};
  margin: 5px;
  background: none;
  border: none;
`;
