import React, { Component } from 'react';
import { Rate, Button, Icon, Carousel, Tooltip } from 'antd';
import 'antd/dist/antd.css';

import Map from '../components/Map';
import CommentList from '../components/comment/CommentList';

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
        if (circuit.Favorites && circuit.Favorites[0]) {
            api.delete(`favorites/${id}`).then(() => {
                this.setState((prevState) => {
                    prevState.circuit.Favorites = [];
                    return { Favorites: prevState.circuit.Favorites };
                });
            }).catch(() => {
                console.log('Oups, une erreur s\'est produite');
            });
        } else {
            api.post(`favorites/${id}`).then(() => {
                this.setState((prevState) => {
                    prevState.circuit.Favorites = [{ id: 0 }];
                    return { Favorites: prevState.circuit.Favorites };
                });
            }).catch(() => {
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
                circuit,
            });
        }).catch(() => {
            console.log('Oups, une erreur s\'est produite');
        });
        api.get(`evaluations/${id}`).then((comments) => {
            this.setState({
                comments,
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
        api.post('download', {
            id,
            type: 'circuit',
        }).then((img) => {
            this.setState({ img });
        }).catch(() => {
            console.log('error');
        });
    }

    render() {

        const { name, description, Favorites, avgStars } = this.state.circuit;
        const { viewport, userPosition, step, comments, img } = this.state;
        const { isConnected } = this.props;

        return (
            <>
                <div className='header-wrapper'>
                    <div className='name-score'>
                        <h1>{name}</h1>
                        <div className='rating-wrapper'>
                            <Rate disabled defaultValue={avgStars} />
                        </div>
                    </div>
                    {isConnected &&
                        <Tooltip
                            placement='left'
                            title={(Favorites && Favorites[0]) ? 'Supprimer de mes favoris' : 'Ajouter à mes favoris'}
                        >
                            <Button
                                type='primary'
                                className='favoris-button'
                                onClick={this.changeFavoriteStatus}
                            >
                                {(Favorites && Favorites[0]) ?
                                    <Icon type='heart' theme='filled' /> :
                                    <Icon type='heart' />
                                }
                            </Button>
                        </Tooltip>
                    }
                </div>

                <div className='bottom-wrapper'>
                    <h2 className='comments-title'>Informations générales</h2>
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

                    {img === undefined || img.length === 0 ?
                        <p className='no-pictures'>Aucune photo n`a été ajouté par l`administrateur de ce circuit !</p>
                        :
                        <>
                            <h2 className='comments-title'>Photos du circuit</h2>
                            <Carousel className='carousel-style'>
                                {img.map(item => <img src={`http://www.geoscout.fr:5555${item}`} key={img.keys()} alt={name} />)}
                            </Carousel>
                        </>
                    }

                    <CommentList
                        className='circuit-comments'
                        items={comments}
                    />
                </div>
            </>
        );
    }

}
