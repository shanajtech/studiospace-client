'use client';
import { Aperture } from 'lucide-react';
import { useSession } from './providers';
import { Empty } from './ui';
import { StudioCard } from './studio-card';
export function SavedStudios(){const{savedStudios,wishlistLoading,wishlistError,reloadWishlist}=useSession();
  if(wishlistLoading)return <div className="loading-state" role="status"><Aperture className="spin"/><p>Finding your saved spaces…</p></div>;
  if(wishlistError)return <div className="inline-error"><p>{wishlistError}</p><button className="button" onClick={()=>void reloadWishlist()}>Try again</button></div>;
  return savedStudios.length?<><p className="saved-count">{savedStudios.length} space{savedStudios.length===1?'':'s'} on your creative shortlist.</p><div className="studio-grid">{savedStudios.map(studio=><StudioCard key={studio._id} studio={studio}/>)}</div></>:<Empty title="Keep your next great space close." description="Tap the heart on any studio to save it here for later." href="/studios" action="Discover studios"/>;
}

