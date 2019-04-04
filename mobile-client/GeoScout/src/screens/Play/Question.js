import React from 'react';
import { 
    View,
    Text,
    Dimensions,
    ScrollView
} from 'react-native';
import HTML from 'react-native-render-html';

class Question extends React.Component {
    state = {
        response: ''
    }

    render() {
        <View>
            {/* <ScrollView style={{ flex: 1 }}>
                <HTML html={step.instruction} imagesMaxWidth={Dimensions.get('window').width} />
            </ScrollView> */}
            <TouchableOpacity
                onPress={() => {
                    
                }}
                activeOpacity={0.8}
                style={styles.button}
            >
                <Text style={styles.textButton}>Valider</Text>
            </TouchableOpacity>
        </View>
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
        width: '80%',
        alignItems: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    }
});