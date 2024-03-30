'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment, MouseEvent } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from './ui/breadcrumb'

const PathManager = ({ currentPath = '' }: { currentPath?: string }) => {
    const router = useRouter()
    const pathSegments = currentPath.split('/').filter(Boolean)

    const BreadcrumbItems = pathSegments.map((segment, index) => {
        const pathUpToCurrent = pathSegments.slice(0, index + 1).join('/')
        return (
            <Fragment key={index}>
                {index > 0 && <BreadcrumbSeparator />}
                <Link href={`/?path=${pathUpToCurrent}`}>
                    <BreadcrumbItem>{segment}</BreadcrumbItem>
                </Link>
            </Fragment>
        )
    })

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <Link href='/'>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                </Link>
                <BreadcrumbSeparator />
                {BreadcrumbItems}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default PathManager
