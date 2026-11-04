'use client';
import { useState } from 'react';
import { usePathname,useRouter } from 'next/navigation';
import { Heart,LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { Studio } from '@/lib/types';
import { useSession } from './providers';

export function SaveStudioButton({studio,compact=false}:{studio:Studio;compact?:boolean}){
  const {user,loading,savedStudios,wishlistLoading,toggleSaved}=useSession();
  const [busy,setBusy]=useState(false);const router=useRouter(),path=usePathname();
  const saved=savedStudios.some(item=>item._id===studio._id);
  async function toggle(){if(!user){router.push(`/login?next=${encodeURIComponent(path)}`);return;}setBusy(true);try{const next=await toggleSaved(studio);toast.success(next?'Studio added to your saved spaces.':'Studio removed from your saved spaces.');}catch(e){toast.error((e as Error).message);}finally{setBusy(false);}}
  return <button type="button" className={compact?'save-studio-button':`button outline small ${saved?'is-saved':''}`} aria-label={`${saved?'Remove':'Save'} ${studio.title}${saved?' from saved studios':' to saved studios'}`} aria-pressed={saved} disabled={loading||busy||Boolean(user&&wishlistLoading)} onClick={()=>void toggle()}>{busy?<LoaderCircle size={18} className="spin"/>:<Heart size={18} fill={saved?'currentColor':'none'}/>} {!compact&&(saved?'Saved studio':'Save studio')}</button>;
}

