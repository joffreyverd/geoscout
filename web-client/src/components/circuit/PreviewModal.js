import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';

class PreviewModal extends Component {

    state = {}

    render() {
        const { previewIsOpen, displayPreviewModal, description } = this.props;

        return (
            <div>
                <Modal
                    title='Prévisualisation'
                    visible={previewIsOpen}
                    onOk={displayPreviewModal}
                    onCancel={displayPreviewModal}
                >
                    <div className='circuit-infos'>
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                </Modal>
            </div>
        );
    }

}

export default withRouter(PreviewModal);
