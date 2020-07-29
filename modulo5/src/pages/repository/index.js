import React, { Component } from 'react';
import Proptypes from 'prop-types';
import api from '../../Services/api';
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import { Loading, Owner, IssueList, PageActions, IssueFilter } from './styles';
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
    status:'open',
    page: 1,
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
  handleFilter = async e => {
    const repoName = decodeURIComponent(this.props.match.params.repository);
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params:{
        state: e.target.value,
        per_page: 5,
        page: 1,
      },
    });

    this.setState({
      issues: issues.data,
      loading: false,
      status: e.target.value,
      page: 1,
    })
  };

  handlePreviousPage = async e => {
    // const page = this.state.page - 1;
    if(this.state.page !== 1){
      await this.setState(prevstate => ({ page: prevstate.page - 1}));

      const repoName = decodeURIComponent(this.props.match.params.repository);
      const issues = await api.get(`/repos/${repoName}/issues`, {
        params:{
          state: this.state.status,
          per_page: 5,
          page:this.state.page,
        },
      });


      this.setState({
        issues: issues.data,
      });
    }
  };

  handleNextPage = async e => {
    // const page = this.state.page + 1;
    await this.setState(prevstate => ({ page: prevstate.page + 1}));

    const repoName = decodeURIComponent(this.props.match.params.repository);
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params:{
        state: this.state.status,
        per_page: 5,
        page:this.state.page,
      },
    });


    this.setState({
      issues: issues.data,
    });
  };



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
      <IssueFilter>
          <label for="issueStatus">Issue status:</label>
            <select name="IssueStatus" id="IssueStatus" onChange={this.handleFilter}>
              <option value="open">open</option>
              <option value="all">all</option>
              <option value="closed">Closed</option>
            </select>

        </IssueFilter>

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
        <PageActions>
          <button onClick = {this.handlePreviousPage}>
            {(this.state.page===1) ? <FaArrowLeft color= "#ccc" size= {14} disabled/>: <FaArrowLeft color= "#7159c1" size= {14} /> }
          </button>
          {this.state.page}
          <button onClick = {this.handleNextPage}>
            <FaArrowRight color= "#7159c1" size= {14}/>
          </button>
        </PageActions>
      </IssueList>
    </Container>;
  }
}

