import PathManager from '@/components/path-manager'
import { Button } from '@/components/ui/button'
import { getFolder } from '@/util/files'
import { File, Folder } from 'lucide-react'
import Link from 'next/link'
import path from 'path'

const FolderFileList = async ({ folderPath }: { folderPath?: string }) => {
    const data = await getFolder(folderPath)
    return (
        <section className='flex flex-col items-start'>
            {data.map((ele, idx) =>
                ele.type === 'folder' ? (
                    <Button className='justify-start p-0 cursor-pointer w-full' variant={'ghost'} asChild key={idx}>
                        <Link className='flex gap-2' href={`?path=${!!folderPath ? path.join(folderPath, ele.name) : ele.name}`}>
                            <Folder />
                            <span>{ele.name}</span>
                        </Link>
                    </Button>
                ) : (
                    <Button className='justify-start p-0 cursor-pointer w-full' variant={'ghost'} asChild key={idx}>
                        <section className='flex gap-2 text-start'>
                            <File />
                            <span>{ele.name}</span>
                        </section>
                    </Button>
                ),
            )}
        </section>
    )
}

export default FolderFileList
