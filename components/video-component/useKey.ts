import { useEffect } from 'react'
import Player from 'video.js/dist/types/player'

export const useKey = (player: React.MutableRefObject<Player | null>) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!player.current) return
            switch (e.code) {
                case 'Space':
                    if (player.current.paused()) {
                        player.current.play()
                    } else {
                        player.current.pause()
                    }
                    break
                case 'ArrowRight':
                    player.current.currentTime((player.current.currentTime() || 0) + 5)
                    break
                case 'ArrowLeft':
                    player.current.currentTime((player.current.currentTime() || 0) - 5)
                    break
                case 'KeyF':
                    if (!player.current.isFullscreen()) {
                        player.current.requestFullscreen()
                    } else {
                        player.current.exitFullscreen()
                    }
                    break
                case 'KeyM':
                    player.current.muted(!player.current.muted())
                    break
                case 'ArrowUp':
                    player.current.volume((player.current.volume() || 0) + 0.1)
                    break
                case 'ArrowDown':
                    player.current.volume((player.current.volume() || 0) - 0.1)
                    break
                default:
                    break
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => {
            window.removeEventListener('keydown', handleKey)
        }
    }, [player])
}
