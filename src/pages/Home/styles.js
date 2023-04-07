import styled, { keyframes, css } from 'styled-components'

export const HomeContainer = styled.div`
  max-width: 700px;
  background-color: #202024;
  border-radius: 6px;
  padding: 20px;
  margin: 80px auto;

  h1 {
    display: flex;
    align-items: center;
    gap: 1rem;

    border-bottom: 1px solid #323238;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    align-items: center;
    gap: 1rem;

    input {
      flex: 1;
      font-size: 1rem;

      padding: 15px 10px;
      border-radius: 6px;
      border: 1px solid #323238;
      background-color: #29292e;
      color: #a9a9b2;
    }
  }

  .error {
    margin-top: 20px;
    color: #b91c1c;
  }
`

const Animate = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg); 
  }
`

export const Button = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading
}))`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  border: 0;
  color: #a9a9b2;
  transition: 0.3s;

  &:hover {
    color: #e1e1e6;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${Animate} 2s linear infinite;
      }
    `}
`

export const ListRepositories = styled.ul`
  list-style: none;
  margin-top: 15px;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0.75rem 0;

    border-bottom: 1px solid #323238;

  a {
      color: #a9a9b2;
  
      &:hover {
      color: #e1e1e6;
    }
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  }
`

export const DeleteButton = styled.button`
  background-color: transparent;
  border: 0;
  color: #a9a9b2;

  &:hover {
  color: #e1e1e6;
  }

`
