import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

export const topPath = path.join(process.cwd(), 'public')
export const getFolder = async (folderPath: string = ''): Promise<{ type: 'folder' | 'file'; name: string }[]> => {
    const fullPath = path.join(topPath, folderPath)
    const elements = await readdir(fullPath)
    return await Promise.all(
        elements.map(async (name) => {
            const stats = await stat(path.join(fullPath, name))
            const type: 'folder' | 'file' = stats.isDirectory() ? 'folder' : 'file'
            return { type, name }
        }),
    )
}
