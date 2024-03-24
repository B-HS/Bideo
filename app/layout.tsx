import Header from '@/components/header/header'
import './globals.css'
import InitProject from '@/components/project/init-project'
const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang='ko'>
            <body className='container max-w-screen-xl'>
                <Header />
                {children}
                {/* <InitProject /> */}
            </body>
        </html>
    )
}

export default RootLayout
