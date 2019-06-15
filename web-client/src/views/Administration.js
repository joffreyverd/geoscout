import React, { Component } from 'react';
import { Table, Icon, Tooltip } from 'antd';

const columns = [
    {
        title: 'Nom du circuit',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Score',
        dataIndex: 'stars',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.stars - b.stars,
    },
    {
        title: 'Date de création',
        dataIndex: 'creationDate',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.creationDate - b.creationDate,
    },
    {
        title: 'Créateur',
        dataIndex: 'creator',
        sorter: (a, b) => a.creator.length - b.creator.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const unFroze = 'Cliquez pour dégeler le circuit - il sera de nouveau visible sur Géoscout';
const froze = 'Cliquez pour geler le circuit - et le cacher des circuits apparents';

function unFrozeCircuit() {
    alert('Unfroze circuit');
}

function frozeCircuit() {
    alert('Froze circuit');
}

const eye = (
    <Tooltip placement='top' title={froze}>
        <Icon type='eye' theme='twoTone' onClick={frozeCircuit} />
    </Tooltip>
);

const invisibleEye = (
    <Tooltip placement='top' title={unFroze}>
        <Icon type='eye-invisible' theme='twoTone' twoToneColor='#c0392b' onClick={unFrozeCircuit} />
    </Tooltip>
);


export default class Administration extends Component {

    state = {
        circuits: [
            {
                key: '1',
                name: 'Circuit 1',
                stars: 1,
                creationDate: '29/06/2017',
                creator: 'Joffrey',
                action: invisibleEye,
            },
            {
                key: '2',
                name: 'Circuit 2',
                stars: 1,
                creationDate: '22/06/2017',
                creator: 'Stevy',
                action: invisibleEye,
            },
            {
                key: '3',
                name: 'Circuit 3',
                stars: 4,
                creationDate: '12/11/2018',
                creator: 'Thomas',
                action: eye,
            },
            {
                key: '4',
                name: 'Circuit 4',
                stars: 5,
                creationDate: '14/04/2019',
                creator: 'Quentin',
                action: eye,
            },
        ],
        arrayColumns: columns,
    }

    render() {

        const { circuits, arrayColumns } = this.state;

        return (
            <>
                <h1>Administration</h1>
                <Table
                    className='administrator-table'
                    columns={arrayColumns}
                    dataSource={circuits}
                />
            </>
        );
    }

}
