'use client';
import Link from 'next/link';
import { SaveStudioButton } from './save-studio-button';
import { ArrowUpRight,MapPin,Star } from 'lucide-react';
import { money,type Studio } from '@/lib/types';
export function StudioCard({studio}:{studio:Studio}){return <article className="studio-card"><div className="card-photo-wrap"><Link href={`/studios/${studio._id}`} className="card-image"><img src={studio.images[0]} alt={studio.title} loading="lazy"/><span className="category-badge">{studio.category}</span><span className="card-arrow"><ArrowUpRight size={20}/></span></Link><SaveStudioButton studio={studio} compact/></div><div className="card-meta"><span><MapPin size={13}/>{studio.location}</span><span><Star size={13} fill="currentColor"/>{studio.rating?studio.rating.toFixed(1):'New'}</span></div><Link className="card-title" href={`/studios/${studio._id}`}>{studio.title}</Link><div className="card-bottom"><span><strong>{money(studio.hourlyRate)}</strong> / hour</span><Link href={`/studios/${studio._id}`}>View details<ArrowUpRight size={14}/></Link></div></article>;}

