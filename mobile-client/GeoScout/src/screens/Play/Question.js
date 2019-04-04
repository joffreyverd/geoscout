import React from 'react';
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    StyleSheet
} from 'react-native';
import HTML from 'react-native-render-html';

class Question extends React.Component {
    state = {
        userResponse: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { trueResponse } = this.props.navigation.state.params;
        const { userResponse } = this.state;
        let isGood = '', score = 0;

        if( userResponse && userResponse.toLowerCase().trim() === trueResponse.toLowerCase().trim()){
            isGood = 'Bonne réponse';
            score = 10;
        }else{
            isGood = 'Mauvaise réponse';
        }

        alert.alert(
            isGood,
            'C\'est une '+isGood+', vous avez gagnez '+score,
            [
                {text: 'Ok', onPress: () => this.props.navigation.state.params.nextStep(score)}
            ],
            {cancelable: false}
        )
    }

    render() {
        const { wording } = this.props.navigation.state.params;
        return(
            <View>
                <ScrollView style={{ flex: 1, marginTop:20, height: '30%' }}>
                    <HTML html={wording} imagesMaxWidth={Dimensions.get('window').width} />
                </ScrollView>

                <TextInput
                    value={this.state.userResponse}
                    onChangeText={(userResponse) => this.setState({ userResponse })}
                    placeholder={'Réponse'}
                    style={styles.input}
                />

                <TouchableOpacity
                    onPress={this.handleSubmit}
                    activeOpacity={0.8}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>Valider</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Question;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        padding: 8,
        marginBottom: 5,
        width: '90%',
        alignItems: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    },
    input: {
        width: '90%',
        padding: 8,
        borderWidth: 1,
        borderColor: '#2c3e50',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 10
    }
});