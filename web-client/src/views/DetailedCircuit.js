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

    loadData = () => {
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
            if (steps[0].latitude || steps[0].longitude) {
                const { viewport } = this.state;
                viewport.latitude = steps[0].latitude;
                viewport.longitude = steps[0].longitude;
                this.setState({
                    step: steps[0],
                    viewport: viewport,
                });
            }

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
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const { isConnected } = this.props;
        if (prevProps.isConnected !== isConnected) {
            this.loadData();
        }
    }

    render() {

        const { name, description, Favorites, avgStars } = this.state.circuit;
        const { viewport, userPosition, step, comments, img } = this.state;
        const { isConnected } = this.props;
        const formattedStar = Math.round(avgStars * 2) / 2;

        return (
            <>
                <div className='header-wrapper'>
                    <div className='name-score'>
                        <h1>{name}</h1>
                        <div className='rating-wrapper'>
                            <Rate disabled allowHalf defaultValue={0} value={formattedStar} />
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
                        <p className='no-pictures'>Aucune photo n`a été ajouté sur de ce circuit !</p>
                        :
                        <>
                            <h2 className='comments-title'>Photos du circuit</h2>
                            <Carousel className='carousel-style' autoplay>
                                {img.map(item => <img src={`http://www.geoscout.fr:5555${item}`} key={img.keys()} alt={name} />)}
                            </Carousel>
                        </>
                    }

                    {comments && comments[0] ?
                        <CommentList
                            className='circuit-comments'
                            items={comments}
                            isConnected={isConnected}
                        />
                        :
                        <p className='no-pictures'>Aucune commentaire n`a été ajouté sur ce circuit !</p>
                    }

                </div>
            </>
        );
    }

}
