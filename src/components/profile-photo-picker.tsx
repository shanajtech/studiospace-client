'use client';
import { useRef,useState,type ChangeEvent } from 'react';
import { Camera,LoaderCircle,X } from 'lucide-react';
import { toast } from 'sonner';

export function ProfilePhotoPicker({formId,disabled,onBusyChange}:{formId:string;disabled:boolean;onBusyChange:(busy:boolean)=>void}){
  const input=useRef<HTMLInputElement>(null);
  const [photo,setPhoto]=useState(''),[processing,setProcessing]=useState(false),[error,setError]=useState('');
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
      setPhoto(result);toast.success('Profile photo selected.');
    }catch(e){setError(e instanceof Error&&/Choose|browser|reduced/.test(e.message)?e.message:'This image could not be opened. Choose a valid JPG, PNG or WebP photo.');}
    finally{bitmap?.close();setProcessing(false);onBusyChange(false);}
  }
  return <fieldset className="profile-photo-field auth-photo-picker"><legend className="sr-only">Profile photo (optional)</legend><input name="image" form={formId} type="hidden" value={photo}/><input ref={input} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Choose profile photo file" hidden onChange={event=>void choose(event)} disabled={disabled||processing}/><button type="button" className="auth-photo-button" aria-label={photo?'Change photo':'Choose photo'} title="Choose a profile photo (optional). JPG, PNG or WebP, up to 5 MB." disabled={disabled||processing} onClick={()=>input.current?.click()}>{processing?<LoaderCircle size={34} className="spin"/>:photo?<img src={photo} alt="Selected profile photo"/>:<Camera size={38}/>}</button><span className="auth-photo-caption" aria-live="polite">{processing?'Preparing photo…':photo?'Change photo':'Choose photo · optional'}</span>{photo&&<button type="button" className="auth-photo-remove" aria-label="Remove photo" title="Remove photo" disabled={disabled||processing} onClick={()=>{setPhoto('');setError('');}}><X size={13}/></button>}{error&&<p className="form-error" role="alert">{error}</p>}</fieldset>;
}

