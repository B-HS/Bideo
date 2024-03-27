'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn, secondsToMMSS } from '@/lib/utils'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { Tooltip, TooltipContent, TooltipProvider } from './tooltip'
interface VideoSliderProps {
    trackClassName?: string
    rangeClassName?: string
    trackOnclick?: (sec: number) => void
}

const VideoSlider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root> & VideoSliderProps,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & VideoSliderProps
>(({ className, trackClassName, rangeClassName, trackOnclick, ...props }, ref) => (
    <SliderPrimitive.Root ref={ref} className={cn('relative flex w-full touch-none select-none items-center', className)} {...props}>
        <TooltipProvider delayDuration={0}>
            <section className='absolute flex justify-between w-full h-full z-[9999]'>
                {!!props.max &&
                    Array.from({ length: props.max }).map((_, i) => (
                        <Tooltip key={i}>
                            <TooltipTrigger asChild>
                                <section className='w-full h-full flex-1 cursor-pointer' onClick={() => trackOnclick?.(i)} />
                            </TooltipTrigger>
                            <TooltipContent>{secondsToMMSS(i)}</TooltipContent>
                        </Tooltip>
                    ))}
            </section>
        </TooltipProvider>
        <SliderPrimitive.Track className={cn('relative h-1.5 w-full grow overflow-hidden  bg-primary/20', trackClassName)}>
            <SliderPrimitive.Range className={cn('absolute h-full bg-primary', rangeClassName)} />
        </SliderPrimitive.Track>
    </SliderPrimitive.Root>
))
VideoSlider.displayName = SliderPrimitive.Root.displayName

export { VideoSlider }
