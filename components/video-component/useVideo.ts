import VideoJsOptions from '@/util/videojs'
import { useEffect } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'

export const useVideo = (
    playerRef: React.MutableRefObject<Player | null>,
    videoRef: React.MutableRefObject<Element | null>,
    sources: string | { src: string; type: string }[],
    opt?: VideoJsOptions,
    onReady?: (player?: Player) => void,
    setCurrentTime?: (time: number) => void,
    setFullTime?: (time: number) => void,
    setIsPlay?: (isPlay: boolean) => void,
    isPlay?: boolean,
    setBuffered?: (buffered: number) => void,
) => {
    useEffect(() => {
        if (!playerRef.current) {
            const player = videojs(videoRef.current as Element, { sources, ...opt })
            player.on('ready', () => {
                onReady?.(player)
                playerRef.current = player
            })
        } else {
            const player = playerRef.current
            player.src(sources)
        }
        return () => {
            if (playerRef.current && !playerRef.current.isDisposed()) {
                playerRef.current.dispose()
                playerRef.current = null
            }
        }
    }, [onReady, opt, playerRef, setCurrentTime, setFullTime, sources, videoRef])

    playerRef.current?.on('timeupdate', () => {
        const time = playerRef.current?.currentTime() || 0
        setCurrentTime?.(time)
        setFullTime?.(playerRef.current?.duration() || 0)
    })

    playerRef.current?.on('click', () => {
        if (isPlay) {
            setIsPlay?.(false)
            playerRef.current?.pause()
        } else {
            setIsPlay?.(true)
            playerRef.current?.play()
        }
    })
    playerRef.current?.on('progress', () => {
        const bufferedTime = playerRef.current?.bufferedEnd() || 0
        setBuffered?.(bufferedTime)
    })

    playerRef.current?.on('ended', () => {
        setIsPlay?.(false)
        setCurrentTime?.(0)
    })
    const handleProgress = (sec: number) => {
        if (!playerRef.current) return
        playerRef.current.currentTime(sec)
        setCurrentTime?.(sec)
    }

    return { handleProgress }
}
