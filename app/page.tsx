import FolderFileList from '@/components/folder-file-list'
import PathManager from '@/components/path-manager'

const Home = async ({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) => {
    const folrderPath = searchParams?.path || ''

    return (
        <section className='p-10 flex flex-col gap-3 border-b'>
            <PathManager currentPath={folrderPath} />
            <FolderFileList folderPath={folrderPath} />
        </section>
    )
}

export default Home
