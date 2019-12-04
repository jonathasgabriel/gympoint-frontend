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

export const StudentTable = styled.table`
  width: 100%;
  table-layout: fixed;
  background: #fff;
  border-radius: 4px;

  thead th {
    text-align: left;
    padding: 12px;
    font-family: Roboto;
    font-size: 16px;
    color: #444444;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    font-family: Roboto;
    font-size: 16px;
    color: #666666;
  }

  strong {
    color: #333;
    display: block;
  }
`;

export const CrudButton = styled.button`
  color: ${props => (props.edit ? '#4d85ee' : '#de3b3b')};
  margin: 5px;
  background: none;
  border: none;
`;

export const StandardButton = styled.button`
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
`;

export const SearchButton = styled.button`
  position: absolute;
  margin-left: 20px;
  margin-top: 8px;
  border-color: #ffff;
`;

export const SearchBarDiv = styled.div`
  position: relative;
  > input {
    width: 100%;
  }
`;
