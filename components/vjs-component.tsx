'use client'
import { cn, secondsToMMSS } from '@/lib/utils'
import VideoJsOptions from '@/util/videojs'
import { cx } from 'class-variance-authority'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { AnimatePresence, motion } from 'framer-motion'
import { Maximize, Minimize, Pause, Play } from 'lucide-react'
import { FC, MutableRefObject, useRef, useState } from 'react'
import Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.css'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { VideoSlider } from './ui/video-slider'
import { usePlay } from './video-component/usePlay'
import { useVideo } from './video-component/useVideo'

dayjs.extend(duration)
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
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [fullTime, setFullTime] = useState(0)
    const [buffered, setBuffered] = useState(0)
    const videoRef = useRef<HTMLVideoElement | Element | null>(null)
    const playerRef = useRef<Player | null>(null)
    const { handlePlay, isPlay, setIsPlay } = usePlay(playerRef)
    const { handleProgress } = useVideo(playerRef, videoRef, sources, opt, onReady, setCurrentTime, setFullTime, setIsPlay, isPlay, setBuffered)

    return (
        <div className={cn('relative h-fit group overflow-hidden', isFullscreen && 'absolute inset-0 w-[99.25dvw] z-[9999] bg-black')}>
            <video
                onContextMenu={(e) => e.preventDefault()}
                data-vjs-player
                ref={videoRef as MutableRefObject<HTMLVideoElement>}
                className='video-js w-full'
            />
            <AnimatePresence>
                {!isPlay && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                        <section
                            onClick={handlePlay}
                            className='w-full h-full absolute inset-0 flex items-center justify-center bg-opacity-30 bg-foreground/50 transition-all cursor-pointer'
                        >
                            <Badge className='w-16 h-10 inline-flex justify-center items-center bg-foreground/50' variant={'default'}>
                                <Play />
                            </Badge>
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>

            <section
                className={cx(
                    'flex flex-col absolute bottom-0 left-0 group-hover:translate-y-0 transition-all bg-foreground/50 w-full justify-between border-foreground/20',
                    !isPlay ? 'translate-y-0' : 'translate-y-9',
                )}
            >
                <section className='w-full flex items-center justify-center h-[6px]'>
                    <VideoSlider
                        className='rounded-none absolute top-0 z-20'
                        value={[currentTime]}
                        max={fullTime}
                        trackClassName={'bg-background/35 cursor-pointer'}
                        rangeClassName='bg-background/75'
                        trackOnclick={handleProgress}
                    />
                    <VideoSlider
                        className='rounded-none absolute top-0 z-10'
                        value={[buffered]}
                        max={fullTime}
                        trackClassName={'bg-transparent'}
                        rangeClassName='bg-background/30'
                    />
                </section>
                <section className='flex justify-between'>
                    <section className='w-fit flex justify-start items-center gap-3'>
                        <Button variant={'ghost'} size={'icon'} onClick={handlePlay} className='p-2 rounded-none text-background/50'>
                            {isPlay ? <Pause /> : <Play />}
                        </Button>
                        <section className='flex gap-1 text-background/70 w-fit whitespace-nowrap'>
                            <span>{secondsToMMSS(currentTime)}</span>
                            <span>/</span>
                            <span>{secondsToMMSS(fullTime)}</span>
                        </section>
                    </section>
                    <section className='w-fit flex justify-end'>
                        <Button
                            variant={'ghost'}
                            size={'icon'}
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className='p-2 rounded-none text-background/50'
                        >
                            {isFullscreen ? <Minimize /> : <Maximize />}
                        </Button>
                    </section>
                </section>
            </section>
        </div>
    )
}
