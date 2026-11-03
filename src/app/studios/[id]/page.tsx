import { StudioDetail } from '@/components/studio-detail';
export default async function Page({params}:{params:Promise<{id:string}>}){const{id}=await params;return <StudioDetail id={id}/>;}
