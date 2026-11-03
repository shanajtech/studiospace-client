import Link from 'next/link';
import { Aperture,ArrowUpRight } from 'lucide-react';
export default function NotFound(){return <section className="not-found page-shell"><div className="studio-illustration"><span className="light-beam"/><Aperture size={84}/><span>404</span></div><div className="eyebrow">A little off set</div><h1>This space isn’t on the map.</h1><p>The page may have moved, but your next great idea is still out there.</p><Link className="button" href="/">Return to Home<ArrowUpRight size={18}/></Link></section>;}
