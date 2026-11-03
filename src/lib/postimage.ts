/** Read only image URLs, never execute or render provider-supplied markup. */
export function parsePostImageResult(encoded:string):string[] {
  if(encoded.length>100000)throw new Error('Upload response is too large.');
  const markup=decodeURIComponent(encoded);
  const candidates=Array.from(markup.matchAll(/\[img\](https:\/\/i\.postimg\.cc\/[^\s\[\]<>"']+)\[\/img\]/gi),match=>match[1]);
  return [...new Set(candidates)].filter(value=>{
    try{const url=new URL(value);return url.protocol==='https:'&&url.hostname==='i.postimg.cc'&&!url.username&&!url.password;}catch{return false;}
  });
}

