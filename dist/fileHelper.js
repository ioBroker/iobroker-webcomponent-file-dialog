/** @type {((string|null) => void) | null} */
let storedFileResolve = null;
/** @type {((string|null) => void) | null} */
let storedObjectResolve = null;
let codeLoaded = false;
/**
 *
 * @param {{
 *     host:string,
 *     port: number,
 *     protocol: 'http:' | 'https:',
 *     language: string,
 *     selected?: string,
 *     primary?: string;
 *     secondary?: string,
 *     paper?: string,
 *     token?: string,
 *     selectOnlyFolders?: boolean;
 *     filterByType?: 'images' | 'code' | 'txt';
 *     filterFiles?: string[];
 *     limitPath?: string;
 *     imagePrefix?: string;
 *     showToolbar?: boolean;
 *     allowUpload?: boolean;
 *     allowDownload?: boolean;
 *     allowCreateFolder?: boolean;
 *     allowDelete?: boolean;
 *     allowView?: boolean;
 *     showTypeSelector?: boolean;
 *     restrictToFolder?: string;
 *     expertMode?: boolean;
 *     showExpertButton?: boolean;
 *     allowNonRestricted?: boolean;}} config
 * @returns {Promise<string?>}
 */
export async function openFileDialog(config) {
    return new Promise(async resolve => {
        storedFileResolve = resolve;
        if (!codeLoaded) {
            await import('./iobrokerFile.es.js');
            codeLoaded = true;
        }

        // destroy old dialog
        let fileDialog = document.getElementById('iobroker-select-id');
        if (fileDialog) {
            fileDialog.remove();
        }

        fileDialog = document.createElement('iobroker-file');
        window._iobFileDialogOnSelected = (newId) => {
            fileDialog.setAttribute('open', 'false');
            fileDialog.remove();
            storedFileResolve(newId);
        };
        fileDialog.setAttribute('id', 'iob-file');
        fileDialog.setAttribute('port', (config.port || window.location.port).toString());
        fileDialog.setAttribute('host', config.host);
        fileDialog.setAttribute('protocol', config.protocol);
        fileDialog.setAttribute('language', config.language);
        fileDialog.setAttribute('onclose', '_iobFileDialogOnSelected');
        fileDialog.setAttribute('primary', '#AD1625');
        fileDialog.setAttribute('secondary', 'rgb(228, 145, 145)');
        fileDialog.setAttribute('paper', 'rgb(243, 243, 243)');
        fileDialog.setAttribute('selected', config.selected);
        fileDialog.setAttribute('token', config.token);
        fileDialog.setAttribute('open', 'true');
        if (config.selectOnlyFolders !== undefined) {
            fileDialog.setAttribute('selectonlyfolders', config.selectOnlyFolders ? 'true' : 'false');
        }
        if (config.filterByType !== undefined) {
            fileDialog.setAttribute('filterbytype', config.filterByType);
        }
        if (config.filterFiles !== undefined) {
            fileDialog.setAttribute('filterfiles', config.filterFiles.join(','));
        }
        if (config.limitPath !== undefined) {
            fileDialog.setAttribute('limitpath', config.limitPath);
        }
        if (config.imagePrefix !== undefined) {
            fileDialog.setAttribute('imageprefix', config.imagePrefix);
        }
        if (config.showToolbar !== undefined) {
            fileDialog.setAttribute('showtoolbar', config.showToolbar ? 'true' : 'false');
        }
        if (config.allowUpload !== undefined) {
            fileDialog.setAttribute('allowupload', config.allowUpload ? 'true' : 'false');
        }
        if (config.allowDownload !== undefined) {
            fileDialog.setAttribute('allowdownload', config.allowDownload ? 'true' : 'false');
        }
        if (config.allowCreateFolder !== undefined) {
            fileDialog.setAttribute('allowcreatefolder', config.allowCreateFolder ? 'true' : 'false');
        }
        if (config.allowDelete !== undefined) {
            fileDialog.setAttribute('allowdelete', config.allowDelete ? 'true' : 'false');
        }
        if (config.allowView !== undefined) {
            fileDialog.setAttribute('allowview', config.allowView ? 'true' : 'false');
        }
        if (config.showTypeSelector !== undefined) {
            fileDialog.setAttribute('showtypeselector', config.showTypeSelector ? 'true' : 'false');
        }
        if (config.restrictToFolder !== undefined) {
            fileDialog.setAttribute('restrictofolder', config.restrictToFolder);
        }
        if (config.expertMode !== undefined) {
            fileDialog.setAttribute('expertmode', config.expertMode ? 'true' : 'false');
        }
        if (config.showExpertButton !== undefined) {
            fileDialog.setAttribute('showexpertbutton', config.showExpertButton ? 'true' : 'false');
        }
        if (config.allowNonRestricted !== undefined) {
            fileDialog.setAttribute('allownonrestricted', config.allowNonRestricted ? 'true' : 'false');
        }

        document.body.appendChild(fileDialog);
    });
}
/**
 *
 * @param {{host:string, port: number, protocol: 'http:' | 'https:', language: string, selected?: string, allowAll?: boolean, primary?: string; secondary?: string, paper?: string, token?: string}} config
 * @returns {Promise<string?>}
 */
export async function openSelectIdDialog(config) {
    return new Promise(async resolve => {
        storedObjectResolve = resolve;
        if (!codeLoaded) {
            await import('./iobrokerFile.es.js');
            codeLoaded = true;
        }
        let selectDialog = document.getElementById('iobroker-select-id');
        if (selectDialog) {
            selectDialog.remove();
        }

        selectDialog = document.createElement('iobroker-select-id');
        window._iobSelectIdDialogOnSelected = (newId) => {
            const _selectDialog = document.getElementById('iobroker-select-id');
            _selectDialog.remove();
            storedObjectResolve(newId);
        };
        selectDialog.setAttribute('id', 'iob-select-id');
        selectDialog.setAttribute('port', (config.port || window.location.port).toString());
        selectDialog.setAttribute('host', config.host);
        selectDialog.setAttribute('protocol', config.protocol);
        selectDialog.setAttribute('language', config.language);
        selectDialog.setAttribute('onclose', '_iobSelectIdDialogOnSelected');
        selectDialog.setAttribute('primary', '#AD1625');
        selectDialog.setAttribute('secondary', 'rgb(228, 145, 145)');
        selectDialog.setAttribute('paper', 'rgb(243, 243, 243)');
        selectDialog.setAttribute('all', config.allowAll ? 'true' : 'false');
        selectDialog.setAttribute('selected', config.selected);
        selectDialog.setAttribute('token', config.token);
        selectDialog.setAttribute('open', 'true');
        document.body.appendChild(selectDialog);
    });
}