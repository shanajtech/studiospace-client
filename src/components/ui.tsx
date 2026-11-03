'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { X, ArrowUpRight, Aperture, SearchX } from 'lucide-react';
import Link from 'next/link';
import { useSession } from './providers';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
export function Modal({open,onClose,title,children}:{open:boolean;onClose:()=>void;title:string;children:ReactNode}){return <Dialog open={open} onOpenChange={v=>!v&&onClose()}><DialogContent><DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader><DialogDescription className="sr-only">Review the details below before continuing.</DialogDescription>{children}</DialogContent></Dialog>;}
export function Empty({title,description,href='/studios',action='Explore studios'}:{title:string;description:string;href?:string;action?:string}){return <div className="empty-state"><SearchX size={36}/><h3>{title}</h3><p>{description}</p><Link href={href} className="button">{action}<ArrowUpRight size={17}/></Link></div>;}
export function Skeletons(){return <div className="studio-grid">{Array.from({length:6},(_,i)=><div className="skeleton-card" key={i}><div className="skeleton-image"/><div className="skeleton-line"/><div className="skeleton-line short"/></div>)}</div>;}
export function Protected({children}:{children:ReactNode}){const{user,loading,error,refresh}=useSession();const path=usePathname();if(loading)return <div className="loading-state"><Aperture className="spin"/><p>Getting your creative space ready…</p></div>;if(error)return <div className="empty-state"><h2>We couldn’t connect</h2><p>{error}</p><button className="button" onClick={()=>void refresh()}>Try again</button></div>;if(!user)return <Empty title="Your space starts here" description="Sign in to manage your studios and reservations." href={`/login?next=${encodeURIComponent(path)}`} action="Sign in to continue"/>;return <>{children}</>;}
