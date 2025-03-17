if(typeof page_st !== "undefined"){
//const jsonUrl = 'https://example.com/path/to/your/file.json';
const s_host = 'https://binamelato.github.io/stickersforElement/';
const jsonUrl = s_host+'library.json';
head_mod = document.querySelector('#stick_head');
body_mod = document.querySelector('#stick_body');
	
	
	function readJsonFromUrl(url){
    fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(json => {
            // Предполагается, что json - это массив
            if(Array.isArray(json)){
				//console.log(json.length);
				//console.log(json[1]);				
				for(i=0;i<json.length;i++){					
					tabsStickers(json[i], json[i], i);
				}
            }else{
                console.error('Ожидался массив JSON');
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке JSON', error);
        });
	}
	function tabsStickers(e,d,l){		
		s_url = s_host + e; //получаем ссылку на папку со стикерами
		//строим массив изображений исходя из кол-ва стикеров в папке taffi 34, test 17
		if(l == 0){
			var n = 34;	//брать из json	
			body_mod.insertAdjacentHTML('beforeend','<div id="t'+l+'" class="tabs -active"></div>');
			var tabsStick = document.querySelector('#t0'); 
			for(j=1;j<=n;j++){					
				tabsStick.insertAdjacentHTML('beforeend','<div class="stickers"><img id="'+j+'" src="'+s_url+'/'+j+'.webp"></div>');
			}		
			head_mod.insertAdjacentHTML('beforeend','<div class="stick_h -act"><img src="'+s_url+'/1.webp"></div>');
		}else{
			var n = 17;	//брать из json	
			body_mod.insertAdjacentHTML('beforeend','<div id="t'+l+'" class="tabs"></div>');
			var tabsStick = document.querySelector('#t'+l);
			for(j=1;j<=n;j++){					
				tabsStick.insertAdjacentHTML('beforeend','<div class="stickers"><img id="'+j+'" src="'+s_url+'/'+j+'.webp"></div>');
			}		
			head_mod.insertAdjacentHTML('beforeend','<div class="stick_h"><img src="'+s_url+'/1.webp"></div>');
		}
		
		massTabs = document.querySelectorAll(".stick_h");
		myArray = [...massTabs];
		Array.from(massTabs, el => el.addEventListener('click', e => {tabsClick(e);}));
	}
	
	
	function tabsClick(e){		
		tabsNow = e.target;
		//console.log(tabsNow);
		tabsCont = tabsNow.classList.contains('stick_h');
		if(tabsCont == true){
			tTrue = tabsNow.classList.contains('-act');
			if(tTrue == true){}else{
				tabActive = document.querySelector(".-active");
				if(tabActive){
					tabActive.classList.remove('-active');
					tabsNow.classList.add('-active');
					/*					
					panelTab = document.querySelectorAll(".panelT");
					var tempPerch = myArray.indexOf(tabsNow);					
					tempTab = panelTab[tempPerch];					
					panelActive = document.querySelector(".-visible");
					panelActive.classList.remove('-visible');
					var statusTab = tempTab.classList.contains('-visible');
					if(statusTab == false){
						tempTab.classList.toggle('-visible');						
					}
					*/
				}									
			}
		}else{//если картинка ищем родителя
			getParentTabs = tabsNow.parentElement;//получаем родителя
			console.log(getParentTabs);
			tabsCont = getParentTabs.classList.contains('-act');//активен ли набор?
			if(tabsCont == true){}else{//если да, ничего не делаем, иначе
				tabActive = document.querySelector(".-act");
				if(tabActive){
					console.log(tabActive);
					tabActive.classList.remove('-act');
					getParentTabs.classList.add('-act');	
					
					panelTab = body_mod.querySelectorAll(".tabs");
					var tempPerch = myArray.indexOf(getParentTabs);
					tempTab = panelTab[tempPerch];	
					console.log(tempTab);
					
					panelActive = document.querySelector(".-active");
					panelActive.classList.remove('-active');
					
					
					var statusTab = tempTab.classList.contains('-active');
					if(statusTab == false){
						tempTab.classList.toggle('-active');						
					}
					
				}					
			}
		}
	}

readJsonFromUrl(jsonUrl);
}