import { useState } from 'react'
import Player from 'video.js/dist/types/player'

export const useFullscreen = (player: React.MutableRefObject<Player | null>) => {
    const [isFullscreen, setIsFullscreen] = useState(false)

    const handleFullscreen = () => {
        if (!player.current) return
        if (!player.current.isFullWindow) {
            player.current.enterFullWindow()
        } else {
            player.current.exitFullWindow()
        }
        setIsFullscreen(!isFullscreen)
    }
    return { isFullscreen, setIsFullscreen, handleFullscreen }
}
