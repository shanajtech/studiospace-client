'use client';
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { Toaster } from 'sonner';
import { api } from '@/lib/api';
import type { User,Studio } from '@/lib/types';
type Session = {user:User|null;loading:boolean;error:string;refresh:()=>Promise<void>;logout:()=>Promise<void>;savedStudios:Studio[];wishlistLoading:boolean;wishlistError:string;reloadWishlist:()=>Promise<void>;toggleSaved:(studio:Studio)=>Promise<boolean>};
const SessionContext = createContext<Session>({user:null,loading:true,error:'',refresh:async()=>{},logout:async()=>{},savedStudios:[],wishlistLoading:true,wishlistError:'',reloadWishlist:async()=>{},toggleSaved:async()=>false});
export const useSession = ()=>useContext(SessionContext);
export function Providers({children}:{children:ReactNode}){
  const [user,setUser]=useState<User|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
  const [savedStudios,setSavedStudios]=useState<Studio[]>([]),[wishlistLoading,setWishlistLoading]=useState(true),[wishlistError,setWishlistError]=useState('');
  const userId=user?.id;
  const reloadWishlist=useCallback(async()=>{if(!userId){setSavedStudios([]);setWishlistLoading(false);setWishlistError('');return;}setWishlistLoading(true);setWishlistError('');try{setSavedStudios(await api<Studio[]>('/me/wishlist'));}catch(e){setWishlistError((e as Error).message);}finally{setWishlistLoading(false);}},[userId]);
  useEffect(()=>{void reloadWishlist();},[reloadWishlist]);
  const toggleSaved=async(studio:Studio)=>{if(!user)throw new Error('Sign in to save studios.');if(wishlistError)throw new Error('Saved studios could not be loaded. Open Saved studios and try again.');const saved=savedStudios.some(item=>item._id===studio._id);await api(`/me/wishlist/${studio._id}`,{method:saved?'DELETE':'PUT'});setSavedStudios(items=>saved?items.filter(item=>item._id!==studio._id):[studio,...items.filter(item=>item._id!==studio._id)]);return !saved;};
  const refresh=useCallback(async()=>{setError('');try{const result=await api<{user:User|null}>('/session');setUser(result.user);}catch(e){setError((e as Error).message);}finally{setLoading(false);}},[]);
  useEffect(()=>{void refresh();const timer=setInterval(()=>void refresh(),10*60*1000);const focus=()=>void refresh();window.addEventListener('focus',focus);return()=>{clearInterval(timer);window.removeEventListener('focus',focus);};},[refresh]);
  const logout=async()=>{await api('/auth/sign-out',{method:'POST',body:'{}'});await api('/session/logout',{method:'POST',body:'{}'});setUser(null);window.location.assign('/');};
  return <SessionContext.Provider value={{user,loading,error,refresh,logout,savedStudios,wishlistLoading,wishlistError,reloadWishlist,toggleSaved}}>{children}<Toaster richColors position="top-right" closeButton /></SessionContext.Provider>;
}

