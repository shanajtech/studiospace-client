'use client';
import { useState } from 'react';
import { Download,LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
export function InvoiceButton({id}:{id:string}){const[busy,setBusy]=useState(false);
  async function download(){setBusy(true);try{const response=await fetch(`/api/bookings/${id}/invoice`,{credentials:'include',cache:'no-store'});if(!response.ok){const data=await response.json().catch(()=>({}));throw new Error(data.error||'Your invoice could not be downloaded. Please try again.');}if(!response.headers.get('content-type')?.includes('application/pdf'))throw new Error('The invoice service returned an unexpected response.');const blob=await response.blob();const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=`StudioSpace-invoice-${id}.pdf`;document.body.appendChild(link);link.click();link.remove();window.setTimeout(()=>URL.revokeObjectURL(url),30000);toast.success('Your booking invoice is ready.');}catch(e){toast.error((e as Error).message);}finally{setBusy(false);}}
  return <button type="button" className="button outline small" disabled={busy} onClick={()=>void download()}>{busy?<LoaderCircle size={16} className="spin"/>:<Download size={16}/>} {busy?'Preparing PDF…':'Download invoice'}</button>;
}

