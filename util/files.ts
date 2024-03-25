import { VideoExtensionName } from '@/constant/videoExtensionList'
import { Folder, Video } from 'lucide-react'

import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

export const topPath = path.join(process.cwd(), 'public', 'video')

export const getFolder = async () => {
    const elements = fs.readdirSync(topPath) as string[]
    const folder = elements.filter((ele) => fs.statSync(path.join(topPath, ele)).isDirectory()).map((ele) => ({ type: 'folder', name: ele }))
    const files = elements
        .filter((ele) => VideoExtensionName.includes(ele.split('.').pop() || 'NONE'))
        .map((ele) => ({ type: 'file', name: `${ele}/`, tempId: randomUUID() }))
    return [...folder, ...files] as { type: 'folder' | 'file'; name: string }[]
}
