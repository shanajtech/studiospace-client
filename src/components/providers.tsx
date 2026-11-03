'use client';
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { Toaster } from 'sonner';
import { api } from '@/lib/api';
import type { User } from '@/lib/types';
type Session = {user:User|null;loading:boolean;error:string;refresh:()=>Promise<void>;logout:()=>Promise<void>};
const SessionContext = createContext<Session>({user:null,loading:true,error:'',refresh:async()=>{},logout:async()=>{}});
export const useSession = ()=>useContext(SessionContext);
export function Providers({children}:{children:ReactNode}){
  const [user,setUser]=useState<User|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
  const refresh=useCallback(async()=>{setError('');try{const result=await api<{user:User|null}>('/session');setUser(result.user);}catch(e){setError((e as Error).message);}finally{setLoading(false);}},[]);
  useEffect(()=>{void refresh();const timer=setInterval(()=>void refresh(),10*60*1000);const focus=()=>void refresh();window.addEventListener('focus',focus);return()=>{clearInterval(timer);window.removeEventListener('focus',focus);};},[refresh]);
  const logout=async()=>{await api('/auth/sign-out',{method:'POST',body:'{}'});await api('/session/logout',{method:'POST',body:'{}'});setUser(null);window.location.assign('/');};
  return <SessionContext.Provider value={{user,loading,error,refresh,logout}}>{children}<Toaster richColors position="top-right" closeButton /></SessionContext.Provider>;
}
