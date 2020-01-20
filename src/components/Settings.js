import React, { Fragment, useState } from 'react';

import Modal from './Modal';

const Settings = () => {

    const [open, setOpen] = useState(false);

    return(
        <Fragment>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div>some stuff</div>
            </Modal>
        </Fragment>
    );
}

export default Settings;
