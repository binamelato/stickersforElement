if (typeof page_st !== "undefined") {
	
	function readJsonFromUrl(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(json => {
            console.log(json);

            // Предполагается, что json - это массив
            if (Array.isArray(json)) {
				console.log(json);
               /* document.querySelector("#val1").value = json[0] || '';
                document.querySelector("#val2").value = json[1] || '';
                document.querySelector("#val3").value = json[2] || '';
                document.querySelector("#homuch").value = json[3] || '';
                document.querySelector("#drivers").value = json[4] || '';
                document.querySelector("#dayWeek").value = json[5] || '';*/
            } else {
                console.error('Ожидался массив JSON');
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке JSON', error);
        });
	}

// Укажите URL вашего JSON файла
//const jsonUrl = 'https://example.com/path/to/your/file.json';
const jsonUrl = './library.json';
readJsonFromUrl(jsonUrl);
}