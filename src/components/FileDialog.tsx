import React, { Component } from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { type Connection, Theme, type IobTheme, I18n } from '@iobroker/adapter-react-v5';

import type { OAuth2Response } from '@iobroker/socket-client';

import { DialogSelectFile } from './SelectFile';
import singletonConnection from './singletonConnection';
// import { DialogSelectFile } from '@iobroker/adapter-react-v5';

type OnClose = (newId: string | null, oldId?: string) => void;

export interface IFileDialogWebComponentProps {
    port?: number | string;
    protocol?: 'http:' | 'https:';
    token?: string;
    host?: string;
    // normally ../../
    imageprefix: string;

    selected?: string;
    onclose: OnClose | string;
    open: string | boolean;
    language: ioBroker.Languages;

    theme?: 'light' | 'dark';
    primary?: string;
    secondary?: string;
    paper?: string;

    /** allow only folder's selection */
    selectonlyfolders?: 'true' | 'false';
    /** images, code, txt, audio, video */
    filterbytype?: 'images' | 'code' | 'txt';
    /** like `['png', 'svg', 'bmp', 'jpg', 'jpeg', 'gif']` */
    filterfiles?: string;
    /** Limit file browser to one specific objectID of type meta and the following path (like vis.0/main) */
    limitpath?: 'true' | 'false';
    /** Show toolbar (default true) */
    showtoolbar?: 'true' | 'false';
    /** If download of files enabled */
    allowupload?: 'true' | 'false';
    /** If download of files enabled */
    allowdownload?: 'true' | 'false';
    /** If creation of folders enabled */
    allowcreatefolder?: 'true' | 'false';
    /** If creation of folders enabled */
    allowdelete?: 'true' | 'false';
    /** if tile view enabled (default true) */
    allowview?: 'true' | 'false';
    /** The z-index of the dialog; default: 1300 */
    zindex?: `${number}`;
    /** If type selector should be shown */
    showtypeselector?: 'true' | 'false';
    /** If defined, allow selecting only files from this folder */
    restricttofolder?: string;
    /** force expert mode */
    expertmode?: 'true' | 'false';
    /** Show expert mode button */
    showexpertbutton?: 'true' | 'false';
    /** If restrictToFolder defined, allow selecting files outside of this folder */
    allownonrestricted?: 'true' | 'false';
}

interface FileDialogWebComponentState {
    connected: boolean;
    socket: Connection | null;
    theme: IobTheme;
    selected: string;
    opened: boolean;
    token: string;

    selectOnlyFolders?: boolean;
    filterByType?: 'images' | 'code' | 'txt';
    filterFiles?: string[];
    limitPath?: string;
    imagePrefix?: string;
    showToolbar?: boolean;
    allowUpload?: boolean;
    allowDownload?: boolean;
    allowCreateFolder?: boolean;
    allowDelete?: boolean;
    allowView?: boolean;
    showTypeSelector?: boolean;
    restrictToFolder?: string;
    expertMode?: boolean;
    showExpertButton?: boolean;
    allowNonRestricted?: boolean;
}

function string2boolean(value: string | undefined): boolean | undefined {
    if (value === 'true') {
        return true;
    }
    if (value === 'false') {
        return false;
    }
    return undefined;
}

export class FileDialogWebComponent extends Component<IFileDialogWebComponentProps, FileDialogWebComponentState> {
    private closeCalled = false;

    constructor(props: IFileDialogWebComponentProps) {
        super(props);

        const theme = Theme(props.theme || 'light');
        // modify primary and secondary colors
        if (props.primary) {
            theme.palette.primary.main = props.primary;
        }
        if (props.secondary) {
            theme.palette.secondary.main = props.secondary;
        }
        if (props.paper) {
            theme.palette.background.paper = props.paper;
        }

        this.state = {
            theme,
            selected: props.selected || '',
            socket: null,
            opened: !!props.open,
            connected: false,
            token: props.token || '',
            allowNonRestricted: string2boolean(props.allownonrestricted),
            selectOnlyFolders: string2boolean(props.selectonlyfolders),
            filterByType: props.filterbytype,
            filterFiles: FileDialogWebComponent.splitFiles(props.filterfiles),
            limitPath: props.limitpath,
            imagePrefix: props.imageprefix,
            showToolbar: string2boolean(props.showtoolbar),
            allowUpload: string2boolean(props.allowupload),
            allowDownload: string2boolean(props.allowdownload),
            allowCreateFolder: string2boolean(props.allowcreatefolder),
            allowDelete: string2boolean(props.allowdelete),
            allowView: string2boolean(props.allowview),
            showTypeSelector: string2boolean(props.showtypeselector),
            restrictToFolder: props.restricttofolder,
            expertMode: string2boolean(props.expertmode),
            showExpertButton: string2boolean(props.showexpertbutton),
        };

        I18n.setLanguage(props.language || 'en');
    }

    static splitFiles(value?: string): string[] | undefined {
        if (value) {
            return value.split(',').map(item => item.trim());
        }
        return undefined;
    }

    iobOnPropertyChanged = (attr: keyof IFileDialogWebComponentProps, value: string | boolean): void => {
        console.log(`New value ${attr}, ${value}`);
        if (attr === 'open') {
            const _opened = value === true || value === 'true';
            if (_opened !== this.state.opened) {
                if (_opened) {
                    this.closeCalled = false;
                }
                this.setState({ opened: _opened });
            }
        } else if (attr === 'selected' && value !== this.state.selected) {
            this.setState({ selected: value as string });
        } else if (attr === 'selectonlyfolders' && value !== this.state.selectOnlyFolders) {
            this.setState({ selectOnlyFolders: value ? value === 'true' : undefined });
        } else if (attr === 'filterbytype' && value !== this.state.filterByType) {
            this.setState({ filterByType: value as 'images' | 'code' | 'txt' });
        } else if (
            attr === 'filterfiles' &&
            JSON.stringify(FileDialogWebComponent.splitFiles(value as string)) !==
                JSON.stringify(this.state.filterFiles)
        ) {
            this.setState({ filterFiles: FileDialogWebComponent.splitFiles(value as string) });
        } else if (attr === 'limitpath' && value !== this.state.limitPath) {
            this.setState({ limitPath: value as string });
        } else if (attr === 'imageprefix' && value !== this.state.imagePrefix) {
            this.setState({ imagePrefix: value as string });
        } else if (attr === 'showtoolbar' && string2boolean(value as string) !== this.state.showToolbar) {
            this.setState({ showToolbar: string2boolean(value as string) });
        } else if (attr === 'allowupload' && string2boolean(value as string) !== this.state.allowUpload) {
            this.setState({ allowUpload: string2boolean(value as string) });
        } else if (attr === 'allowdownload' && string2boolean(value as string) !== this.state.allowDownload) {
            this.setState({ allowDownload: string2boolean(value as string) });
        } else if (attr === 'allowcreatefolder' && string2boolean(value as string) !== this.state.allowCreateFolder) {
            this.setState({ allowCreateFolder: string2boolean(value as string) });
        } else if (attr === 'allowdelete' && string2boolean(value as string) !== this.state.allowDelete) {
            this.setState({ allowDelete: string2boolean(value as string) });
        } else if (attr === 'allowview' && string2boolean(value as string) !== this.state.allowView) {
            this.setState({ allowView: string2boolean(value as string) });
        } else if (attr === 'showtypeselector' && string2boolean(value as string) !== this.state.showTypeSelector) {
            this.setState({ showTypeSelector: string2boolean(value as string) });
        } else if (attr === 'restricttofolder' && string2boolean(value as string) !== this.state.restrictToFolder) {
            this.setState({ restrictToFolder: value as string });
        } else if (attr === 'expertmode' && string2boolean(value as string) !== this.state.expertMode) {
            this.setState({ expertMode: string2boolean(value as string) });
        } else if (attr === 'showexpertbutton' && string2boolean(value as string) !== this.state.showExpertButton) {
            this.setState({ showExpertButton: string2boolean(value as string) });
        } else if (attr === 'allownonrestricted' && string2boolean(value as string) !== this.state.allowNonRestricted) {
            this.setState({ allowNonRestricted: string2boolean(value as string) });
        } else if (attr === 'token' && value !== JSON.stringify(this.state.token)) {
            this.setState({ token: (value as string) || '', connected: false }, () => {
                let access_token = '';
                if (this.state.token) {
                    try {
                        const token: OAuth2Response = JSON.parse(this.state.token);
                        access_token = token?.access_token || '';
                    } catch {
                        // ignore
                    }
                }
                this.setState({
                    socket: singletonConnection(
                        {
                            port: this.props.port,
                            host: this.props.host,
                            protocol: this.props.protocol,
                            // @ts-expect-error will be fixed later
                            token: access_token,
                        },
                        (connected: boolean): void => this.setState({ connected }),
                    ),
                });
            });
        }
    };

    componentDidMount(): void {
        (window as any)._iobOnPropertyChanged = this.iobOnPropertyChanged;
        let accessToken = '';
        if (this.state.token) {
            try {
                const token: OAuth2Response = JSON.parse(this.state.token);
                accessToken = token?.access_token || '';
            } catch {
                // ignore
            }
        }

        this.setState({
            socket: singletonConnection(
                {
                    port: this.props.port,
                    host: this.props.host,
                    protocol: this.props.protocol,
                    // @ts-expect-error
                    token: accessToken,
                },
                (connected: boolean): void => this.setState({ connected }),
            ),
        });
    }

    componentWillUnmount(): void {
        if ((window as any)._iobOnPropertyChanged === this.iobOnPropertyChanged) {
            (window as any)._iobOnPropertyChanged = null;
        }
    }

    render(): React.JSX.Element {
        (window as any)._renderText = `[${new Date().toString()}] render`;

        console.log(
            `Render socket: ${!!this.state.socket}, theme: ${!!this.state.theme}, connected: ${this.state.connected}, opened: ${this.state.opened}, selected: ${this.state.selected}, zindex: ${this.props.zindex}`,
        );

        if (!this.state.socket || !this.state.theme) {
            return <div>...</div>;
        }
        if (!this.state.connected) {
            return <div>...</div>;
        }

        return this.state.opened ? (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={this.state.theme}>
                    <DialogSelectFile
                        zIndex={this.props.zindex ? parseInt(this.props.zindex, 10) : undefined}
                        themeName={this.state.theme.palette.mode}
                        themeType={this.state.theme.palette.mode}
                        restrictToFolder={this.state.restrictToFolder}
                        imagePrefix={this.state.imagePrefix || './'}
                        theme={this.state.theme}
                        selected={this.state.selected}
                        socket={this.state.socket}
                        onClose={(): void => {
                            if (this.closeCalled) {
                                return;
                            }
                            if (
                                typeof this.props.onclose === 'string' &&
                                typeof (window as any)[this.props.onclose] === 'function'
                            ) {
                                (window as any)[this.props.onclose](null);
                                return;
                            }

                            return (this.props.onclose as OnClose)(null);
                        }}
                        onOk={(selected: string | string[] | undefined): void => {
                            this.closeCalled = true;

                            let id: string | undefined;
                            if (selected && typeof selected === 'object') {
                                id = selected[0];
                            } else {
                                id = selected;
                            }
                            if (id) {
                                if (
                                    typeof this.props.onclose === 'string' &&
                                    typeof (window as any)[this.props.onclose] === 'function'
                                ) {
                                    (window as any)[this.props.onclose](id, this.props.selected);
                                    return;
                                }

                                return (this.props.onclose as OnClose)(id, this.props.selected);
                            }

                            if (
                                typeof this.props.onclose === 'string' &&
                                typeof (window as any)[this.props.onclose] === 'function'
                            ) {
                                (window as any)[this.props.onclose](null);
                                return;
                            }

                            return (this.props.onclose as OnClose)(null);
                        }}
                        expertMode={this.state.expertMode}
                        showExpertButton={this.state.showExpertButton}
                        allowNonRestricted={this.state.allowNonRestricted}
                        selectOnlyFolders={this.state.selectOnlyFolders}
                        filterByType={this.state.filterByType}
                        filterFiles={this.state.filterFiles}
                        limitPath={this.state.limitPath}
                        showToolbar={this.state.showToolbar}
                        allowUpload={this.state.allowUpload}
                        allowDownload={this.state.allowDownload}
                        allowCreateFolder={this.state.allowCreateFolder}
                        allowDelete={this.state.allowDelete}
                        allowView={this.state.allowView}
                        showTypeSelector={this.state.showTypeSelector}
                    />
                </ThemeProvider>
            </StyledEngineProvider>
        ) : (
            <div />
        );
    }
}
