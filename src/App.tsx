import React from 'react';
import { FileDialogWebComponent } from './components/FileDialog';

export default function App(): React.JSX.Element {
    return (
        <FileDialogWebComponent
            language="de"
            open
            primary="#EE2233"
            secondary="#00FF00"
            theme="dark"
            imageprefix="./files/"
            onclose={id => {
                if (id === null) {
                    // close dialog
                    console.log('Close dialog');
                } else {
                    console.log(`Selected ${id}`);
                }
            }}
            port="8081"
        />
    );
}
