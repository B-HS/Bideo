export interface VideoJsTechOptions {
    html5?: {
        nativeControlsForTouch?: boolean
        nativeAudioTracks?: boolean
        nativeTextTracks?: boolean
        nativeVideoTracks?: boolean
        preloadTextTracks?: boolean
    }
}

export interface VideoJsComponentOptions {
    controlBar?: {
        fullscreenToggle?: boolean
        // Add more specific options for ControlBar if needed
    }
    // Add other component options as needed
}

interface VideoJsPlayerOptions {
    aspectRatio?: string
    audioOnlyMode?: boolean
    audioPosterMode?: boolean
    autoSetup?: boolean
    breakpoints?: {
        [key: string]: number
    }
    children?: Array<string | VideoJsComponentOptions> | VideoJsComponentOptions
    controls?: boolean
    disablePictureInPicture?: boolean
    enableDocumentPictureInPicture?: boolean
    enableSmoothSeeking?: boolean
    experimentalSvgIcons?: boolean
    fluid?: boolean
    fullscreen?: {
        options?: {
            [key: string]: any
        }
    }
    id?: string
    inactivityTimeout?: number
    language?: string
    languages?: {
        [key: string]: {
            [key: string]: string
        }
    }
    liveui?: boolean
    liveTracker?: {
        trackingThreshold?: number
        liveTolerance?: number
    }
    noUITitleAttributes?: boolean
    playbackRates?: number[]
    playsinline?: boolean
    plugins?: {
        [pluginName: string]: any
    }
    preferFullWindow?: boolean
    responsive?: boolean
    restoreEl?: boolean | HTMLElement
    skipButtons?: {
        forward?: number
        backward?: number
    }
    sources?: Array<{
        src: string
        type: string
    }>
    suppressNotSupportedError?: boolean
    techCanOverridePoster?: boolean
    techOrder?: string[]
    userActions?: {
        click?: boolean | ((event: MouseEvent) => void)
        doubleClick?: boolean | ((event: MouseEvent) => void)
        hotkeys?:
            | boolean
            | ((event: KeyboardEvent) => void)
            | {
                  fullscreenKey?: (event: KeyboardEvent) => boolean
                  muteKey?: (event: KeyboardEvent) => boolean
                  playPauseKey?: (event: KeyboardEvent) => boolean
              }
    }
    vttjs?: string
}

interface VideoJsOptions extends VideoJsPlayerOptions {
    controlBar?: {
        [key: string]: any
    }
    techOrder?: string[]
    userActions?: {
        [key: string]: any
    }
}

export default VideoJsOptions
