'use client'
import { FC, useEffect, useRef } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.css'

type Props = {
    // 영상의 URL, 혹은 URL배열
    sources: string | { src: string; type: string }[]
    // 영상 옵션
    options?: {
        // 자동 재생 여부
        autoplay?: boolean
        // 영상 제어 여부
        controls?: boolean
    }
    //플레이어 준비 완료 시 호출 될 콜백
    onReady?: (player?: Player) => void
}

export const VideoJsPlayer: FC<Props> = ({ sources, options, onReady }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const videojsOptions = { sources, ...options }
        const player = videojs(video, videojsOptions)
        player.on('ready', () => onReady?.(player))

        return () => {
            if (player) player.dispose()
        }
    }, [onReady, options, sources])

    return (
        <div data-vjs-player>
            {/* "video-js"는 video-js의 스타일 적용을 위해 필요 */}
            <video ref={videoRef} className='video-js w-full' />
        </div>
    )
}
// techlab.q-co.jp/articles/134 사이트에서.., 압도적 감사.. ㅠㅠ
