import { VideoExtensionName } from '@/constant/videoExtensionList'

import { randomUUID } from 'crypto'
import fs from 'fs'
import path from 'path'

export const topPath = path.join(process.cwd(), 'public')
export const getFolder = async (folderPath?: string) => {
    const elements = fs.readdirSync(path.join(topPath, folderPath || '')) as string[]
    const folder = elements
        .filter((ele) => fs.statSync(path.join(path.join(topPath, folderPath || ''), ele)).isDirectory())
        .map((ele) => ({ type: 'folder', name: ele }))
    const files = elements
        .filter((ele) => VideoExtensionName.includes(ele.split('.').pop() || 'NONE'))
        .map((ele) => ({ type: 'file', name: `${ele}/`, tempId: randomUUID() }))
    return [...folder, ...files] as { type: 'folder' | 'file'; name: string }[]
}
