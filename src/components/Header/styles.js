import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  min-height: 64px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      margin: 10px;
      font-weight: bold;
      color: #444444;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    span {
      text-align: right;
      width: 100px;
      height: 16px;
      font-family: Roboto;
      font-size: 14px;
      color: #666666;
    }

    button {
      border: 0;
      color: #de3b3b;
    }
  }
`;
