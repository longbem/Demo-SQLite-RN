import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Body,
  Right,
  Left,
  Button,
} from 'native-base';
import IconAn from 'react-native-vector-icons/AntDesign';
import IconAw from 'react-native-vector-icons/FontAwesome';

import {Card} from 'react-native-elements';
import Database from '../../../Database/Database';

// khai bao database
const db = new Database();

export default class DetailCustomerScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      customer: {},
      id: '',
    };
  }

  // function to initailizen the screen
  componentDidMount() {
    this._subcribe = this.props.navigation.addListener('didFocus', () => {
      const {navigation} = this.props;
      console.log('DidMount');
      db.customerByID(navigation.getParam('id_khach'))
        .then(data => {
          console.log('data: ', data);
          const customer = data;
          console.log('id khach detail: ', this.state.id);
          this.setState({
            customer,
            isLoading: false,
            id: customer.id_khach,
          });
        })
        .catch(err => {
          console.log('err detail customer: ', err);
          this.setState = {
            isLoading: false,
          };
        });
    });
  }

  // function delete a customer
  deleteCustomer(id) {
    const {navigation} = this.props;
    this.setState({
      isLoading: true,
    });
    db.deleteCustomer(id)
      .then(result => {
        console.log('result: ', result);
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log('err', err);
        this.setState = {
          isLoading: false,
        };
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <Container>
        <Header style={{backgroundColor: '#ffffff'}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <IconAn name={'left'} size={25} color={'#A49BA8'} />
            </Button>
          </Left>
          <Body />
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('EditCustomer', {
                  id_khach: `${this.state.id}`,
                });
              }}>
              <IconAn name={'edit'} size={25} color={'#A49BA8'} />
            </Button>
            <Button
              transparent
              onPress={() => this.deleteCustomer(this.state.id)}>
              <IconAn name={'deleteuser'} size={25} color={'#A49BA8'} />
            </Button>
          </Right>
        </Header>
        <Content>
          <ScrollView>
            <Card style={styles.container}>
              <View style={styles.subContainer}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <IconAn name={'user'} size={25} color={'#00BF09'} style={{padding: 5, width: 35}} />
                  <Text style={{fontSize: 20, padding: 5}}>
                    {this.state.customer.ten_khach}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <IconAn name={'phone'} size={25} color={'#00BF09'} style={{padding: 5, width: 35}} />
                  <Text style={{fontSize: 20, padding: 5}}>
                    {this.state.customer.so_dien_thoai}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <IconAw name={'dollar'} size={25} color={'#00BF09'} style={{padding: 5, width: 35}} />
                  <Text style={{fontSize: 20, padding: 5}}>
                    {this.state.customer.tien_hang}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <IconAn name={'enviroment'} size={25} color={'#00BF09'} style={{paddingTop: 5, width: 35}} />
                  <Text style={{fontSize: 20, padding: 5}}>
                    {this.state.customer.dia_chi}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <IconAw
                    name={'sticky-note-o'}
                    size={25}
                    color={'#00BF09'}
                    style={{padding: 5, width: 35}}
                  />
                  <Text style={{fontSize: 20, padding: 5}}>
                    {this.state.customer.ghi_chu}
                  </Text>
                </View>
              </View>
            </Card>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailButton: {
    marginTop: 10,
  },
});
