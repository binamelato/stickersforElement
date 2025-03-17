if(typeof page_st !== "undefined"){
	
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
				console.log(json.length);
				console.log(json[1]);				
				for(i=0;i<json.length;i++){					
					tabsStickers(json[i]);
				}
            }else{
                console.error('Ожидался массив JSON');
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке JSON', error);
        });
	}
	function tabsStickers(e){
		//получаем ссылку на папку со стикерами
		s_url = s_host + e;
		console.log(s_url);
		//строим массив изображений исходя из кол-ва стикеров в папке
		//taffi 34
		var n = 34;		
		for(j=1;j<=n;j++){					
			body_mod.insertAdjacentHTML('beforeend','<img id="'+j+'" src="'+s_url+'/'+j+'.webp">');
		}
		//строим вкладки на странице
		head_mod.insertAdjacentHTML('beforeend','<div><img id="" src="'+s_url+'/1.webp"></div>');
		
	}

// Укажите URL вашего JSON файла
//const jsonUrl = 'https://example.com/path/to/your/file.json';
const s_host = 'https://binamelato.github.io/stickersforElement/';
const jsonUrl = s_host+'library.json';
head_mod = document.querySelector('#stick_head');
body_mod = document.querySelector('#stick_body');

readJsonFromUrl(jsonUrl);
}