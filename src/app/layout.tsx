import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';
export const metadata:Metadata={title:{default:'StudioSpace — Room for your next big idea',template:'%s | StudioSpace'},description:'Discover inspiring photo studios, film stages, podcast lounges and music suites. Book creative spaces by the hour.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{document.documentElement.dataset.theme=localStorage.getItem('studiospace-theme')||'light'}catch(e){}`}}/></head><body><Providers><Header/><main id="main-content">{children}</main><Footer/></Providers></body></html>;}
