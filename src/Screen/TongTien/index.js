import React, {Component} from 'react';
import {View, Text} from 'react-native';

// import database
import Database from '../../../Database/Database';

const db = new Database();

export default class TongTienScreen extends Component {
  constructor() {
    super();
    this.state = {
      tong_tien: [],
      isLoading: false,
    };
  }

  // function tong tien
  // sumShip() {
  //   let tienHang = [];
  //   db.listInfo().then(data => {
  //     tienHang = data;
  //     this.setState({
  //       state
  //     })
  //   })
  // }
  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}
