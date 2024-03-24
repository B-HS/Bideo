'use client'
import { useProjectConfig } from '@/store/project-config'

const Home = () => {
    const { SITE_TITLE, FOLDER_PATH } = useProjectConfig()
    return <div className='p-10'>{SITE_TITLE}</div>
}

export default Home
