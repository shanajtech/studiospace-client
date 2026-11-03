export async function api<T>(path:string, options:RequestInit = {}):Promise<T> {
  const headers = new Headers(options.headers);
  if(options.body && !(options.body instanceof FormData)) headers.set('Content-Type','application/json');
  const response = await fetch(`/api${path}`, { ...options, headers, credentials:'include', cache:'no-store' });
  const data = await response.json().catch(()=>({error:'The service is temporarily unavailable. Please try again.'}));
  if(!response.ok) throw new Error(data.error || data.message || 'We could not complete this request.');
  return data;
}
export function safeReturn(path:string|null) {return path?.startsWith('/') && !path.startsWith('//') && !path.includes('\\') ? path : '/';}
