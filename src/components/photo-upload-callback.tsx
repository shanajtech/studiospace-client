'use client';
import { useEffect, useState } from 'react';
import { Aperture } from 'lucide-react';
import { parsePostImageResult } from '@/lib/postimage';

/** PostImage also supports redirecting its upload window back with hash data. */
export function relayPhotoUpload():boolean {
  const params=new URLSearchParams(window.location.hash.slice(1));
  const id=params.get('postimage_id'),text=params.get('postimage_text');
  if(!id||!text||!/^studio_[\w-]+$/.test(id))return false;
  window.name='studiospace-photo-upload';
  try{
    if(!parsePostImageResult(encodeURIComponent(text)).length)return false;
    if(!window.opener||window.opener.closed)return false;
    window.opener.postMessage({id,message:encodeURIComponent(text)},window.location.origin);
    return true;
  }catch{return false;}
}

export function PhotoUploadCallback(){
  const [sent,setSent]=useState<boolean|null>(null);
  useEffect(()=>{setSent(relayPhotoUpload());},[]);
  return <section className="page-shell section"><div className="loading-state" role="status"><Aperture size={36}/><h1>{sent===false?'Your photo is uploaded.':'Returning your studio photos…'}</h1><p>{sent===false?'Keep your original studio form open and retry its upload button. The original upload window is needed to attach your photo safely.':'Your photos are being added to your original studio form. This window will close when they arrive.'}</p></div></section>;
}

