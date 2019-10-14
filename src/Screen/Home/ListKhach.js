import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Header,
  Right,
  Body,
  Title,
  ListItem,
} from 'native-base';
import IconAn from 'react-native-vector-icons/AntDesign';

// import database
import Database from '../../../Database/Database';

const db = new Database();

export default class ItemFlatlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      customer: [],
      notFound:
        'Khong tim thay khach hang. \n Vui long click (+) button de them khach.',
    };
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getCustomers();
    });
  }

  // functuon to get customer list from database class
  getCustomers() {
    let customer = [];
    db.listInfo()
      .then(data => {
        customer = data;
        this.setState({
          customer,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log('err', err);
        this.setState = {
          isLoading: false,
        };
      });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    console.log('ten khach: ', item.ten_khach),
    (
      <View style={{flex: 1, flexDirection: 'column', padding: 5}}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row', // tao thanh cot
            borderBottomWidth: 2,
            borderColor: '#ACAEAA',
          }}
          onPress={() => {
            this.props.navigation.navigate('DetailCustomer', {
              id_khach: `${item.id_khach}`,
            });
          }}>
          <View>
            <Image
              style={{
                width: 70,
                height: 70,
                marginRight: 5,
                borderRadius: 50,
                margin: 10,
              }}
              source={{
                uri:
                  'http://media2.sieuhai.tv:8088/onbox/images/user_lead_image/20190408/84947430634_20190408001343.jpg',
              }}
            />
          </View>
          <View style={{paddingLeft: 10, marginTop: 10}}>
            <Text
              style={{
                color: '#C03032',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {item.ten_khach}
            </Text>
            <Text>Giá: {item.tien_hang} (ngàn)</Text>
            <Text>Địa chỉ: {item.dia_chi}.</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  );

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    if (this.state.customer.length === 0) {
      return (
        <View>
          <Text style={styles.message}>{this.state.notFound}</Text>
        </View>
      );
    }
    return (
      <View>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.customer}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
  message: {
    padding: 16,
    fontSize: 18,
    color: 'red',
  },
});
