import { useCallback, useEffect, useState } from 'react'

import {
  Eye,
  GithubLogo,
  PlusSquare,
  Spinner,
  Trash
} from '@phosphor-icons/react'

import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

import { api } from '../../services/api'

import { Button, DeleteButton, HomeContainer, ListRepositories } from './styles'

export function Home() {
  const [repository, setRepository] = useState('')
  const [savedRepositorys, setSavedRepositorys] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cookies, setCookie] = useCookies(['repositories'])

  useEffect(() => {
    if (cookies.savedRepositorys) {
      setSavedRepositorys(cookies.savedRepositorys)
    }
  }, [])

  useEffect(() => {
    setCookie('savedRepositorys', savedRepositorys, {
      path: '/',
      expires: new Date(Date.now() + 31536000000)
    })
  }, [savedRepositorys])

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()

      async function requestSubmit() {
        setLoading(true)
        try {
          if (!repository) {
            setError('Você precisa adicionar um repositório.')
          } else {
            setError('')
          }

          const response = await api.get(`repos/${repository}`)

          const hasRepository = savedRepositorys.find(
            r => r.name === repository
          )

          if (hasRepository) {
            setError('Você já adicionou esse repositório.')
            throw new Error()
          } else {
            setError('')
          }

          const data = {
            name: response.data.full_name
          }

          setSavedRepositorys([...savedRepositorys, data])
          setRepository('')
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
      requestSubmit()
    },
    [repository, savedRepositorys]
  )

  function handleInputChange(e) {
    setRepository(e.target.value)
  }

  const handleDeleteRepository = useCallback(
    repository => {
      const findNameList = savedRepositorys.filter(r => r.name !== repository)
      setSavedRepositorys(findNameList)
    },
    [savedRepositorys]
  )

  return (
    <>
      <HomeContainer>
        <h1>
          <GithubLogo size={42} />
          Meus Repositórios
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositórios"
            value={repository}
            onChange={handleInputChange}
          />

          <Button loading={loading ? 1 : 0}>
            {loading ? <Spinner size={32} /> : <PlusSquare size={32} />}
          </Button>
        </form>

        {error && <p className="error">{error}</p>}

        <ListRepositories>
          {savedRepositorys.map(savedRepository => (
            <li key={savedRepository.name}>
              <span>{savedRepository.name}</span>
              <div>
                <Link to={`/repository/${encodeURIComponent(savedRepository.name)}`}>
                  <Eye size={24} />
                </Link>
                <DeleteButton
                  onClick={() => handleDeleteRepository(savedRepository.name)}
                >
                  <Trash size={24} />
                </DeleteButton>
              </div>
            </li>
          ))}
        </ListRepositories>
      </HomeContainer>
    </>
  )
}
