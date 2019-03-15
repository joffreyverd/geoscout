import React from 'react';

export default class Signin extends React.Component {
  render() {
    return (
        <Modal
        animationType='slide'
        transparent={false}
        onRequestClose={() => {
            this.setModalConnexionVisible(false);
        }}
        visible={this.state.modalConnexionVisible}>
            <View style={styles.container}>
                <TextInput
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                placeholder={'Email'}
                style={styles.input}/>

                <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Mot de passe'}
                secureTextEntry={true}
                style={styles.input}/>
                
                <TouchableOpacity
                style={styles.button}
                onPress={this.sign}>
                    <Text style={styles.textButton}>Connexion</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
  }
}
