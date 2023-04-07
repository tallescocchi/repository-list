import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ArrowFatLeft,
  ArrowFatRight,
  ArrowLeft,
  FolderOpen,
  List,
  Timer,
  UserCircle,
  XCircle
} from '@phosphor-icons/react'

import { api } from '../../services/api'

import {
  RepositoryContainer,
  Owner,
  Loading,
  BackButton,
  IssuesList,
  PageActions,
  ActionsButton
} from './styles'

export function Repository() {
  const { repository } = useParams()

  const [justRepository, setJustRepository] = useState({})
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState([
    { state: 'all', label: 'All', icon: <List size={16} />, active: true },
    {
      state: 'open',
      label: 'Opened',
      icon: <FolderOpen size={16} />,
      active: false
    },
    {
      state: 'closed',
      label: 'Closed',
      icon: <XCircle size={16} />,
      active: false
    }
  ])
  const [filterIndex, setFilterIndex] = useState(0)

  useEffect(() => {
    async function requestApi() {
      const [repositoryData, issuesData] = await Promise.all([
        api.get(`/repos/${repository}`),
        api.get(`/repos/${repository}/issues`, {
          params: {
            state: filters.find(f => f.active).state,
            per_page: 5
          }
        })
      ])
      setJustRepository(repositoryData.data)
      setIssues(issuesData.data)
      setLoading(false)
    }

    requestApi()
  }, [repository])

  useEffect(() => {
    async function loadIssues() {
      const response = await api.get(`/repos/${repository}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 5
        }
      })
      setIssues(response.data)
    }

    loadIssues()
  }, [filterIndex, filters, repository, page])

  function handlePage(action) {
    setPage(action === 'previous' ? page - 1 : page + 1)
  }

  function handleFilter(index) {
    setFilterIndex(index)
  }

  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', options)
  }

  if (loading) {
    return (
      <Loading>
        <h2>Carregando API...</h2>
      </Loading>
    )
  }

  return (
    <>
      <RepositoryContainer>
        <BackButton to="/">
          <ArrowLeft size={32} />
        </BackButton>
        <Owner>
          <img
            src={justRepository.owner.avatar_url}
            alt={justRepository.owner.login}
          />
          <h1>{justRepository.name}</h1>
          <p>{justRepository.description}</p>
          <span />
        </Owner>
        <ActionsButton active={filterIndex}>
          {filters.map((filter, index) => (
            <button
              type="button"
              key={filter.label}
              onClick={() => handleFilter(index)}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </ActionsButton>
        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />

              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>

                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <div className="timeAndAuthor">
                  <p>
                    <UserCircle size={20} />
                    {issue.user.login}
                  </p>
                  <p>
                    <Timer size={16} />
                    <strong>{formatDate(issue.created_at)}</strong>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </IssuesList>
        <PageActions>
          <button
            type="button"
            onClick={() => handlePage('previous')}
            disabled={page < 2}
          >
            <ArrowFatLeft size={30} />
          </button>
          <span>{page}</span>
          <button type="button" onClick={() => handlePage('next')}>
            <ArrowFatRight size={30} />
          </button>
        </PageActions>
      </RepositoryContainer>
    </>
  )
}
