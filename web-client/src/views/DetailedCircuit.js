import React, { Component } from 'react';
import { Rate, Comment, Tooltip, Avatar, Button, Icon } from 'antd';
import 'antd/dist/antd.css';

import Map from '../components/Map';

import api from '../utils/httpMethods';

export default class DetailedCircuit extends Component {

    state = {
        circuit: [],
        viewport: {
            width: '100%',
            height: window.innerHeight - 50,
            latitude: 48.582651,
            longitude: 7.749534,
            distance: 30,
            zoom: 12,
        },
    }

    changeViewport = (viewport) => {
        this.setState({
            viewport: viewport,
        });
    }

    changeFavoriteStatus = () => {
        const { id } = this.props.match.params;
        const { circuit } = this.state;
        this.setState((prevState) => {
            prevState.circuit.Favorites = !prevState.circuit.Favorites;
            return { Favorites: prevState.circuit.Favorites };
        });
        if (circuit.Favorites) {
            api.delete(`favorites/${id}`).catch(() => {
                console.log('Oups, une erreur s\'est produite');
            });
        } else {
            api.post(`favorites/${id}`).catch(() => {
                console.log('Oups, une erreur s\'est produite');
            });
        }
    }

    componentDidMount = () => {
        // eslint-disable-next-line no-undef
        if (navigator.geolocation) {
            // eslint-disable-next-line no-undef
            navigator.geolocation.getCurrentPosition((data) => {
                const { viewport } = this.state;
                viewport.latitude = data.coords.latitude;
                viewport.longitude = data.coords.longitude;
                this.setState({
                    viewport: viewport,
                    userPosition: data.coords,
                });
            });
        }
        const { id } = this.props.match.params;
        api.get(`circuit/${id}`).then((circuit) => {
            this.setState({
                circuit: circuit,
            });
        }).catch(() => {
            console.log('Oups, une erreur s\'est produite');
        });
        api.get(`steps/${id}`).then((steps) => {
            const { viewport } = this.state;
            viewport.latitude = steps[0].latitude;
            viewport.longitude = steps[0].longitude;
            this.setState({
                step: steps[0],
                viewport: viewport,
            });
        }).catch(() => {
            console.log('Oups, une erreur s\'est produite');
        });
    }

    render() {

        const { name, description, Favorites } = this.state.circuit;
        const { viewport, userPosition, step } = this.state;
        const { isConnected } = this.props;

        return (
            <>
                <div className='header-wrapper'>
                    <div className='name-score'>
                        <h1>{name}</h1>
                        <div className='rating-wrapper'>
                            <Rate disabled defaultValue={4} />
                            <p>(256)</p>
                        </div>
                    </div>
                    {isConnected &&
                        <Button
                            type='primary'
                            className='favoris-button'
                            onClick={this.changeFavoriteStatus}
                        >
                            {Favorites ?
                                <Icon type='heart' theme='filled' /> :
                                <Icon type='heart' />
                            }
                        </Button>
                    }
                </div>

                <div className='bottom-wrapper'>
                    <div className='circuit-infos'>
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                        <Map
                            className='detailed-circuit-map'
                            step={step}
                            viewport={viewport}
                            userPosition={userPosition}
                            changeViewport={this.changeViewport}
                        />
                    </div>

                    <div className='circuit-comments'>
                        <h2 className='comments-title'>Commentaires</h2>
                        <Comment
                            author='Stevy Palarski'
                            avatar={(
                                <Avatar
                                    src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                                    alt='Stevy Palarski'
                                />
                            )}
                            content={(
                                <p>
                                    J‘ai pris beaucoup de plaisir à effectuer ce circuit.
                                    Il m‘a permis de découvrir le centre-ville de Strasbourg.
                                    Etant originaire de Caen, je n‘avais rarement eu l‘occasion
                                    de voir une aussi belle ville !
                                </p>
                            )}
                            datetime={(
                                <Tooltip>
                                    <span>Il y a deux jours</span>
                                </Tooltip>
                            )}
                        />
                    </div>
                </div>


            </>
        );
    }

}
