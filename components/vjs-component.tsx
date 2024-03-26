'use client'
import VideoJsOptions from '@/util/videojs'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.css'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useFullscreen } from './video-component/useFullscreen'
import { usePlay } from './video-component/usePlay'

type Props = {
    // 영상의 URL, 혹은 URL배열
    sources: string | { src: string; type: string }[]
    // 영상 옵션
    options?: VideoJsOptions
    //플레이어 준비 완료 시 호출 될 콜백
    onReady?: (player?: Player) => void
}
// techlab.q-co.jp/articles/134 사이트에서.., 압도적 감사.. ㅠㅠ
export const VideoJsPlayer: FC<Props> = ({ sources, options: opt, onReady }) => {
    const videoRef = useRef<HTMLVideoElement | Element | null>(null)
    const playerRef = useRef<Player | null>(null)
    const { handlePlay, isPlay, setIsPlay } = usePlay(playerRef)
    const { isFullscreen, setIsFullscreen, handleFullscreen } = useFullscreen(playerRef)
    const [videoReady, setVideoReady] = useState(false)

    useEffect(() => {
        if (!playerRef.current) {
            const player = videojs(videoRef.current as Element, { sources, ...opt })
            player.on('ready', () => {
                onReady?.(player)
                setVideoReady(true)
                playerRef.current = player
                playerRef.current.addClass('p-0')
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
    }, [onReady, opt, sources, videoRef])

    playerRef.current?.on('click', () => {
        if (isPlay) {
            setIsPlay(false)
            playerRef.current?.pause()
        } else {
            setIsPlay(true)
            playerRef.current?.play()
        }
    })
    return (
        <>
            <div className='relative h-fit'>
                <video
                    onContextMenu={(e) => e.preventDefault()}
                    data-vjs-player
                    ref={videoRef as MutableRefObject<HTMLVideoElement>}
                    className='w-full h-fit'
                />
                {videoReady && !isPlay && (
                    <section className='w-full h-full absolute inset-0 flex items-center justify-center'>
                        <Badge onClick={handlePlay} className='w-16 h-10 inline-flex justify-center items-center' variant={'secondary'}>
                            Play Cover
                        </Badge>
                    </section>
                )}
            </div>
            <section className='flex'>
                <Button variant={'outline'} onClick={handleFullscreen}>
                    Fullscreen
                </Button>
                <Button variant={'outline'} onClick={handlePlay}>
                    {isPlay ? 'Pause' : 'Play'}
                </Button>
            </section>
        </>
    )
}
