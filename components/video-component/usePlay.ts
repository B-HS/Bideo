import { useState } from 'react'
import Player from 'video.js/dist/types/player'

export const usePlay = (player: React.MutableRefObject<Player | null>) => {
    const [isPlay, setIsPlay] = useState(false)

    const handlePlay = () => {
        if (!player.current) return
        if (isPlay) {
            player.current.pause()
        } else {
            player.current.play()
        }
        setIsPlay(!isPlay)
    }
    return { isPlay, setIsPlay, handlePlay }
}
