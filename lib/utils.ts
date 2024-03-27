import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const secondsToMMSS = (seconds: number) => {
    const durationObj = dayjs.duration(seconds, 'seconds')
    const hours = Math.floor(durationObj.asHours())
    const minutes = durationObj.minutes()
    const secondsRemaining = durationObj.seconds()

    if (hours > 0) {
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`
    } else {
        return `${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`
    }
}
