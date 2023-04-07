import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const RepositoryContainer = styled.div`
  max-width: 700px;
  background-color: #202024;
  border-radius: 6px;
  padding: 20px;
  margin: 80px auto;
`

export const BackButton = styled(Link)`
  display: flex;

  background-color: transparent;
  border: 0;
  color: #a9a9b2;
  transition: 0.3s;

  &:hover {
    color: #e1e1e6;
  }
`

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
    border-radius: 50%;
    margin: 20px 0;
  }

  h1 {
    font-size: 35px;
  }

  p {
    margin-top: 5px;
    line-height: 1.6;
  }

  span {
    width: 91%;
    padding-top: 15px;
    border-bottom: 1px solid #323238;
  }
`

export const ActionsButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 10px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    border: 0;
    border-radius: 7px;
    background-color: #7c3aed;
    padding: 10px;
    color: #e1e1e6;
    font-weight: bold;
    transition: 0.3s;

    &:hover {
      background-color: #8b5cf6;
    }

    &:nth-child(${props => props.active + 1}) {
      background-color: #52525b;
    }
  }
`

export const IssuesList = styled.ul`
  padding: 30px;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 20px;
    margin-bottom: 10px;

    background-color: #29292e;
    border-radius: 6px;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #323238;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    .timeAndAuthor {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      border-top: 1px solid #323238;
      padding-top: 15px;
      font-size: 15px;

      p {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        font-weight: 600;
      }
    }
  }

  strong {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    a {
      text-decoration: none;
      color: #e1e1e6;
      margin-bottom: 8px;
      transition: 0.3s;

      &:hover {
        color: #a78bfa;
      }
    }

    span {
      color: #8b5cf6;
      font-size: 13px;
      font-weight: bold;
    }
  }
`

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;

  button {
    background-color: transparent;
    border: 0;
    color: #a9a9b2;
    transition: 0.3s;

    &:hover {
      color: #e1e1e6;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`
