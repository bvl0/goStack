import React, { Component } from 'react';
import { View } from 'react-native';
import PropType from 'prop-types';
import api from '../../services/api';

// import { Container } from './styles';

export default class User extends Component {
  static navigationOptions =({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropType.shape({
      getParam: PropType.func,
    }).isRequired,
  };

  state = {
    stars: [],
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`users/${user.login}/starred`);

    this.setState({stars: response.data})
  }

  render() {
    return (
      <Container>
        
      </Container>
    );
  }
};
