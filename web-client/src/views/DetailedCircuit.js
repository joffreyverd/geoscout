import React, { Component } from 'react';
import { Rate, Comment, Icon, Tooltip, Avatar } from 'antd';
import 'antd/dist/antd.css';

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
        }).catch(() => {
            console.log('Oups, une erreur s\'est produite');
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
                    <div className='rating-wrapper'>
                        <Rate disabled defaultValue={4} />
                        <p>(256)</p>
                    </div>

                </div>

                <div className='bottom-wrapper'>
                    <div className='circuit-infos'>
                        <div dangerouslySetInnerHTML={{ __html: description }} />

                        <p>{duration}</p>
                        <p>{(length != null) && `${length} km`}</p>
                        <p>{level}</p>
                        <p>{need_internet}</p>
                        <p>{version}</p>
                        <p>{createdAt}</p>
                        <p>{updatedAt}</p>
                    </div>

                    <div className='circuit-comments'>
                        <h2 className='comments-title'>Commentaires</h2>
                        <Comment
                            author={<a>Stevy Palarski</a>}
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
