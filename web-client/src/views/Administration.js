import React, { Component } from 'react';
import { Table, Icon, Tooltip } from 'antd';

import api from '../utils/httpMethods';

const columns = [
    {
        title: 'Id',
        key: 'id_circuit',
        dataIndex: 'id_circuit',
        width: 100,
    },
    {
        title: 'Nom du circuit',
        dataIndex: 'name',
        width: 400,
    },
    {
        title: 'Score',
        dataIndex: 'avgStars',
        width: 100,
        sorter: (a, b) => a.avgStars - b.avgStars,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Date de création',
        dataIndex: 'createdAt',
        width: 200,
    },
    {
        title: 'Créateur',
        dataIndex: 'creator',
        width: 300,
    },
    {
        title: 'Action',
        width: 100,
        dataIndex: 'action',
    },
];

export default class Administration extends Component {

    state = {
        circuits: [],
        arrayColumns: columns,
    }

    componentDidMount() {
        let index = 0;
        api.get('circuits-admin').then((data) => {
            data.forEach((element) => {
                element.creator = `${element.User.firstname} ${element.User.lastname}`;
                const formattedDate = new Date(element.createdAt).toLocaleDateString();
                element.createdAt = formattedDate;
                element.action = (element.blocked && element.blocked === true) ?
                    this.eye(index, element.id_circuit) :
                    this.invisibleEye(index, element.id_circuit);
                element.id_circuit = element.id_circuit.toString();
                index++;
            });

            this.setState({
                circuits: data,
            });
        }).catch(() => {
            console.log('Oups, une erreur s\'est produite');
        });
    }

    frozenCircuit = (index, id) => {
        api.put(`circuits-admin/${id}`).then(() => {
            this.setState((prevState) => {
                prevState.circuits[index].blocked = !prevState.circuits[index].blocked;
                prevState.circuits[index].action = (prevState.circuits[index].blocked && prevState.circuits[index].blocked === true) ?
                    this.eye(index, id) :
                    this.invisibleEye(index, id);
                return { circuits: prevState.circuits };
            });
        }).catch(() => {
            console.log('Oups, une erreur s\'est produite');
        });
    }

    eye = (index, id) => (
        <Tooltip placement='top' title='Dégeler le circuit'>
            <Icon type='eye' theme='twoTone' onClick={() => this.frozenCircuit(index, id)} />
        </Tooltip>
    )

    invisibleEye = (index, id) => (
        <Tooltip placement='top' title='Geler le circuit'>
            <Icon type='eye-invisible' theme='twoTone' twoToneColor='#c0392b' onClick={() => this.frozenCircuit(index, id)} />
        </Tooltip>
    )

    render() {

        const { circuits, arrayColumns } = this.state;

        return (
            <>
                <h1>Administration</h1>
                <Table
                    className='administrator-table'
                    columns={arrayColumns}
                    dataSource={circuits}
                    rowKey='id_circuit'
                />
            </>
        );
    }

}
