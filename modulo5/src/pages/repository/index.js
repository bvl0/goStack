import React, { Component } from 'react';
import Proptypes from 'prop-types';
import api from '../../Services/api';
import { Link } from 'react-router-dom'

import { Loading, Owner } from './styles';
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
    </Container>;
  }
}

