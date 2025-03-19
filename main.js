if(typeof page_st !== "undefined"){
const s_host = 'https://binamelato.github.io/stickersforElement/';
const jsonUrl = s_host+'library.json';
head_mod = document.querySelector('#stick_head');
body_mod = document.querySelector('#stick_body');
const wih = Math.floor(document.documentElement.scrollWidth / 4);//ширина исходя из размера страниы
	
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
				tabsStick.insertAdjacentHTML('beforeend','<div class="stickers" style="width:'+wih+';height:'+wih+'"><img id="'+j+'" src="'+s_url+'/'+j+'.webp" onclick="sendSticker(this.src)"></div>');
			}		
			head_mod.insertAdjacentHTML('beforeend','<div class="stick_h -act" style="width:'+wih+';height:'+wih+'"><img src="'+s_url+'/1.webp"></div>');
		}else{
			var n = 17;	//брать из json	
			body_mod.insertAdjacentHTML('beforeend','<div id="t'+l+'" class="tabs"></div>');
			var tabsStick = document.querySelector('#t'+l);
			for(j=1;j<=n;j++){					
				tabsStick.insertAdjacentHTML('beforeend','<div class="stickers" style="width:'+wih+';height:'+wih+'"><img id="'+j+'" src="'+s_url+'/'+j+'.webp" onclick="sendSticker(this.src)"></div>');
			}		
			head_mod.insertAdjacentHTML('beforeend','<div class="stick_h" style="width:'+wih+';height:'+wih+'"><img src="'+s_url+'/1.webp"></div>');
		}
		
		massTabs = document.querySelectorAll(".stick_h");
		myArray = [...massTabs];
		Array.from(massTabs, el => el.addEventListener('click', e => {tabsClick(e);}));
	}
	
	
	function tabsClick(e){		
		tabsNow = e.target;
		tabsCont = tabsNow.classList.contains('stick_h');
		if(tabsCont == true){
			tTrue = tabsNow.classList.contains('-act');
			if(tTrue == true){}else{
				tabActive = document.querySelector(".-active");
				if(tabActive){
					tabActive.classList.remove('-act');
					tabsNow.classList.add('-act');
					/*					
					panelTab = body_mod.querySelectorAll(".tabs");
					var tempPerch = myArray.indexOf(tabsNow);					
					tempTab = panelTab[tempPerch];	
					
					panelActive = document.querySelector(".-active");
					panelActive.classList.remove('-active');
					
					var statusTab = tempTab.classList.contains('-active');
					if(statusTab == false){
						tempTab.classList.toggle('-active');						
					}
					*/
				}									
			}
		}else{//если картинка ищем родителя
			getParentTabs = tabsNow.parentElement;//получаем родителя
			tabsCont = getParentTabs.classList.contains('-act');//активен ли набор?
			if(tabsCont == true){}else{//если да, ничего не делаем, иначе
				tabActive = document.querySelector(".-act");
				if(tabActive){
					tabActive.classList.remove('-act');
					getParentTabs.classList.add('-act');	
					
					panelTab = body_mod.querySelectorAll(".tabs");
					var tempPerch = myArray.indexOf(getParentTabs);
					tempTab = panelTab[tempPerch];	
					
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
	
	function sendSticker(imageUrl){
    // Получите токен доступа и идентификатор комнаты
    const accessToken = 'syt_a2FkYW50b3I_TZhfIYTHiMetZZdIVlZN_14lv5H'; // Замените на реальный токен
    const roomId = '!mTTbTxfdkDVWuwOqzW'; // Замените на реальный идентификатор комнаты
	//!mTTbTxfdkDVWuwOqzW:VCMat
    // Создайте объект с данными для отправки
    const content = {
        msgtype: "m.image",
        url: imageUrl,
        body: "Sticker",
        info: {
            mimetype: "image/webp",
            w: 150, // ширина изображения
            h: 150 // высота изображения
        }
    };

    // Отправьте запрос на сервер Matrix
    fetch(`https://matrix.server.name/_matrix/client/r0/rooms/${encodeURIComponent(roomId)}/send/m.room.message`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sticker sent successfully:', data);
    })
    .catch(error => {
        console.error('Error sending sticker:', error);
    });
}

readJsonFromUrl(jsonUrl);
}