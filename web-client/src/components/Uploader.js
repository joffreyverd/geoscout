import React from 'react';
import { Upload, Button, Icon } from 'antd';

import api from '../utils/httpMethods';

export default class Uploader extends React.Component {

    state = {}

    // uploadFile = (files) => {
    //     const formData = new FormData();
    //     const { id_circuit } = this.props.circuit;

    //     files.map((file, index) => {
    //         formData.append('file', file);
    //     });

    //     api.post('upload', { formData }).then(() => null).catch(() => {
    //         console.log('error');
    //     });
    // }

    render() {

        const fileList = [];

        const props = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            listType: 'picture',
            defaultFileList: [...fileList],
        };

        return (

            <div className='uploader-wrapper'>
                <Upload {...props}>
                    <Button>
                        <Icon type='upload' /> Ajouter une photo
                    </Button>
                </Upload>
            </div>

        );
    }

}
