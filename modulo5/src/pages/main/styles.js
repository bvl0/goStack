import Styled, { keyframes, css } from 'styled-components';

export const Container = Styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  padding: 30px;
  margin: 80px auto;

  h1{
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  svg{
    margin-right: 10px;
  }
`
export const Form = Styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input{
    flex: 1;
    border: ${(props) => (props.error ? '2px solid #ff0000' : '1px solid #ddd') };
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`


export const SubmitButton = Styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  padding: 8px 8px 8px 16px;
  margin-left: 10px;
  border-radius: 4px;
  border-width: 2px;
  border: 0;
  justify-content: center;
  display: flex;
  align-items: center;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 1.5s linear infinite;
      }
    `}
`

export const List = Styled.ul`
  list-style: none;
  margin-top: 30px;

  li{
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li{
      border-top: 1px solid #eee;
    }

    a{
      color: #7159c1;
      text-decoration: none;
    }
  }

`
