import React, {Component} from 'react';
import '../css/app.css';
import NewMap from '../components/NewMap';

export default class NewCircuit extends Component {

    render() {
        return (
            <>
                {this.props.location.state &&
                    <div className='div-wrapper'>
                        <NewMap/>

                        <div className='scroll-menu'>
    
                            <h3 className='circuit-title'>{this.props.location.state.name}</h3>

                            <div className='step-wrapper'>
                                etape 1
                            </div>

                            <div className='step-wrapper'>
                                etape 2
                            </div>

                        </div>
                    </div>
                }
            </>
        );
    }
}
