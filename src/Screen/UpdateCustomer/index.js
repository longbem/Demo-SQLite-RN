import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput,
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Body,
  Right,
  Title,
  Left,
  Button,
} from 'native-base';
import IconAn from 'react-native-vector-icons/AntDesign';
import Database from '../../../Database/Database';

const db = new Database();

export default class UpdateCustomerSreen extends Component {
  constructor() {
    super();
    this.state = {
      //id_khach: '',
      ten_khach: '',
      so_dien_thoai: '',
      tien_hang: '',
      dia_chi: '',
      ghi_chu: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    console.log('edit 01');
    const {navigation} = this.props;
    db.customerByID(navigation.getParam('id_khach'))
      .then(data => {
        console.log('edit su');
        console.log('data: ', data);
        const customer = data;
        this.setState({
          ten_khach: customer.ten_khach,
          so_dien_thoai: customer.so_dien_thoai,
          tien_hang: customer.tien_hang,
          dia_chi: customer.dia_chi,
          ghi_chu: customer.ghi_chu,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log('err edit: ', err);
        this.setState = {
          isLoading: false,
        };
      });
  }

  // function update values textinput
  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  // function update customer
  updateCustomer() {
    this.setState({
      isLoading: true,
    });
    const {navigation} = this.props;
    let data = {
      ten_khach: this.state.ten_khach,
      so_dien_thoai: this.state.so_dien_thoai,
      tien_hang: this.state.tien_hang,
      dia_chi: this.state.dia_chi,
      ghi_chu: this.state.ghi_chu,
    };
    db.updateCustomer(data.id_khach, data)
      .then(result => {
        console.log(result);
        this.setState({
          isLoading: false,
        });
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
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
          <Body>
            <Title style={{color: '#123'}}>Sửa {this.state.ten_khach}</Title>
          </Body>
        </Header>
        <Content>
          <ScrollView style={styles.container}>
            <View style={styles.subContainer}>
              <TextInput
                placeholder={'Tên khách'}
                value={this.state.ten_khach}
                onChangeText={text => this.updateTextInput(text, 'ten_khach')}
              />
            </View>
            <View style={styles.subContainer}>
              <TextInput
                placeholder={'Số điện thoại'}
                value={this.state.dia_chi}
                onChangeText={text => this.updateTextInput(text, 'dia_chi')}
              />
            </View>
            <View style={styles.subContainer}>
              <TextInput
                placeholder={'Giá bán'}
                value={this.state.tien_hang}
                onChangeText={text => this.updateTextInput(text, 'tien_hang')}
              />
            </View>
            <View style={styles.subContainer}>
              <TextInput
                placeholder={'Địa chỉ'}
                value={this.state.dia_chi}
                onChangeText={text => this.updateTextInput(text, 'dia_chi')}
              />
            </View>
            <View style={styles.subContainer}>
              <TextInput
                placeholder={'Ghi chú'}
                value={this.state.ghi_chu}
                onChangeText={text => this.updateTextInput(text, 'ghi_chu')}
              />
            </View>
            <View style={styles.button}>
              <Button
                large
                leftIcon={{name: 'save'}}
                title="Save"
                onPress={() => this.updateCustomer()}
              />
            </View>
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
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
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
});
