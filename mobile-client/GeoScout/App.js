import React from 'react';
import Autentication from './src/screens/Authentication';
import api from './src/config/httpMethods';


export default class App extends React.Component {
  componentDidMount(){
    api.get('circuits').then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <Autentication/>
    );
  }
}
