import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Body,
  Title,
} from 'native-base';
import IconAn from 'react-native-vector-icons/AntDesign';

// import database
import Database from '../../../Database/Database';
// khoi tao database
const db = new Database();

export default class AddCustomerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //id_khach: '',
      ten_khach: '',
      so_dien_thoai: '',
      tien_hang: '',
      dia_chi: '',
      ghi_chu: '',
      isLoading: false,
      visible: false,
    };
  }

  // function to update the input values
  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  // function to save a customer to the sqlite table
  addCustomer = () => {
    this.setState({
      isLoading: true,
    });
    let data = {
      ten_khach: this.state.ten_khach,
      so_dien_thoai: this.state.so_dien_thoai,
      tien_hang: this.state.tien_hang,
      dia_chi: this.state.dia_chi,
      ghi_chu: this.state.ghi_chu,
    };
    db.aadCustomerNew(data)
      .then(results => {
        console.log(results);
        this.setState({
          isLoading: false,
        });
        ToastAndroid.show(
          'Thêm ' + this.state.ten_khach + ' thành công!',
          ToastAndroid.BOTTOM,
        );
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log('err: ', err);
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#ffffff'}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <IconAn name="left" size={25} color="#A49BA8" />
            </Button>
          </Left>
          <Body>
            <Title style={{color: '#4CC773', fontWeight: 'bold'}}>
              Thêm khách hàng
            </Title>
          </Body>
        </Header>
        <Content style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.txt}>Tên khách hàng</Text>
            <TextInput
              placeholder={'Tên khách hàng ...'}
              value={this.state.ten_khach}
              onChangeText={text => this.updateTextInput(text, 'ten_khach')}
            />
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.txt}>Số điện thoại</Text>
            <TextInput
              placeholder={'Số điện thoại ...'}
              value={this.state.so_dien_thoai}
              onChangeText={text => this.updateTextInput(text, 'so_dien_thoai')}
            />
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.txt}>Giá tiền</Text>
            <TextInput
              placeholder={'Giá tiền ...'}
              value={this.state.tien_hang}
              onChangeText={text => this.updateTextInput(text, 'tien_hang')}
            />
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.txt}>Địa chỉ</Text>
            <TextInput
              placeholder={'Địa chỉ ...'}
              value={this.state.dia_chi}
              onChangeText={text => this.updateTextInput(text, 'dia_chi')}
            />
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.txt}>Ghi chú</Text>
            <TextInput
              placeholder={'Ghi chú ...'}
              value={this.state.ghi_chu}
              onChangeText={text => this.updateTextInput(text, 'ghi_chu')}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#60EEB0',
                alignItems: 'center',
              }}
              onPress={() => this.addCustomer()}>
              <IconAn name="save" size={25} color="#252227" />
              <Text style={{fontSize: 20, padding: 10, color: '#252227'}}>
                Thêm khách
              </Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 10,
    padding: 2,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  txt: {
    marginBottom: 10,
    color: '#44464A',
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
