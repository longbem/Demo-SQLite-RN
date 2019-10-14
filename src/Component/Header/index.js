import React from 'react';
import {Container, Header, Body, Right, Title, Button} from 'native-base';
import IconAn from 'react-native-vector-icons/AntDesign';

export default class HeaderFix extends React.Component {
  render() {
    return (
      <Header style={{backgroundColor: '#ffffff'}}>
        <Body>
          <Title style={{color: '#4CC773', fontWeight: 'bold'}}>
            Khách hàng
          </Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate('AddCustomer')}>
            <IconAn name="adduser" size={25} color="#4CC773" />
          </Button>
        </Right>
      </Header>
    );
  }
}
