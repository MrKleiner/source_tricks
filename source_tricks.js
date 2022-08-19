window.blender_edit_mode = false;
window.preview_mode = false;
window.imgqu = [];
window.current_id = null;

// important todo

// this is needed, because sometimes the browser is trying to restore the scroll position AFTER scrollintoview()
if (window.location.hash != ''){
	if ('scrollRestoration' in window.history) {
	    history.scrollRestoration = 'manual';
	}
}



document.addEventListener('click', event => {
	// console.log('click_registered');

	// holster-unholster
	const img_minimize = event.target.closest('.tut_img_button');
	if (img_minimize) { img_toggler(img_minimize) }

	// magic hat switch
	const hattrick = event.target.closest('.navbar-icon');
	if (hattrick) { activate_edit_mode(event) }

	// enable border
	const enableborder = event.target.closest('.enable_border_checkbox');
	if (enableborder) { enable_border_top(enableborder) }

	// enable border
	const border_suggest = event.target.closest('.border_color_suggestion');
	if (border_suggest) { set_border_top_col(border_suggest, true) }



	// box mover
	const boxmovert = event.target.closest('.article_movetop');
	if (boxmovert) { box_mover(boxmovert, 't') }

	// box mover
	const boxmoverb = event.target.closest('.article_movebot');
	if (boxmoverb) { box_mover(boxmoverb, 'b') }



	// delete preview image
	const imgdel = event.target.closest('.image_deleter');
	if (imgdel) { img_preview_delete(imgdel) }

	// add preview image
	const imgadd = event.target.closest('.image_adder_btn');
	if (imgadd) { img_preview_add(imgadd) }



	// add box
	const boxadd = event.target.closest('.add_box');
	if (boxadd) { add_bbox(boxadd) }

	// delete box
	const boxdel = event.target.closest('.delete_box');
	if (boxdel) { delete_bbox(boxdel, event) }


	// preview page
	const pagepreview = event.target.closest('.preview_page');
	if (pagepreview) { toggle_page_preview() }


	// toggle folder content
	const ftoggler = event.target.closest('.fname_text');
	if (ftoggler) { folder_toggler($(ftoggler).closest('.folder_name'), event, ftoggler) }

	// catalogue manager buttons
	const ctman = event.target.closest('.ctg_button');
	if (ctman) { catalogue_manager(ctman, event) }

	// ctg name editing actuator
	const ectgnames = event.target.closest('.fname_text');
	const ectgnames_t = event.target.closest('.tut_name_text');
	if (ectgnames || ectgnames_t) { ctg_name_actuator(ectgnames || ectgnames_t, event) }




	// wrapper
	const wrapper = event.target.closest('.frmtbtns');
	if (wrapper) { wraptext(wrapper) }

	// saver
	const saveshit = event.target.closest('.cum_on_a_lizard');
	// if (saveshit) { article_compiler() }
	if (saveshit) { article_compiler_py() }



	// penis enlargement
	const pingas = event.target.closest('.tut_step_content img');
	if (pingas) { imgmax(pingas) }

	// breast enlargement (I hate it when girls do this)
	const breasts = event.target.closest('.imgzoom');
	if (breasts) { imgmin() }

	// exit edit mode
	const exitedit = event.target.closest('#exit_edit');
	if (exitedit) { exit_edit_mode() }

	// exit edit mode
	const dostyle = event.target.closest('.word_btn');
	if (dostyle) { exec_command(dostyle) }



});

document.addEventListener('change', event => {
	// console.log('change_registered');

	// set size of the image
	const imgprev_size = event.target.closest('.c_image_size');
	if (imgprev_size) { img_preview_set_size(imgprev_size) }

	// box edit buttons
	// important todo: why the fuck does it trigger the click event TWICE ???????
	const boxedit_local = event.target.closest('label.box_edit_cbox_field input');
	if (boxedit_local) { box_edit_local_btns(boxedit_local.closest('label.box_edit_cbox_field').getAttribute('bxedit_action'), boxedit_local.closest('.tut_step')) }
	// if (fuckoff) { console.log('OH NO') }
});


document.addEventListener('focusout', event => {
	// console.log('focusout_registered');
	// focusout
	// border top colour
	const ctgnames = event.target.closest('.fname_text');
	const ctgnames_t = event.target.closest('.tut_name_text');
	if (ctgnames || ctgnames_t) { ctg_name_bitlocker(ctgnames || ctgnames_t) }
	// $('.fname_text, .tut_name_text').attr('contenteditable', true);
});


document.addEventListener('keypress', event => {
	console.log('kp')
	const fname_apply = event.target.closest('.fname_text');
	const tutname_apply = event.target.closest('.tut_name_text');
	if (fname_apply || tutname_apply) { ctg_name_apply(fname_apply || tutname_apply, event) }

});
















async function jsleep(amt=500) {

	return new Promise(function(resolve, reject){
	    setTimeout(function () {
			resolve(true)
	    }, amt);
	});

}




function imgmax(etgt)
{
	$('.imgzoom').removeClass('e_hidden');
	document.querySelector('body').style.overflow = 'hidden';
	$('.imgzoom img')[0].src = $(etgt)[0].src;
}

function imgmin()
{
	$('.imgzoom').addClass('e_hidden');
	$('.imgzoom img').removeAttr('style');
	document.querySelector('body').style.overflow = 'visible'
}








// ============================================================
// ============================================================
//                          Catalogue
// ============================================================
// ============================================================

// holster/unholster folder
function folder_toggler(etgt, evee, orign)
{
	console.log(orign)
	if(!$(orign)[0].hasAttribute('contenteditable') && !evee.altKey)
	{
		$(etgt).siblings('.folder_content').toggleClass('e_hidden');
		$(etgt).find('.folder_triangle_ico').toggleClass('folder_tri_closed');
	}
}


// binds for buttons, like move up/down, move to, delete, create new page
function catalogue_manager(etgt, evee)
{
	console.log(etgt);

	if($(etgt).attr('fman_act') == 'mv_tut')
	{
		window.func_movelinear = $(etgt).closest('.nav_tutorial');
		$('.ctg_button').addClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').removeClass('e_hidden');
		$(etgt).closest('.nav_tutorial').addClass('folder_mv_hlight');
	}

	if($(etgt).attr('fman_act') == 'mv_fld')
	{
		window.func_movelinear = $(etgt).closest('.nav_folder');
		$('.ctg_button').addClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').removeClass('e_hidden');
		$(etgt).closest('.nav_folder').find('.paste_btn').addClass('e_hidden');
		$(etgt).closest('.nav_folder').addClass('folder_mv_hlight');
	}

	if($(etgt).attr('fman_act') == 'paste_elem')
	{
		$(etgt).closest('.folder_name').siblings('.folder_content').append(window.func_movelinear);
		window.func_movelinear = 'nil';
		$('.ctg_button').removeClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').addClass('e_hidden');
		$('.nav_folder, .nav_tutorial').removeClass('folder_mv_hlight');
	}

	if($(etgt).attr('fman_act') == 'rootpaste')
	{
		$('.nav_stuff_box').append(window.func_movelinear);
		window.func_movelinear = 'nil';
		$('.ctg_button').removeClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').addClass('e_hidden');
	}


	if($(etgt).attr('fman_act') == 'cancel')
	{
		window.func_movelinear = 'nil';
		$('.ctg_button').removeClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').addClass('e_hidden');
		$('.nav_folder, .nav_tutorial').removeClass('folder_mv_hlight');
	}

	if($(etgt).attr('fman_act') == 'del_fld' && evee.altKey)
	{
		$(etgt).closest('.nav_folder').remove();
	}
	if($(etgt).attr('fman_act') == 'del_tut' && evee.altKey)
	{
		$(etgt).closest('.nav_tutorial').remove();
	}

	if($(etgt).attr('fman_act') == 'rootnewdir')
	{
		$('.nav_stuff_box').append(window.folder_htm);
	}

	if($(etgt).attr('fman_act') == 'add_fld')
	{

		$(etgt).closest('.folder_name').siblings('.folder_content').append(window.folder_htm);
	}

	if($(etgt).attr('fman_act') == 'add_tut')
	{
		var today = new Date();
		var rndname = CryptoJS.MD5(today.getTime().toString() + liz3_rndwave(128, 'flac', '')).toString();
		console.log(rndname)
		// console.log(CryptoJS.MD5('shit').toString());
		$(etgt).closest('.folder_name').siblings('.folder_content').append($('<div class="nav_tutorial"><div class="tut_name_text">How to lizard sex</div>' + window.ctg_btns + '</div>').attr('asset_idx', rndname));
	}

	// <div fman_act="shuf" class="ctg_button shuffle_ctg_item">
	//  <div class="shuffle_ctg_item_top"><div class="btnsico"></div></div>
	//  <div class="shuffle_ctg_item_bot"><div class="btnsico"></div></div>
	// </div>
	if($(etgt).attr('fman_act') == 'shuf')
	{
		var chooser = $(etgt).closest('.nav_tutorial')[0] || $(etgt).closest('.nav_folder')[0]
		if(evee.target.closest('.shuffle_ctg_item_top'))
		{
			$(chooser).insertBefore($(chooser).prev())
		}

		if(evee.target.closest('.shuffle_ctg_item_bot'))
		{
			$(chooser).insertAfter($(chooser).next())
		}
	}


	$('.ctg_cancel_operation').removeClass('e_hidden');
}

// lock editing of the folder name
function ctg_name_bitlocker(etgt)
{
	$(etgt).removeAttr('contenteditable');
	$(etgt).text($(etgt).text());
	$(etgt).css('user-select', '');
}

// enable folder name editing
function ctg_name_actuator(etgt, evee)
{
	if(evee.altKey)
	{
		$(etgt).attr('contenteditable', true).focus();
		$(etgt).css('user-select', 'text');
	}else{
		if ($(etgt).hasClass('tut_name_text') && !$(etgt)[0].hasAttribute('contenteditable') && !window.blender_edit_mode)
		{
			// also, set force to true
			article_loader($(etgt).closest('.nav_tutorial').attr('asset_idx'), true, true)
		}
	}
}







function img_toggler(etgt)
{
	// $(etgt).closest('.tut_step').find('img').toggleClass('e_hidden');
	$(etgt).closest('.tut_step').find('.tut_step_content').toggleClass('e_hidden');
	$(etgt).closest('.tut_step').find('.image_adder_btn').toggleClass('e_unclickable');
}




















// ============================================================
// ============================================================
//                           Page load
// ============================================================
// ============================================================

$(document).ready(function(){
	console.log('Document Ready');

	function article_identifier(dt)
	{
		console.timeEnd('Loaded index');
		$('.nav_stuff_box').append(dt);
		// load shit if it was linked to
		var urlParams = new URLSearchParams(window.location.search);
		var load_loc = urlParams.get('lt');
		// if not null (exists) - search for the tut
		if (load_loc != null)
		{
			console.log('URL contains an article id', load_loc);
			// we dont want huge fucking urls. We use every 4th character of an id
			// and hope that there are no collisions...

			// go through every entry in the website index
			// basically, this index thing is also used internally to locate articles
			$('.nav_tutorial').each(function(){

				// downscale it first and then compare to the query
				var string = $(this).attr('asset_idx');
				var downscaled = lizard.delnthchar(string, 4, true)
				// if we found a match - try loading the article
				if (load_loc == downscaled)
				{
					console.log('Found match inside index');
					console.timeEnd('Indexing Done');
					console.groupEnd('Indexing');
					
					article_loader(string)
				}
			});
		}
	}
	console.time('Indexing Done');
	console.groupCollapsed('Indexing');
	console.log('Fetch index');
	console.time('Loaded index');
	fetch('content_index.sex', {
		'headers': {
			'accept': '*/*',
			'cache-control': 'no-cache',
			'pragma': 'no-cache'
		},
		'referrerPolicy': 'strict-origin-when-cross-origin',
		'body': null,
		'method': 'GET',
		'mode': 'cors',
		'credentials': 'omit'
	})
	.then(response => response.text())
	.then(data => article_identifier(data));


/*    xmlDoc = $.parseXML(tml);
	// fuckjq = $(xmlDoc)
	// console.log(fuckjq)
	window.fuckvmix = xmlDoc;
	console.log(xmlDoc);
	
	var pootis = $(xmlDoc).find('inputs[title="28_08_2021_beach_title.xaml"]').end().find('text[name="top_pair"]').text();*/

});





// ============================================================
// ============================================================
//                        Edit mode
// ============================================================
// ============================================================
function ehtml(s)
{
	var shit = document.createElement('div');
	shit.innerHTML = s
	return shit.children[0]
}

function activate_edit_mode(evee)
{

	if (evee.altKey)
	{
		document.body.innerHTML = 
		`
			<div id="broken">
				<div id="imsorry">I broke everything! Wait till I rewrite 3k lines of code!</div>
				<img src="https://cdn.discordapp.com/attachments/679185357325205514/1007063507944083466/IMG_6913.png">
			</div>
		`;
		document.body.id = 'mein_sex';
		document.body.setAttribute('style', null);

		return
	}

	// activate edit mode
	if (evee.shiftKey){
		// precache an icon
		window.exit_icon_cache = cache_image('assets/lambda_w_bg.png');

		// ----------------------------------------
		//   spawn word-like editor on the page
		// ----------------------------------------

		// hide title
		$('.top-navbar').css('display', 'none');

		// shift page content
		$('.page_content').css('margin-top', '100px');

		// create word editor
		var wordbtns = ehtml(`
			<div class="epreview_hide" id="word_editor">
				<div id="exit_edit"></div>
				<div id="word_btns"></div>
				<div id="word_inputs">
					<input type="color" id="word_color_input">
					<input type="text" id="word_text_input">
				</div>
				<img id="article_save_btn" src="assets/btnlol.apng">
			</div>
		`);

		// a dictionary of what each button does and its visual appearence
		var btnlist = [
			{
				'vis': 'Background',
				'sys': 'backColor',
				'add': 'colour'
			},
			{
				'vis': 'Bold',
				'sys': 'bold',
				'add': 'none'
			},
			{
				'vis': 'Make a Link',
				'sys': 'createLink',
				'add': 'text'
			},
			{
				'vis': 'Colour',
				'sys': 'foreColor',
				'add': 'colour'
			},
			{
				'vis': 'Ordered List',
				'sys': 'insertOrderedList',
				'add': 'none'
			},
			{
				'vis': 'Unordered List',
				'sys': 'insertUnorderedList',
				'add': 'none'
			},
			{
				'vis': 'Italic',
				'sys': 'italic',
				'add': 'none'
			},
			{
				'vis': 'Underline',
				'sys': 'underline',
				'add': 'none'
			},
			{
				'vis': 'Remove Format',
				'sys': 'unlink',
				'add': 'none'
			}
		]
		// populate the Word editor box
		for (let bt of btnlist){
			// todo: transfer this to ${}
			var rawbtn = ehtml(`<div class="word_btn">` + bt['vis'] + `</div>`);
			// rawbtn.setAttribute('vis', bt['vis']);
			rawbtn.setAttribute('sys', bt['sys']);
			rawbtn.setAttribute('add', bt['add']);
			wordbtns.querySelector('#word_btns').append(rawbtn);
		};
		// append result to the page
		document.body.append(wordbtns);

		// make stuff editable
		$('.arcl_header_p, .tut_step_head_text').attr('contenteditable', true);

		// append buttons like code, enable/disable border, etc
		for (let box of document.querySelectorAll('.tut_step_head')){
			box.append(ehtml(`
				<div class="at_border_edit_box epreview_hide">

					<label bxedit_action="toggle_border" class="box_edit_cbox_field" id="box_edit_enable_border"><input checked type="checkbox" class="box_edit_enable_border">Enable border</label>

					<label bxedit_action="mark_code" class="box_edit_cbox_field" id="box_edit_iscode">
						<input type="checkbox" class="box_edit_iscode">
						Is Code
					</label>

					<label bxedit_action="mark_vdc_code" class="box_edit_cbox_field" id="box_edit_isvdccode">
						<input type="checkbox" class="box_edit_isvdccode">
						VDC Code
					</label>

					<div class="iliketomoveit">
						<div class="article_movetop"><div class="mv_triangle"></div></div>
						<div class="article_movebot"><div class="mv_triangle"></div></div>
					</div>
					<div class="delete_box">Del</div>
				</div>
			`));
		}
	}

}

function exec_command(c)
{
	if (c.getAttribute('add') == 'colour'){
		document.execCommand(c.getAttribute('sys'), false, document.querySelector('#word_color_input').value.replace('#', ''));
	}
	if (c.getAttribute('add') == 'text'){
		document.execCommand(c.getAttribute('sys'), false, document.querySelector('#word_text_input').value);
	}
	if (c.getAttribute('add') == 'none'){
		document.execCommand(c.getAttribute('sys'), false, null);
	}
	// back to BDSM
	if (c.getAttribute('sys') == 'unlink'){
		document.execCommand('removeFormat', false, null);
	}
	
}


function exit_edit_mode()
{
	// unhide title
	$('.top-navbar, .page_content').removeAttr('style');

	// delete editor
	$('#word_editor').remove();
}


function box_edit_local_btns(action, box)
{
	// enable/disable border
	if (action == 'toggle_border'){
		// important todo: it seems that this is being triggered BEFORE the checkbox setting its state
		let easyswitch = $(box).find('input.box_edit_enable_border')[0].checked ? '5px' : '0px';
		$(box).find('.tut_step_head_text').css('border-width', easyswitch);
		$(box).attr('border_enabled', $(box).find('input.box_edit_enable_border')[0].checked);
	}

	// mark as python code
	if (action == 'mark_code'){
		$(box).attr('iscode', true);
	}

	// mark as vdc code
	if (action == 'mark_vdc_code'){
		$(box).attr('isvdccode', true);
	}
}









function box_mover(etgt, side)
{
	let soolja_box = $(etgt).closest('.tut_step')

	console.log('where is ' + side)
	
	if (side == 't')
	{
		console.log('exec t');
		soolja_box.insertBefore(soolja_box.prev()); 
	}
	
	if (side == 'b')
	{
		console.log('exec b');
		soolja_box.insertAfter(soolja_box.next());  
	}

}





function img_preview_set_size(etgt)
{
	$(etgt).closest('.tut_step_content').find('img').css('width', $(etgt).val());

}

function img_preview_delete(etgt)
{

	$(etgt).closest('.tut_step_content').remove();
}

function img_preview_add(etgt)
{
	// tut_step_content
	$(etgt).before('<div class="tut_step_content"><img class="tut_img" src="">' + window.img_editor + '</div>')
}

function add_bbox(etgt)
{
	var bbox = 
	`
		<div class="tut_step">
			<div class="tut_step_head">
				<p contenteditable class="single_lizrd_looking_for_sex tut_step_head_text">cum</p>
				` + window.border_edit_m + `
			</div>
			<input class="section_name" type="text">
			<div class="image_adder_btn">Add Image</div>
		</div>
	`;

	$('.article_content').append(bbox);
	eval_ebox_margin()

}

function delete_bbox(etgt, evee)
{
	if(evee.altKey)
	{
		$(etgt).closest('.tut_step').remove();
	}
}




















// ============================================================
// ============================================================
//                        Article Loader
// ============================================================
// ============================================================
async function get_article_text(fullid=null)
{
	console.log('Start Loading Article Text');
	console.time('Loaded Article Text');
	if (fullid == null){return null}

	return new Promise(function(resolve, reject){

		// var sex = new URLSearchParams({
		// 	do: ''
		// })

		
		fetch(`content/${fullid}/${fullid}`, {
			'headers': {
				'accept': '*/*',
				'cache-control': 'no-cache',
				'pragma': 'no-cache'
			},
			'method': 'GET',
			'mode': 'cors',
			'credentials': 'omit'
		})
		.then(function(response) {
			// console.log(response.status);
			if (response.status == 404){
				resolve('invalid_url')
				return
			}
			response.json().then(function(data) {
				console.timeEnd('Loaded Article Text');
				console.log('Resulting json:', data);
				resolve(data)
			});
		});
	});
}

// cache image url
async function cache_image(url)
{
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
	            resolve(false);
	        };
	    }
	});
}

async function satisfy_image_queue()
{
	console.groupCollapsed('Image Queue Process');
	for (var im of window.imgqu){
		var imgbox = $(`<div class="tut_step_content"></div>`);
		
		// wait for image to load
		console.time('Loaded Img');
		var theimg = await cache_image(im['content']['imgurl']);
		console.timeEnd('Loaded Img');

		// apply style
		$(theimg).css('width', im['content']['imgsize'] + 'px');

		// append image to the box
		imgbox.append(theimg);
		// create minimize button. The reference element in the image queue is a jQuery object
		// only if it doesnt exist already
		if (im['to'].find('.tut_img_button').length <= 0){
			im['to'].find('.tut_step_head').append('<button class="tut_img_button"></button>');
		}
		
		// append result to the page
		im['to'].append(imgbox);

	}
	window.imgqu = [];
	console.groupEnd();

}


function scroll_to_section(sid=null, dohlight=false)
{
	// only proceed if ID is not empty
	if (sid != '' && sid != null){
		// check it chapter exists on the page
		var sel_chapter = document.getElementById(sid);
		if (sel_chapter != null){

			// scroll it into view

			// a little margin should be fine
			sel_chapter.style.scrollMargin = '30px';
			sel_chapter.scrollIntoView(true);

			// sadly, a little delay is needed			
			jsleep(500)
			.then(function() {
				sel_chapter.style.scrollMargin = null;
			});

			// and then highlight it if asked
			if (dohlight === true){
				sel_chapter.classList.add('hlight');

				// Method 1 - then
				jsleep(500)
				.then(function(response) {
					sel_chapter.classList.add('nohlight');
					sel_chapter.classList.remove('hlight');
				});

				// Method 2 - await
				// await jsleep(600);
				// sel_chapter.classList.add('nohlight');
				// sel_chapter.classList.remove('hlight');
			}

		}else{
			// if requested chapter could not be found - replace hashtag
			console.log('Cannot find chapter', `"${sid}"`, 'on the page. Removing it from the url')
			window.location.hash = '';
			// history.replaceState("", "", location.pathname);
		}
	}
}


// set full to true if full id is being passed
async function article_loader(a_id=null, full=false, force=false)
{
	
	console.time('Full Article Load');
	window.imgqu = [];
	// deal with ids
	if (a_id == null || a_id == undefined || a_id == ''){return null}
	if (full == true){
		a_id = lizard.delnthchar(a_id);
	}

	// set current active id
	window.current_id = a_id;

	// set id to the URL
	var queryParams = new URLSearchParams(window.location.search);
	queryParams.set('lt', lizard.delnthchar(window.current_id, 4, true));
	history.replaceState(null, null, '?'+queryParams.toString() + window.location.hash);

	// first - load the text part
	var atext = await get_article_text(a_id);

	// if not found (404) do nothing
	if (atext == 'invalid_url'){
		// if force is true and article does not exist on server - clear space and dispay error message
		if (force == true){
			$('.arcl_header_p').text('Error: DE-GFAL. (page does not exist)');
			$('.article_content, .rquick_index').empty();
		}
		console.log('Requested article could not be found on server');
		return
	}

	// empty the space and quick index from the right
	$('.article_content, .rquick_index').empty();

	// set title
	$('.arcl_header_p').text(atext['atitle']);




	// --------------------------------
	//       create text boxes
	// --------------------------------
	console.log('Start Spawning Text and Queueing images');
	console.time('Spawned Text, Queued Images');
	for (var tbox of atext['boxes']){
		// TESTING
		// await jsleep(1000);

		// id mismatch = switched articles mid load. Abort
		if (a_id != window.current_id){
			console.log('id mismatch:', 'working for', a_id, 'but current is', window.current_id);
			return null
		};


		// raw box html
		var emptybox = $(`
			<div class="tut_step">
				<div class="tut_step_head">
					<div class="tut_step_head_text"></div>
				</div>
			</div>
		`);

		// set text
		emptybox.find('.tut_step_head_text').html(tbox['text']);

		// set border style
		emptybox.find('.tut_step_head_text').css({
			'border-color': tbox['border_c'],
			'border-width': tbox['border_w']
		});

		// quick index, if any
		if (tbox['chapter'] != ''){
			// if there's a chapter - set id for the box
			$(emptybox).attr('id', tbox['chapter']);
			$('.rquick_index').append('<a href="#' + tbox['chapter'] + '" class="rqindex_item">' + tbox['chapter'] + '</a>');
		}

		// queue images
		for (var q_img of tbox['contents']){
			// just to be safe: Break here too if ID mismatch
			if (a_id != window.current_id){return null};

			window.imgqu.push({
				'to': emptybox,
				'content': q_img
			});
		}

		// append box to the page
		$('.article_content').append(emptybox);

		// highlight code, if needed
		// only works after the element was appended to the page
		if (tbox['iscode'] == true){
			// do a little trick to get rid of html elements
			let boxtext = emptybox.find('.tut_step_head_text')[0];
			boxtext.textContent = boxtext.innerText;

			boxtext.classList.add('language-python');
			// todo: this has to be a class
			boxtext.style.fontFamily = 'consola';
			hljs.highlightElement(boxtext);
		}

	}
	activate_edit_mode({shiftKey: true})
	console.timeEnd('Spawned Text, Queued Images');





	// --------------------------------
	//       Spawn images (media)
	// --------------------------------
	console.time('Satisfied Image Queue');
	await satisfy_image_queue()
	console.timeEnd('Satisfied Image Queue');





	// --------------------------------
	//       	 Finalize
	// --------------------------------

	// Set body width accounting the quick index width
	$('body').css('min-width', 1360 + $('.rquick_index').outerWidth(true));

	// scroll into view
	var scroll_id = decodeURI(window.location.hash).replace('#', '');
	scroll_to_section(scroll_id, true)


	console.timeEnd('Full Article Load');
}





