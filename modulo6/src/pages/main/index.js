import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Form, SubmitButton, Input} from './styles';

const Main = () => {
  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCaptalize= "none"
          placeholder="Adicionar usuário"
        />

        <SubmitButton>
          <Icon name= "add" size={20} color="#fff" />
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default Main;
