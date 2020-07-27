import React, {Component} from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import {Link} from 'react-router-dom'

import api from '../../Services/api';

import Container from '../../components/container'
import { Form, SubmitButton, List } from './styles';

  class Main extends Component {
    state ={
      newRepo: '',
      repositories: [],
      loading: false,
      error: false,
    };

    componentDidMount(){
      const repositories = localStorage.getItem('repositories');

      if(repositories) {
        this.setState({ repositories: JSON.parse(repositories)});
      }
    };

    componentDidUpdate(_, prevState){
      if(prevState.repositories !== this.state.repositories) {
        localStorage.setItem('repositories', JSON.stringify(this.state.repositories));
      }

    };

    handleInputChange = e => {
      this.setState({ newRepo : e.target.value});
    };

    handleSubmit = async e => {
      try {
        e.preventDefault();
        this.setState({ loading: true });
        const { newRepo, repositories } = this.state;

        const response = await api.get(`/repos/${newRepo}`);

        const data = {
          name: response.data.full_name,
        };
        for(let repo of repositories) {
          if(repo.name.toLowerCase() === newRepo.toLocaleLowerCase()){
            throw new Error('Error: duplicated repository');
          }
        }

        this.setState({
          repositories : [...repositories,data],
          newRepo: '',
          loading: false,
          error: false,
        })

      } catch(err){
        this.setState({
          loading:false,
          error:true,
        })
      };


    }


    render() {
      const { newRepo, loading, repositories, error } = this.state;
      return (
        <Container>
          <h1>
          <FaGithubAlt/>
            Repositórios
          </h1>

          <Form onSubmit={this.handleSubmit} error = {error}>
            <input
              type = "text"
              placeholder = "adicionar repositório"
              value={newRepo}
              onChange={this.handleInputChange}

            />
            <SubmitButton loading = {loading}>
              { loading ? <FaSpinner color= "#fff" size= {14}/> : <FaPlus color= "#fff" size= {14} />}
            </SubmitButton>
          </Form>

          <List>
            {repositories.map(repository => (
              <li key={repository.name}>
                <span>{repository.name}</span>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
              </li>
            ))}
          </List>

        </Container>
      )
    }
  }

export default Main;
