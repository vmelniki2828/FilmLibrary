const e=document.querySelector(".movies"),t=document.querySelector(".form"),o=document.querySelector(".form>input"),n=document.querySelector(".form>select"),i=[{id:28,name:"Action"},{id:12,name:"Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},{id:14,name:"Fantasy"},{id:36,name:"History"},{id:27,name:"Horror"},{id:10402,name:"Music"},{id:9648,name:"Mystery"},{id:10749,name:"Romance"},{id:878,name:"Science Fiction"},{id:10770,name:"TV Movie"},{id:53,name:"Thriller"},{id:10752,name:"War"},{id:37,name:"Western"}];function a(t){fetch(t).then((e=>e.json())).then((t=>{var o;o=t.results,e.innerHTML="",o.map((t=>{const{title:o,poster_path:n,vote_average:a,genre_ids:r,release_date:l}=t,s=document.createElement("li");s.classList.add("movie_card"),s.innerHTML=`\n        <img class="movie__img" src="${"https://image.tmdb.org/t/p/w500"+n}" alt="${o}">\n        <h3 class="movie_title">${o}</h3>\n        <div class="movie_info">\n            <span class="movie_genre">${function(e){let t=[];return i.map((o=>{t.length>=3?t=[t[0],t[1],"other"]:e.includes(o.id)&&t.push(o.name)})),t}(r)+" | "+l.slice(0,4)}</span>\n\n            <span class="movie_vote">${a}</span>\n\n        </div>\n        `,e.appendChild(s)}))}))}a("https://api.themoviedb.org/3/discover/movie?api_key=a860cfd897e99827a5ea5e5210690a78"),function(e){n.innerHTML="";const t=document.createElement("option");t.setAttribute("value",""),t.setAttribute("selected",""),t.innerHTML="All ganres:",n.appendChild(t),e.map((e=>{const t=document.createElement("option");t.setAttribute("value",e.id),t.innerHTML=`${e.name}`,n.appendChild(t)}))}(i),t.addEventListener("submit",(e=>{e.preventDefault();const t=o.value;console.log(t),t&&a(""+("https://api.themoviedb.org/3/search/movie?api_key=a860cfd897e99827a5ea5e5210690a78&query="+t))}));const r={blockSlider:document.querySelector(".header__switch"),slider:document.querySelector(".slider"),movieTitleColor:document.querySelector(".movies")};r.blockSlider.addEventListener("click",(function(){document.documentElement.style.transition="background-color 0.6s ease, color 0.6s ease",r.movieTitleColor.style.transition="color 0.6s ease",r.slider.style.transition="transform 0.6s ease","rgb(40, 47, 53)"===getComputedStyle(document.documentElement).backgroundColor?(document.documentElement.style.backgroundColor="#ffffff",r.movieTitleColor.style.color="#000",r.slider.style.transform="translateX(0)",localStorage.setItem("darkMode",!1)):(document.documentElement.style.backgroundColor="#282f35",r.movieTitleColor.style.color="#fff",r.slider.style.transform="translateX(26px)",localStorage.setItem("darkMode",!0))})),window.onload=function(){const e="true"===localStorage.getItem("darkMode");r.slider.style.transition="transform 0.6s ease",e?(document.documentElement.style.backgroundColor="#282f35",r.movieTitleColor.style.color="#fff",r.slider.style.transform="translateX(26px)"):(document.documentElement.style.backgroundColor="#ffffff",r.movieTitleColor.style.color="#000",r.slider.style.transform="translateX(0)")};try{var l=Object.defineProperty({},"passive",{get:function(){!0}});window.addEventListener("testPassive",null,l),window.removeEventListener("testPassive",null,l)}catch(e){}"".concat('[data-glide-el^="controls"]',' [data-glide-dir*="<"]'),"".concat('[data-glide-el^="controls"]',' [data-glide-dir*=">"]');const s=document.querySelector(".glide__slides");console.log(s),fetch("https://api.themoviedb.org/3/discover/movie?api_key=7b497d31082fcfae4cc74000cae47751").then((e=>e.json())).then((e=>{e.results.map((e=>{const{poster_path:t,title:o}=e,n=document.createElement("li");n.classList.add("glide__slide"),n.innerHTML=`\n        <img class="slider__img" src="${"https://image.tmdb.org/t/p/w500"+t}" alt="${o}" width="175px">`,s.appendChild(n)}))}));
//# sourceMappingURL=index.03697724.js.map