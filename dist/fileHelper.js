let fileDialog = null;
let storedResolve = null;
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
        storedResolve = resolve;
        if (!fileDialog) {
            await import('./iobrokerFile.es.js');
            fileDialog = document.createElement('iobroker-file');
            window._iobFileDialogOnSelected = (newId) => {
                fileDialog.setAttribute('open', 'false');
                storedResolve(newId);
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
        } else {
            if (config.selectOnlyFolders !== undefined) {
                fileDialog.setAttribute('selectonlyfolders', config.selectOnlyFolders ? 'true' : 'false');
            } else {
                fileDialog.removeAttribute('selectonlyfolders');
            }
            if (config.imagePrefix !== undefined) {
                fileDialog.setAttribute('imageprefix', config.imagePrefix);
            } else {
                fileDialog.removeAttribute('imageprefix');
            }
            if (config.filterByType !== undefined) {
                fileDialog.setAttribute('filterbytype', config.filterByType);
            } else {
                fileDialog.removeAttribute('filterbytype');
            }
            if (config.filterFiles !== undefined) {
                fileDialog.setAttribute('filterfiles', config.filterFiles.join(','));
            } else {
                fileDialog.removeAttribute('filterfiles');
            }
            if (config.limitPath !== undefined) {
                fileDialog.setAttribute('limitpath', config.limitPath);
            } else {
                fileDialog.removeAttribute('limitpath');
            }
            if (config.showToolbar !== undefined) {
                fileDialog.setAttribute('showtoolbar', config.showToolbar ? 'true' : 'false');
            } else {
                fileDialog.removeAttribute('showtoolbar');
            }
            if (config.allowUpload !== undefined) {
                fileDialog.setAttribute('allowupload', config.allowUpload ? 'true' : 'false');
            } else {
                fileDialog.removeAttribute('allowupload');
            }
            if (config.allowDownload !== undefined) {
                fileDialog.setAttribute('allowdownload', config.allowDownload ? 'true' : 'false');
            } else {
                fileDialog.removeAttribute('allowdownload');
            }
            if (config.allowCreateFolder !== undefined) {
                fileDialog.setAttribute('allowcreatefolder', config.allowCreateFolder ? 'true' : 'false');
            } else {
                fileDialog.removeAttribute('allowcreatefolder');
            }
            if (config.allowDelete !== undefined) {
                fileDialog.setAttribute('allowdelete', config.allowDelete ? 'true' : 'false');
            } else {
                fileDialog.removeAttribute('allowdelete');
            }
            if (config.allowView !== undefined) {
                fileDialog.setAttribute('allowview', config.allowView ? 'true' : 'false');
            } else {
                fileDialog.removeAttribute('allowview');
            }
            if (config.showTypeSelector !== undefined) {
                fileDialog.setAttribute('showtypeselector', config.showTypeSelector ? 'true' : 'false');
            } else {
                fileDialog.removeAttribute('showtypeselector');
            }
            if (config.restrictToFolder !== undefined) {
                fileDialog.setAttribute('restrictofolder', config.restrictToFolder);
            } else {
                fileDialog.removeAttribute('restrictofolder');
            }
            if (config.expertMode !== undefined) {
                fileDialog.setAttribute('expertmode', config.expertMode ? 'true' : 'false');
            } else {
                fileDialog.removeAttribute('expertmode');
            }
            if (config.showExpertButton !== undefined) {
                fileDialog.setAttribute('showexpertbutton', config.showExpertButton ? 'true' : 'false');
            } else {
                fileDialog.removeAttribute('showexpertbutton');
            }
            if (config.allowNonRestricted !== undefined) {
                fileDialog.setAttribute('allownonrestricted', config.allowNonRestricted ? 'true' : 'false');
            } else {
                fileDialog.removeAttribute('allownonrestricted');
            }


            fileDialog.setAttribute('selected', config.selected);
            fileDialog.setAttribute('token', config.token);
            fileDialog.setAttribute('open', 'true');
        }
    });
}
