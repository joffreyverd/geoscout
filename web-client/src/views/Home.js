import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button';

import Map from '../components/Map';
import api from '../utils/httpMethods';
import CreatedCircuit from './CircuitsView';

export default class Home extends Component {

    state = {
        circuits: [],
        value: false,
        onHome: true,
    }


    componentDidMount() {
        api.get('circuits').then((data) => {
            this.setState({
                circuits: data,
            });
        }).catch((error) => {
            console.log(error);
        });
    }


    render() {
        const { circuits, value, onHome } = this.state;

        return (
            <>
                {value === false
                    ?
                    <Map className='map' circuits={circuits} />
                    :
                    <CreatedCircuit onHome={onHome} />

                }

                <div className='toggle-button'>
                    <p>Liste</p>
                    <ToggleButton
                        value={value || false}
                        onToggle={(value) => {
                            this.setState({
                                value: !value,
                            });
                        }}
                    />
                </div>
            </>
        );
    }

}
