'use client';
import { useEffect, useRef, useState } from 'react';
import { Upload, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { parsePostImageResult } from '@/lib/postimage';
import { relayPhotoUpload } from './photo-upload-callback';

// PostImage's documented website-plugin flow returns uploaded image markup
// through postMessage. Never accept messages from other windows or hosts.
export function PostImageUpload({onImages,disabled=false}:{onImages:(urls:string[])=>void;disabled?:boolean}) {
  const popup=useRef<Window|null>(null);
  const requestId=useRef('');
  const callback=useRef(onImages);
  const [waiting,setWaiting]=useState(false);
  useEffect(()=>{callback.current=onImages;},[onImages]);
  useEffect(()=>{
    // Accept the documented hash-return path used by PostImage upload windows.
    relayPhotoUpload();
    function receive(event:MessageEvent) {
      if(!['https://postimages.org',window.location.origin].includes(event.origin)||event.source!==popup.current||!popup.current||event.data?.id!==requestId.current||typeof event.data.message!=='string')return;
      let urls:string[];
      try{urls=parsePostImageResult(event.data.message);}catch{toast.error('The image service returned an invalid response. Please try again.');return;}
      if(!urls.length){toast.error('No usable studio photos were returned. Please retry the upload.');return;}
      callback.current(urls);
      popup.current.close();popup.current=null;setWaiting(false);
    }
    window.addEventListener('message',receive);
    const timer=window.setInterval(()=>{if(popup.current?.closed){popup.current=null;setWaiting(false);}},500);
    return()=>{window.removeEventListener('message',receive);window.clearInterval(timer);popup.current?.close();};
  },[]);
  function upload(){
    if(popup.current&&!popup.current.closed){popup.current.focus();return;}
    requestId.current=`studio_${crypto.randomUUID()}`;
    const params=new URLSearchParams({mode:'phpbb3',areaid:requestId.current,hash:'1',pm:'1',lang:'en',code:'hotlink',forumurl:window.location.origin+'/photo-upload/callback'});
    popup.current=window.open(`https://postimages.org/upload?${params}`,'studiospace-photo-upload');
    if(!popup.current){toast.error('Allow the image upload window, then try again.');return;}
    setWaiting(true);
  }
  return <div className="image-upload-guide"><button type="button" className="button outline small" onClick={upload} disabled={disabled}>{waiting?<LoaderCircle size={17} className="spin"/>:<Upload size={17}/>} {waiting?'Continue your photo upload':'Upload studio photos'}</button><p className="form-fineprint" role="status">{waiting?'Choose your photos in the secure PostImage upload window. They will appear here automatically.':'Select photos with PostImage. Uploaded photos return to this form automatically—no links to copy.'}</p></div>;
}

