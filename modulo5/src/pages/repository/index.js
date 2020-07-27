import React, { Component } from 'react';
import Proptypes from 'prop-types';
import api from '../../Services/api';
import { Link } from 'react-router-dom'

import { Loading, Owner, IssueList } from './styles';
import Container from '../../components/container';

export default class Repository extends Component {
  static propTypes = {
    match: Proptypes.shape({
      params: Proptypes.shape({
        repository: Proptypes.string,
      })
    }).isRequired,
  }

  state = {
    repositorys: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);


    const [ repo, issues ] = await Promise.all([
       api.get(`/repos/${repoName}`),
       api.get(`/repos/${repoName}/issues`, {
         params:{
           state: 'open',
           per_page: 5,
         },
       }),
    ]);

    this.setState({
      repository: repo.data,
      issues: issues.data,
      loading: false,
    })
  }

  render() {
    const {repository, issues, loading} = this.state;
    if(loading) {
      return <Loading>Carregando</Loading>
    }

    return <Container>
      <Owner>
        <Link to= "/">Voltar aos repositórios</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>
      <IssueList>
        {issues.map(issue => (
          <li key ={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login}/>
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map( label => (
                  <span id= {String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>
    </Container>;
  }
}

