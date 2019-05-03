import React, { Component } from 'react';

import AccountHeader from '../components/account/AccountHeader';
import BasicInformations from '../components/account/BasicInformations';
import OpinionFeed from '../components/account/OpinionFeed';
import RelationsFeed from '../components/account/RelationsFeed';
import ProfilEdition from '../components/account/ProfilEdition';
import UserFeed from '../components/account/UserFeed';
import api from '../utils/httpMethods';

const Relations = [
    { id_user: 1, firstname: 'Stevy', lastname: 'Palarski', profil_picture: 'blablabla' },
    { id_user: 2, firstname: 'Thomas', lastname: 'Unterfinger', profil_picture: 'blablabla' },
    { id_user: 3, firstname: 'Joffrey', lastname: 'Verd', profil_picture: 'blablabla' },
];

export default class Account extends Component {

    state = {
        user: {},
        currentTab: 'feed',
    }

    componentDidMount() {
        const { user } = this.props;
        api.get(`download-user/${user.id_user}`).then((data) => {
            this.setState({ user: data });
        }).catch(() => {
            console.log('Oups, une erreur s\'est produite');
        });
    }

    changeCurrentTab = (data) => {
        this.setState({
            currentTab: data,
        });
    }

    render() {
        const { user, currentTab } = this.state;
        let currentComponent;
        switch (currentTab) {
            case 'opinions':
                currentComponent = (<OpinionFeed />);
                break;
            case 'relations':
                currentComponent = (<RelationsFeed relations={Relations} />);
                break;
            case 'edition':
                currentComponent = (<ProfilEdition />);
                break;
            default:
                currentComponent = (<UserFeed />);
        }

        return (
            <>

                <AccountHeader
                    changeCurrentTab={this.changeCurrentTab}
                    currentTab={currentTab}
                />

                <div className='account-body-wrapper'>

                    <BasicInformations user={user} />

                    {currentComponent}

                </div>

            </>
        );
    }

}
