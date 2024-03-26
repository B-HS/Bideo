import { Folder, Video } from 'lucide-react'
import { getFolder, topPath } from '@/util/files'
import { VideoJsPlayer } from '@/components/vjs-component'

const Home = async () => {
    const data = await getFolder()
    return (
        <div className='p-10'>
            {data.map((ele, idx) => (
                <section key={idx} className='flex gap-2'>
                    {ele.type === 'file' ? <Video /> : <Folder />}
                    <span>{ele.name}</span>
                </section>
            ))}
            {data
                .filter((ele) => ele.type === 'file')
                .map((ele, idx) => (
                    <section key={idx} className='w-full'>
                        <p>{topPath + ele.name}</p>
                        <VideoJsPlayer options={{ controls: false, responsive: true, audioOnlyMode: false }} sources={`/video/${ele.name}`} />
                    </section>
                ))}
        </div>
    )
}

export default Home
