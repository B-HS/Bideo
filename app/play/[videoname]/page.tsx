'use client'
import { Button } from '@/components/ui/button'
import { VideoJsPlayer } from '@/components/vjs-component'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { join } from 'path'

const Page = ({ searchParams, params }: { searchParams?: { path?: string }; params: Record<string, string> }) => {
    const { path } = searchParams ?? {}
    const { videoname: rawVideoName } = params
    const videoname = decodeURIComponent(rawVideoName)
    const router = useRouter()
    return (
        <section className='flex flex-col gap-5 py-3'>
            <section className='flex gap-2 items-center'>
                <Button size={'icon'} variant={'ghost'} asChild onClick={() => router.back()} className='cursor-pointer'>
                    <ArrowLeft />
                </Button>
                <span className='font-bold text-2xl'>{videoname}</span>
            </section>
            <VideoJsPlayer options={{ controls: false, fluid: true }} sources={'/' + join(path || '', videoname)} />
        </section>
    )
}
export default Page
