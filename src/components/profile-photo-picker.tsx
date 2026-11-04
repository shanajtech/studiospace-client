'use client';
import { useRef,useState,type ChangeEvent } from 'react';
import { Camera,UserRound,LoaderCircle,X } from 'lucide-react';
import { toast } from 'sonner';

export function ProfilePhotoPicker({disabled,onBusyChange}:{disabled:boolean;onBusyChange:(busy:boolean)=>void}){
  const input=useRef<HTMLInputElement>(null);
  const [photo,setPhoto]=useState(''),[filename,setFilename]=useState(''),[processing,setProcessing]=useState(false),[error,setError]=useState('');
  async function choose(event:ChangeEvent<HTMLInputElement>){
    const file=event.currentTarget.files?.[0];event.currentTarget.value='';if(!file)return;
    setError('');
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)){setError('Choose a JPG, PNG or WebP photo.');return;}
    if(file.size>5*1024*1024){setError('Choose a photo smaller than 5 MB.');return;}
    setProcessing(true);onBusyChange(true);
    let bitmap:ImageBitmap|undefined;
    try{
      bitmap=await createImageBitmap(file);
      if(!bitmap.width||!bitmap.height||bitmap.width*bitmap.height>40000000)throw new Error('Choose a photo up to 40 megapixels.');
      const scale=Math.min(1,256/Math.max(bitmap.width,bitmap.height));
      const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));
      const context=canvas.getContext('2d');if(!context)throw new Error('Your browser could not prepare this photo.');
      context.fillStyle='#ffffff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(bitmap,0,0,canvas.width,canvas.height);
      let result='';for(const quality of [.85,.7,.55]){result=canvas.toDataURL('image/jpeg',quality);if(result.length<=80000)break;}
      if(!result.startsWith('data:image/jpeg;base64,')||result.length>80000)throw new Error('This photo could not be reduced. Please choose another photo.');
      setPhoto(result);setFilename(file.name);toast.success('Profile photo selected.');
    }catch(e){setError(e instanceof Error&&/Choose|browser|reduced/.test(e.message)?e.message:'This image could not be opened. Choose a valid JPG, PNG or WebP photo.');}
    finally{bitmap?.close();setProcessing(false);onBusyChange(false);}
  }
  return <fieldset className="profile-photo-field"><legend>Profile photo <small>(optional)</small></legend><input name="image" type="hidden" value={photo}/><input ref={input} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Choose profile photo file" hidden onChange={event=>void choose(event)} disabled={disabled||processing}/><div className="profile-photo-controls"><div className="profile-photo-preview">{photo?<img src={photo} alt="Selected profile photo"/>:<UserRound size={29} aria-hidden="true"/>}</div><div><button type="button" className="button outline small" disabled={disabled||processing} onClick={()=>input.current?.click()}>{processing?<LoaderCircle size={16} className="spin"/>:<Camera size={16}/>} {processing?'Preparing photo…':photo?'Change photo':'Choose photo'}</button>{photo&&<button type="button" className="text-link remove-profile-photo" disabled={disabled||processing} onClick={()=>{setPhoto('');setFilename('');setError('');}}><X size={13}/>Remove photo</button>}</div></div><p className="form-fineprint" aria-live="polite">{filename||'JPG, PNG or WebP. Maximum 5 MB.'}</p>{error&&<p className="form-error" role="alert">{error}</p>}</fieldset>;
}

