import { Button } from '@/components/ui/button'
import { getFolder } from '@/util/files'
import { File, Folder, Video } from 'lucide-react'
import Link from 'next/link'
import path from 'path'
import ElementContextMenu from './element-contextmenu'

const FolderFileList = async ({ folderPath }: { folderPath?: string }) => {
    const data = await getFolder(folderPath)
    const isMp4 = (fileName: string) => fileName.split('.').pop() === 'mp4'

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
                    <Button className='justify-start p-0 cursor-pointer w-full gap-2' variant={'ghost'} asChild key={idx}>
                        {isMp4(ele.name) ? (
                            <Link href={`/play/${ele.name}?path=${folderPath}`}>
                                <Video />
                                <span>{ele.name}</span>
                            </Link>
                        ) : (
                            <ElementContextMenu path={`${folderPath}/${ele.name}`}>
                                <Button className='justify-start p-0 cursor-pointer w-full gap-2' variant={'ghost'} asChild key={idx}>
                                    <div className='flex w-full gap-2 cursor-pointer p-0 justify-start'>
                                        <File />
                                        <span>{ele.name}</span>
                                    </div>
                                </Button>
                            </ElementContextMenu>
                        )}
                    </Button>
                ),
            )}
        </section>
    )
}

export default FolderFileList
