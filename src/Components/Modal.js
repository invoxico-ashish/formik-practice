import React, { useState } from 'react';
import Modal from 'react-modal';

export default function ModalBox() {

    const [Open, setOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setOpen(true)}>click</button>
            <Modal isOpen={Open} shouldCloseOnOverlayClick={false} // don't close when you click on overlay

                onRequestClose={() => setOpen(false)}
                style={{
                    overlay:{
                        backgroundColor:'black'
                    },
                    content:{
                        color: 'orange'
                    }
                }}
                >  {/* close when you click on overlay*/}
                <h1>
                    Title
                </h1>
                <p>
                    body
                </p>
                <button onClick={() => setOpen(false)}>Close</button>
            </Modal>
        </div>
    )
}
