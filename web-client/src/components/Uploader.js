import React from 'react';
import { Upload, Button, Icon } from 'antd';

export default class Uploader extends React.Component {

    state = {}

    render() {

        const props = {
            listType: 'picture',
        };

        const { uploadFile, onChangePicturesList } = this.props;

        return (

            <div className='uploader-wrapper'>
                <Upload
                    {...props}
                    customRequest={args => uploadFile(args.file).then(args.onSuccess).catch(args.onError)}
                    previewFile={false}
                    onChange={() => onChangePicturesList()}
                >
                    <Button>
                        <Icon type='upload' /> Ajouter une photo
                    </Button>
                </Upload>
            </div>

        );
    }

}
