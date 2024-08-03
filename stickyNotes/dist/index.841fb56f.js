let e=document.getElementById("color"),t=document.getElementById("createBtn"),n=document.getElementById("list");t.onclick=()=>{let t=document.createElement("div");t.classList.add("note"),t.innerHTML=`
    <span class="close">x</span>
    <textarea
    placeholder="Write Content..."
    rows="10"
    cols="30"></textarea>`,t.style.borderColor=e.value,t.style.position="absolute",n.appendChild(t)},document.addEventListener("click",e=>{e.target.classList.contains("close")&&e.target.parentNode.remove()});let l={x:null,y:null},o={dom:null,x:null,y:null};document.addEventListener("mousedown",e=>{e.target.classList.contains("note")&&(l={x:e.clientX,y:e.clientY},o={dom:e.target,x:e.target.getBoundingClientRect().left,y:e.target.getBoundingClientRect().top})}),document.addEventListener("mousemove",e=>{if(null==o.dom)return;let t={x:e.clientX,y:e.clientY},n={x:t.x-l.x,y:t.y-l.y};o.dom.style.left=o.x+n.x+"px",o.dom.style.top=o.y+n.y+"px",o.dom.style.cursor="grab"}),document.addEventListener("mouseup",()=>{null!=o.dom&&(o.dom.style.cursor="auto",o.dom=null)});
//# sourceMappingURL=index.841fb56f.js.map
