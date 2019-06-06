import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Carousel } from 'antd';
import 'antd/dist/antd.css';

import api from '../../utils/httpMethods';

class PreviewModal extends Component {

    state = {}

    render() {
        const { previewIsOpen, displayPreviewModal, description, img } = this.props;

        return (
            <div>
                <Modal
                    title='Prévisualisation'
                    visible={previewIsOpen}
                    onOk={displayPreviewModal}
                    onCancel={displayPreviewModal}
                    footer={null}
                >
                    <div className='circuit-infos'>
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </div>

                    {img === undefined || img.length === 0 ?
                        <p>Aucune photo disponible pour ce circuit</p>
                        :
                        <>
                            <h2 className='comments-title'>Photos du circuit</h2>
                            <Carousel className='carousel-style'>
                                {img.map(item => <img src={`http://www.geoscout.fr:5555${item}`} key={img.keys()} alt={`http://www.geoscout.fr:5555${item}`} />)}
                            </Carousel>
                        </>
                    }

                </Modal>
            </div>
        );
    }

}

export default withRouter(PreviewModal);
