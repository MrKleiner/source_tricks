
if (!window.bootlegger){window.bootlegger = {}};

if (!window.bootlegger.core){window.bootlegger.core={}};


const print = console.log;
const obj_url = (window.URL || window.webkitURL); 


// get index info of a certain article
// index contains the amount of blocks and other useful info, like aricle name
window.bootlegger.core.get_article_index = async function(article_id)
{
	const request = await fetch(`/content/articles/${article_id}/index.sex`, {
		'headers': {
			'accept': '*/*',
			'cache-control': 'no-cache',
			'pragma': 'no-cache'
		},
		'method': 'GET',
		'mode': 'cors',
		'credentials': 'omit'
	})
	// response.status == 404
	// response.json()
	if (request.ok != true){
		return false
	}

	const got_shit = await request.json()
	return got_shit
}

// each article is split into individual boxes
// this function returns a json of a said block
window.bootlegger.core.get_article_unit = async function(article_id, unit_id)
{
	const request = await fetch(`/content/articles/${article_id}/units/${unit_id}.bdsm`, {
		'headers': {
			'accept': '*/*',
			'cache-control': 'no-cache',
			'pragma': 'no-cache'
		},
		'method': 'GET',
		'mode': 'cors',
		'credentials': 'omit'
	})
	const got_shit = await request.json()
	return got_shit
}

window.bootlegger.core.maximize_image = function(img)
{
	$('body > #img_fullscreen').remove();
	$('body').append(`
		<img id="img_fullscreen" src="${img.src}">
	`)
}

window.bootlegger.core.remove_fullscreen_img = function()
{
	$('body > #img_fullscreen').remove();
}

// cache an image
window.bootlegger.core.await_img_buffer = async function(url){
	return new Promise(function(resolve, reject){
	    const img = new Image();
	    img.src = url;

	    if (img.complete) {
	        resolve(img);
	    } else {
	        img.onload = () => {
	            resolve(img);
	        };

	        img.onerror = () => {
	            // todo: error handling
	            img.src = '';
	            resolve(img);
	        };
	    }
	});
}

// full article loader
window.bootlegger.core.article_loader = async function(article_id)
{
	console.time('Full Article Load')

	const article_index = await window.bootlegger.core.get_article_index(article_id)

	print(article_index)

	$('#article_blocks').empty()

	// display an error if article does not exist
	if (article_index == false){
		$('#article #article_header').text('Fatal Error: DE-GFAL. (page does not exist)')
		return
	}

	// show title
	$('#article #article_header').text(article_index.atitle)

	// load units one by one
	for (let unit of range(article_index.unit_count)){
		var block = await window.bootlegger.core.get_article_unit(article_id, unit)
		
		print('loaded a block:', block)

		// Each block is of a certain type
		// The blocks modules contains evaluators from them
		// The block type in the block json corresponds to the function name in the blocks module
		if(block.utype in window.bootlegger.blocks){
			await window.bootlegger.blocks[block.utype](block)
		}else{
			print('Unknown block type:', block.utype)
		}
	}

	console.timeEnd('Full Article Load')
}


















