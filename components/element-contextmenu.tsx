'use client'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { ReactNode } from 'react'
const ElementContextMenu = ({ children, path }: { children: ReactNode; path: string }) => {
    const download = () => {
        fetch(`${path}`)
            .then((res) => res.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = path
                a.click()
            })
    }
    return (
        <ContextMenu modal={false}>
            <ContextMenuTrigger className='w-full'>{children}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={() => download()}>Download</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default ElementContextMenu
