import React from 'react';
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native';
import HTML from 'react-native-render-html';

class Question extends React.Component {
    state = {
        userResponse: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { question:{ response: trueResponse } } = this.props.navigation.state.params;
        const { userResponse } = this.state;
        let isGood = '', score = 0;

        if( userResponse && userResponse.toLowerCase().trim() === trueResponse.toLowerCase().trim()){
            isGood = 'Bonne réponse';
            score = 10;
        }else{
            isGood = 'Mauvaise réponse';
        }

        Alert.alert(
            isGood,
            'C\'est une '+isGood+', vous avez gagnez '+score,
            [
                {text: 'Ok', onPress: () => this.props.navigation.state.params.nextStep(score)}
            ],
            {cancelable: false}
        )
    }

    render() {
        const { question: { wording } } = this.props.navigation.state.params;
        return(
            <>
                <View style={Object.assign({},styles.container, styles.containerQuestion)}>
                    <ScrollView>
                        {/* <HTML html={wording} imagesMaxWidth={Dimensions.get('window').width} /> */}
                        <Text style={styles.description}>{wording}</Text>
                    </ScrollView>

                    <TextInput
                        value={this.state.userResponse}
                        onChangeText={(userResponse) => this.setState({ userResponse })}
                        placeholder={'Réponse'}
                        style={styles.input}
                    />
                </View>
                <View style={Object.assign({},styles.container, styles.containerButton)}>
                    <TouchableOpacity
                        onPress={this.handleSubmit}
                        activeOpacity={0.8}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

export default Question;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1abc9c',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },  
    containerQuestion: {
        paddingTop: 40,
        paddingBottom: 50,
        flex: 1,
        justifyContent: 'flex-start',

    },
    containerButton: {
        alignItems: 'center'
    },
    description: {
        color: 'white',
        fontSize: 22
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
        fontSize: 22
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