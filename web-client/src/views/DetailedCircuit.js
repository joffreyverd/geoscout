import React, { Component } from 'react';

import api from '../utils/httpMethods';

export default class DetailedCircuit extends Component {

    state = {
        circuit: [],
    }

    componentDidMount = () => {
        const { id } = this.props.match.params;
        api.get(`circuit/${id}`).then((circuit) => {
            this.setState({
                circuit: circuit,
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {

        const { name, description, duration, length, level,
            need_internet, version, createdAt, updatedAt,
        } = this.state.circuit;

        return (
            <>
                <div className='up-wrapper'>
                    <h1>{name}</h1>

                    <div className='circuit-score'>
                        <p>score</p>
                    </div>
                </div>

                <div className='bottom-wrapper'>
                    <div className='circuit-infos'>
                        <p>{description}</p>
                        <p>{duration}</p>
                        <p>{`${length} km`}</p>
                        <p>{level}</p>
                        <p>{need_internet}</p>
                        <p>{version}</p>
                        <p>{createdAt}</p>
                        <p>{updatedAt}</p>
                    </div>

                    <div className='circuit-comments'>
                        <p>commentaires</p>
                    </div>
                </div>


            </>
        );
    }

}

/*
    createdAt: "2019-03-08T08:00:23.000Z"
    description: "Un chouette circuit de présentation du projet Akrobat"
    duration: 4
    id_circuit: 37
    id_user: 4
    length: 51
    level: "1"
    name: "Circuit Démo"
    need_internet: null
    published: true
    updatedAt: "2019-03-08T08:00:23.000Z"
    version: 2
*/
