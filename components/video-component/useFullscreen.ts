import { useEffect, useState } from 'react'
import Player from 'video.js/dist/types/player'

export const useFullscreen = (player: React.MutableRefObject<Player | null>) => {
    const [isFullscreen, setIsFullscreen] = useState(false)

    const handleFullscreen = () => {
        if (!player.current) return
        if (!player.current.isFullWindow) {
            player.current?.controls(true)
            player.current?.requestFullscreen()
        } else {
            player.current?.controls(false)
        }
        setIsFullscreen(!isFullscreen)
    }

    player.current?.on('fullscreenchange', () => {
        setIsFullscreen(!!player.current?.isFullscreen())
        player.current?.controls(!!player.current?.isFullscreen())
    })
    return { isFullscreen, setIsFullscreen, handleFullscreen }
}
