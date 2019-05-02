import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';


class AccountHeader extends Component {

    state = {}

    render() {

        const { changeCurrentTab, currentTab } = this.props;

        return (
            <>
                <div className='account-header-wrapper'>

                    <div className='avatar-wrapper'>
                        <div className='avatar-picture' />
                    </div>

                    <div className='user-activity'>
                        <div
                            className={currentTab === 'feed' ? 'account-active-tab' : ''}
                            onClick={() => changeCurrentTab('feed')}
                        >
                            <p>Activité</p>
                        </div>
                        <div
                            className={currentTab === 'opinions' ? 'account-active-tab' : ''}
                            onClick={() => changeCurrentTab('opinions')}
                        >
                            <p>Avis</p>
                        </div>
                        <div
                            className={currentTab === 'relations' ? 'account-active-tab' : ''}
                            onClick={() => changeCurrentTab('relations')}
                        >
                            <p>Relations</p>
                        </div>
                        <div className='edit-profil'>
                            <Button
                                type='primary'
                                color='info'
                                onClick={() => changeCurrentTab('edition')}
                            >Editer profil
                            </Button>
                        </div>
                    </div>

                </div>

            </>
        );
    }

}

export default withRouter(AccountHeader);
