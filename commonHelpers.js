import{S as p,i as l}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const u=document.querySelector(".form-seach"),c=document.querySelector(".gallery-images"),a=document.querySelector(".loader"),m="41909271-8b5dab2225a1cd5a9757159a5";a.style.display="none";u.addEventListener("submit",h);function f(o){if(!o.ok)throw new Error(o.status);return o.json()}function y(o){return a.style.display="inline-block",fetch("https://pixabay.com/api/?key="+m+"&q="+o+"&image_type=photo&orientation=horizontal&safesearch=true&per_page=9").then(f)}const d=new p(".gallery-images a",{captionDelay:250});function h(o){o.preventDefault(),a.style.display="block",c.innerHTML="";const r=o.currentTarget,n=r.elements.query.value;if(!n){l.show({title:"error",messageColor:"white",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter",color:"red"}),a.style.display="none";return}console.log(n),y(n).then(s=>{const e=s.hits;if(!s.total){l.show({title:"error",messageColor:"white",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter",color:"red"});return}let t="";for(const i of e)t+=g(i);c.innerHTML=t,d.refresh(),console.log(t)}).catch(s=>console.log(s)).finally(()=>{r.reset(),a.style.display="none"})}function g({webformatURL:o,largeImageURL:r,tags:n,likes:s,views:e,comments:t,downloads:i}){return`<li class = "list-item">
    <a href="${r}" ><img class="search-image" src = "${o}" alt = "${n}" ><div class="options">
    <p class="options-item"> likes:<span class="options-item-span">${s}</span></p>
    <p class="options-item"> views:<span class="options-item-span">${e}</span></p>
    <p class="options-item"> comments:<span class="options-item-span">${t}</span></p>
    <p class="options-item"> downloads:<span class="options-item-span">${i}</span></p></div>
  
    </a>
    
    </li>`}
//# sourceMappingURL=commonHelpers.js.map
