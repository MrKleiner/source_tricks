window.blender_edit_mode = false;
window.preview_mode = false;
window.imgqu = [];
window.current_id = null;
window.edit_preview_mode = false;
window.boxes_code_storage = [];

// important todo

// this is needed, because sometimes the browser is trying to restore the scroll position AFTER scrollintoview()
if (window.location.hash != ''){
	if ('scrollRestoration' in window.history) {
	    history.scrollRestoration = 'manual';
	}
}



document.addEventListener('click', event => {
	// console.log('click_registered');



	//
	// general
	//

	// holster-unholster
	const img_minimize = event.target.closest('.tut_img_button');
	if (img_minimize) { img_toggler(img_minimize) }

	// enlarge an image
	const pingas = event.target.closest('.tut_step_content img');
	if (pingas) { imgmax(pingas) }

	// exit enlarged mode
	const breasts = event.target.closest('.imgzoom');
	if (breasts) { imgmin() }





	//
	// box mover
	//

	// top
	const boxmovert = event.target.closest('.article_movetop');
	if (boxmovert) { box_mover(boxmovert, 't') }
	// bottom
	const boxmoverb = event.target.closest('.article_movebot');
	if (boxmoverb) { box_mover(boxmoverb, 'b') }





	//
	// Catalogue
	//

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









	//
	// Edit mode
	//

	// magic hat switch
	const hattrick = event.target.closest('.navbar-icon');
	if (hattrick) { activate_edit_mode(event) }

	// exit edit mode
	const exitedit = event.target.closest('#exit_edit');
	if (exitedit) { exit_edit_mode(event) }

	// apply text styling
	const dostyle = event.target.closest('.word_btn');
	if (dostyle) { exec_command(dostyle) }

	// image editor manager
	const imgman = event.target.closest('.edit_img_ctrl_del, .boxedit_btn');
	if (imgman) { edit_imgedit_btns_manager(imgman, event) }

	// Article preview
	const toggleprev = event.target.closest('#article_preview_btn');
	if (toggleprev) { edit_toggle_page_preview() }

	// Article save
	const articlesave = event.target.closest('#article_save_btn');
	if (articlesave) { article_saver() }



});

document.addEventListener('change', event => {
	// console.log('change_registered');


	// box edit buttons
	// important todo: why the fuck does it trigger the click event TWICE ???????
	const boxedit_local = event.target.closest('label.box_edit_cbox_field input');
	if (boxedit_local) { box_edit_local_btns(boxedit_local.closest('label.box_edit_cbox_field').getAttribute('bxedit_action'), boxedit_local.closest('.tut_step')) }
	// if (fuckoff) { console.log('OH NO') }

	// generate image preview
	const imgprev = event.target.closest('.edit_img_ctrl_link, .edit_img_ctrl_file, .edit_img_ctrl_type input');
	if (imgprev) { edit_img_dopreview(imgprev.closest('.edit_img_ctrl')) }

	// apply image size
	const imgsize = event.target.closest('.edit_img_size');
	if (imgsize) { editimg_apply_size(imgsize, event) }
	
});


document.addEventListener('focusout', event => {
	// console.log('focusout_registered');

	// lock name editing of a catalogue entry
	const ctgnames = event.target.closest('.fname_text, .tut_name_text');
	if (ctgnames) { ctg_name_bitlocker(ctgnames) }

});

document.addEventListener('focusout', event => {
	// console.log('focusout_registered');

	// lock name editing of a catalogue entry
	const ctgnames = event.target.closest('.fname_text, .tut_name_text');
	if (ctgnames) { ctg_name_bitlocker(ctgnames) }

});


document.addEventListener('keypress', event => {
	// console.log('kp')

	const name_apply = event.target.closest('.fname_text, .tut_name_text');
	if (name_apply) { ctg_name_apply(name_apply, event) }

	// better input UX
	// unfocus inputs and lock contenteditables
	const inputux = event.target.closest('.ux_input');
	if (inputux) { input_ux(inputux, event) }

});


// keypress does not register Backspace
document.addEventListener('keyup', event => {
	
	// eval chapters
	const boxedit_chapter = event.target.closest('.boxedit_chapter');
	// if (boxedit_chapter && event.keyCode == 8) { eval_chapters() }
	if (boxedit_chapter) { eval_chapters() }

	// better input UX
	// unfocus inputs and lock contenteditables
	const inputux = event.target.closest('.ux_input');
	if (inputux) { input_ux(inputux, event) }

});




document.addEventListener('wheel', event => {

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

function input_ux(tgt, evee)
{
	if (evee.keyCode == 13 || evee.keyCode == 27){
		// tgt.contentEditable = false;
		// tgt.value = tgt.value
		tgt.blur();
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

	if($(etgt).attr('fman_act') == 'del_fld' && evee.altKey){
		$(etgt).closest('.nav_folder').remove();
	}
	if($(etgt).attr('fman_act') == 'del_tut' && evee.altKey){
		$(etgt).closest('.nav_tutorial').remove();
	}

	if($(etgt).attr('fman_act') == 'rootnewdir'){
		$('.nav_stuff_box').append(window.folder_htm);
	}

	if($(etgt).attr('fman_act') == 'add_fld'){
		$(etgt).closest('.folder_name').siblings('.folder_content').append(window.folder_htm);
	}

	if($(etgt).attr('fman_act') == 'add_tut')
	{
		var today = new Date();
		var rndname = CryptoJS.MD5(today.getTime().toString() + lizard.rndwave(256, 'flac', '')).toString();
		console.log(rndname)
		// console.log(CryptoJS.MD5('shit').toString());
		$(etgt).closest('.folder_name').siblings('.folder_content').append($(`
			<div asset_idx="${rndname}" class="nav_tutorial">
				<div class="tut_name_text tut_name_text_edit">How to lizard sex</div>
				${window.ctg_tut_controls}
			</div>
		`));
	}

	// move up or down
	if($(etgt).attr('fman_act') == 'shuf')
	{
		var chooser = $(etgt).closest('.nav_tutorial')[0] || $(etgt).closest('.nav_folder')[0]
		if(evee.target.closest('.shuffle_ctg_item_top')){
			$(chooser).insertBefore($(chooser).prev())
		}

		if(evee.target.closest('.shuffle_ctg_item_bot')){
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

// this is responsible for folder/tut name editing
// therefore, the tut loading trigger is also here
function ctg_name_actuator(etgt, evee)
{
	if(evee.altKey){
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






























// ============================================================
// ============================================================
//                        Edit mode
// ============================================================
// ============================================================

function imgeditorbtns()
{
	let radiogroup = lizard.rndwave(11);
	var imgeditor_ctrls = lizard.ehtml(`
		<div class="edit_img_ctrl epreview_hide">
			<input class="edit_img_ctrl_link ux_input" type="text">
			<div class="edit_img_file_and_switch">

				<input class="edit_img_ctrl_file" type="file">

				<div class="edit_img_ctrl_type">
					<label checked class="edit_img_ctrl_islink">
						<input checked name="${radiogroup}" type="radio">
						Link
					</label>

					<label checked class="edit_img_ctrl_isfile">
						<input name="${radiogroup}" type="radio">
						File
					</label>
				</div>

				<input min="0" step="10" type="number" class="edit_img_size ux_input">

				<div img_action="del" class="edit_img_ctrl_del imgedit_btn">Delete</div>


			</div>
		</div>
	`);
	return imgeditor_ctrls
}


function activate_edit_mode(evee)
{
	/*
	// display error message
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
	*/


	// activate edit mode
	if (evee.altKey){
		// precache an icon
		window.icon_cache = [];
		// orange lambda background
		window.icon_cache.push(cache_image('assets/lambda_w_bg.png'));
		// red indicator
		window.icon_cache.push(cache_image('assets/indicator_red.png'));
		// lever down
		window.icon_cache.push(cache_image('assets/lever_off.png'));





		// window.boxes_code_storage = [];



		// ----------------------------------------
		//   spawn word-like editor on the page
		// ----------------------------------------

		// important todo: toggle "editmode" attribute on body and style with css

		// hide title
		$('.top-navbar').css('display', 'none');

		// shift page content
		$('.page_content').css('margin-top', '100px');

		// make quick index smaller
		$('.rquick_index').css('max-width', '250px');

		// create word editor
		var wordbtns = lizard.ehtml(`
			<div class="epreview_hides" id="word_editor">
				<div id="exit_edit"></div>
				<div id="word_btns"></div>
				<div id="word_inputs">
					<input type="color" id="word_color_input">
					<input class="ux_input" type="text" id="word_text_input">
				</div>
				<div class="word_editor_saveload">
					<img draggable="false" id="article_save_btn" src="assets/btnidle.png">
					<img draggable="false" id="article_preview_btn" src="assets/lever_off.png">
				</div>
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
			var rawbtn = lizard.ehtml(`<div class="word_btn">` + bt['vis'] + `</div>`);
			// rawbtn.setAttribute('vis', bt['vis']);
			rawbtn.setAttribute('sys', bt['sys']);
			rawbtn.setAttribute('add', bt['add']);
			wordbtns.querySelector('#word_btns').append(rawbtn);
		}
		// append result to the page
		document.body.append(wordbtns);




		// ----------------------------------------
		//   Make stuff editable (contenteditable)
		// ----------------------------------------
		$('.arcl_header_p, .tut_step_head_text').attr('contenteditable', true);




		// ----------------------------------------
		//      Append controls to the boxes
		// ----------------------------------------
		for (let box of document.querySelectorAll('.tut_step_head')){
			box.append(lizard.ehtml(`
				<div class="at_border_edit_box epreview_hide">

					<label bxedit_action="toggle_border" class="box_edit_cbox_field" class="box_edit_enable_border">
						<input ${box.closest('.tut_step').getAttribute('border_enabled') ? 'checked' : ''} type="checkbox" class="box_edit_enable_border">
						Enable border
					</label>

					<label bxedit_action="mark_code" class="box_edit_cbox_field">
						<input ${box.closest('.tut_step').getAttribute('iscode') ? 'checked' : ''} type="checkbox" class="box_edit_iscode">
						Is Code
					</label>

					<label bxedit_action="mark_vdc_code" class="box_edit_cbox_field">
						<input ${box.closest('.tut_step').getAttribute('isvdccode') ? 'checked' : ''} type="checkbox" class="box_edit_isvdccode">
						VDC Code
					</label>

					<div class="boxedit_btns">
						
						<div class="iliketomoveit">
							<div class="article_movetop"><div class="mv_triangle"></div></div>
							<div class="article_movebot"><div class="mv_triangle"></div></div>
						</div>

						<div class="box_edit_btns_other">
							<div img_action="add" class="add_img boxedit_btn">Add Image</div>
							<div class="delete_box boxedit_btn">Kill</div>
						</div>

					</div>
				</div>
			`));
			// editor_btns.find('.box_edit_enable_border')[0].checked = $(imgc).closest('.tut_step').attr('border_enabled') == 'true';

			// append chapter input
			var setchapter = box.closest('.tut_step').getAttribute('id');
			box.append(lizard.ehtml(`
				<input value="${setchapter ? setchapter : ''}" type="text" class="boxedit_chapter epreview_hide ux_input">
			`));
		}

		// append image controls
		for (var imgc of document.querySelectorAll('.imgcont_media_unit')){
			// autofill image src
			var editor_btns = $(imgeditorbtns());
			// show image size
			editor_btns.find('.edit_img_size').val($(imgc).find('img')[0].style.width.replace('px', ''));
			editor_btns.find('.edit_img_ctrl_link').val($(imgc).find('img').attr('src'));
			// append result to the page
			$(imgc).prepend(editor_btns);
		}




		// ----------------------------------------
		//       Spawn catalogue controls
		// ----------------------------------------

		// also, make the catalogue wider
		$('.nav-side').css('width', '400px');
		$('.tut_name_text').addClass('tut_name_text_edit');
		$('.fname_text').addClass('fname_text_edit');

		// cancel item move
		$('.nav-side').append('<div fman_act="cancel" class="ctg_button ctg_cancel_operation epreview_hide">Cancel</div>')
		// Paste to root / Add new dir to root
		$('.nav_stuff_box').append(`
			<div fman_act="rootpaste" class="e_hidden ctg_button ctg_rootpaste epreview_hide">Paste To Root</div>
			<div fman_act="rootnewdir" class="ctg_button add_new_dir_to_root epreview_hide">Add New Dir To Root</div>
		`)

		// These have to be inside window, because it's possible to add new folders and tuts

		// folder controls
		window.ctg_tut_controls = `
			<div fman_act="shuf" class="ctg_button shuffle_ctg_item">
				<div class="shuffle_ctg_item_top"><div class="btnsico"></div></div>
				<div class="shuffle_ctg_item_bot"><div class="btnsico"></div></div>
			</div>
			<div fman_act="mv_tut" class="ctg_button move_ctg_item"><div class="btnsico"></div></div>
			<div fman_act="del_tut" class="ctg_button del_ctg_item"><div class="btnsico"></div></div>
		`;
		$('.nav_tutorial').append(window.ctg_tut_controls);

		// tutorial controls
		window.ctg_folder_controls = `
			<div fman_act="shuf" class="ctg_button shuffle_ctg_item">
				<div class="shuffle_ctg_item_top"><div class="btnsico"></div></div>
				<div class="shuffle_ctg_item_bot"><div class="btnsico"></div></div>
			</div>
			<div fman_act="add_tut" class="ctg_button add_ctg_tut"><div class="btnsico"></div></div>
			<div fman_act="add_fld" class="ctg_button add_ctg_folder"><div class="btnsico"></div></div>
			<div fman_act="mv_fld" class="ctg_button move_ctg_item"><div class="btnsico"></div></div>
			<div fman_act="del_fld" class="ctg_button del_ctg_item"><div class="btnsico"></div></div>
			<div fman_act="paste_elem" class="ctg_button paste_btn e_hidden">Here</div>
		`;
		// also define new folder html
		window.folder_htm = 
		`
			<div id_folder_name="nil" class="nav_folder">
				<div class="folder_name">
					<div class="folder_triangle"><div class="folder_triangle_ico"></div></div>
					<div contenteditable class="fname_text">Sample Text (MLG)</div>` + window.ctg_folder_controls + `</div>
				<div class="folder_content">
				</div>
			</div>
		`;
		$('.folder_name').append(window.ctg_folder_controls);





		// ----------------------------------------
		//       		Restore Code
		// ----------------------------------------
		// restore text of the code blocks
		for (var restore of window.boxes_code_storage){
			restore['box'].innerHTML = restore['content'];
			restore['box'].classList.remove('hljs');
			restore['box'].contentEditable = true;
		}

	}
}

// takes element as an input
function edit_imgedit_btns_manager(el, evee)
{
	// delete element
	if (el.getAttribute('img_action') == 'del' && evee.altKey){
		el.closest('.imgcont_media_unit').remove();
	}

	// create element
	if (el.getAttribute('img_action') == 'add'){
		// wrap controls into a media unit container
		var wrapped = lizard.ehtml('<div class="imgcont_media_unit"><img></div>');
		wrapped.prepend(imgeditorbtns());
		// append result to the page
		el.closest('.tut_step').querySelector('.tut_step_content').append(wrapped);
	}
}




// show an image preview of the edited item
// takes image editor root as an input
function edit_img_dopreview(loc)
{
	console.groupCollapsed('Build Image Preview');
	console.log('Building Preview For', loc);

	var media_unit = $(loc).closest('.imgcont_media_unit');


	//
	// no matter whether it's a link or file - the image element itself should always exist
	//

	// todo: this section can be better
	
	// reference to the image element
	var imgelem = null;
	// if the element doesnt exist - create one
	// else - select the image element
	if (media_unit.find('img').length <= 0){
		console.log('No image element exist, create one');
		// create the element itself
		var mkimg = $('<img>');
		// store reference
		imgelem = mkimg;
		// append to unit
		media_unit.prepend(mkimg);
		console.log('Created Image element', imgelem);
	}else{
		imgelem = media_unit.find('img');
	};


	// if it's specified that it's a link
	if ($(loc).find('.edit_img_ctrl_islink input')[0].checked === true){
		console.log('Image is Linked');
		imgelem[0].src = $(loc).find('.edit_img_ctrl_link').val();
		// just in case
		console.groupEnd('Build Image Preview');
		return
	};

	// if it's specified that it's a file
	if ($(loc).find('.edit_img_ctrl_isfile input')[0].checked === true){
		console.log('Image is a File');
		console.time('Done reading image');
	    // read as array buffer to convert it to blob and set as img src
	    var reader = new FileReader();
	    // reader takes the file object
	    // .files property of the file input stores an array of selected files
	    let fl_input = $(loc).find('.edit_img_ctrl_file')[0];

	    // account for a following circumstance:
	    // check that it's a file
	    // dont select any files
	    // edit the url input which triggers preview rebuild

	    // if this happens - dont do anything
	    if (fl_input.files.length <= 0){
	    	console.log('Image is a File, but no files selected');
	    	console.timeEnd('Done reading image');
			console.groupEnd('Build Image Preview');
	    	return
	    }

	    reader.readAsArrayBuffer(fl_input.files[0], 'UTF-8');
	    reader.onload = function (evt) {
	    	// convert read result to blob
			var boobs = new Blob([reader.result], {type: fl_input.files[0].type });

			// convert blob to URL for img src
			var urlCreator = window.URL || window.webkitURL;
			var imageUrl = urlCreator.createObjectURL(boobs);

			// set src
			imgelem[0].src = imageUrl;
			console.timeEnd('Done reading image');
			console.groupEnd('Build Image Preview');
		};
	}

	// console.groupEnd('Build Image Preview');
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


function exit_edit_mode(evee)
{
	if (evee.altKey){
		// unhide title
		$('.top-navbar, .page_content').removeAttr('style');

		// delete editor
		$('#word_editor').remove();

		// delete catalogue controls
		$('.nav_stuff_box .ctg_button').remove();

		// reload article
		article_loader(window.current_id, true)

		// revert catalogue width
		$('.nav-side').css('width', '300px');
		$('.tut_name_text').removeClass('tut_name_text_edit');
		$('.fname_text').removeClass('fname_text_edit');
	}

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
		box.toggleAttribute('iscode');
		box.removeAttribute('isvdccode');
		$(box).find('.box_edit_isvdccode')[0].checked = false;
	}

	// mark as vdc code
	if (action == 'mark_vdc_code'){
		box.toggleAttribute('isvdccode');
		box.removeAttribute('iscode');
		$(box).find('.box_edit_iscode')[0].checked = false;
	}

	// delete the entire box
	if (action == 'kill' && evee.altKey){
		$(etgt).closest('.tut_step').remove();
	}

}


// move tutorial box up or down
function box_mover(etgt, side)
{
	var soolja_box = $(etgt).closest('.tut_step');
	
	// top
	if (side == 't'){
		soolja_box.insertBefore(soolja_box.prev()); 
	}
		
	// bottom
	if (side == 'b'){
		soolja_box.insertAfter(soolja_box.next());  
	}
}



function eval_chapters()
{
	var quickindex = document.querySelector('.rquick_index');

	// clean the index
	quickindex.innerHTML = '';

	// populate
	for (var ch of document.querySelectorAll('.boxedit_chapter')){
		// if chapter input is not empty - append it to the chapter index
		var chvalue =  ch.value.trim();
		if (chvalue != ''){
			quickindex.append(lizard.ehtml(`
				<a href="#` + chvalue + `" class="rqindex_item">` + chvalue + `</a>
			`))

			// set id attribute
			ch.closest('.tut_step').id = chvalue;

			// todo
			// ch.value = ch.value.replace(/\s\s+/g, ' ');
		}
	}
}


function edit_toggle_page_preview()
{
	console.groupCollapsed('Preview Shit')
	console.time('Preview')

	console.time('First steps');
	// first, the easiest: Hide shit, set the icon and set preview mode
	$('.nav-side').css('width', window.preview_mode ? '400px' : '300px');

	$('.epreview_hide').toggleClass('pg_preview_hide');
	$('#word_editor').toggleClass('freeze_editor');
	$('#article_preview_btn')[0].src = window.preview_mode ? 'assets/lever_off.png' : 'assets/lever_onn.png';
	console.timeEnd('First steps');

	// now, evaluate code
	// todo: smarter solution
	console.time('Loop');
	// if preview is not active, then it means that a transtition to the preview mode is happening
	// store original text tied to a certain box and then evaluate code 
	if (window.preview_mode == false){
		window.boxes_code_storage = [];
		for (var evcode of document.querySelectorAll('.tut_step[iscode] .tut_step_head_text')){
			window.boxes_code_storage.push({
				'box': evcode,
				'content': evcode.innerHTML
			})
			evcode.classList.add('language-python');
			evcode.textContent = evcode.innerText;
			// lock it from editing. It's pointless
			evcode.contentEditable = false;
			hljs.highlightElement(evcode);

		}
	}else{
		// else restore text
		for (var restore of window.boxes_code_storage){
			restore['box'].innerHTML = restore['content'];
			restore['box'].classList.remove('hljs');
			// unlock editing
			restore['box'].contentEditable = true;
		}
	}
	console.timeEnd('Loop');

	console.timeEnd('Preview')
	console.groupEnd('Preview Shit')

	window.preview_mode = !window.preview_mode;
}


function editimg_apply_size(tgt, evee)
{
	// if blank - fit
	if (str(tgt.value.trim()) == '' || str(tgt.value.trim()) == '0'){
		$(tgt).closest('.imgcont_media_unit').find('img')[0].style.width = null
		tgt.value = '';
	}else{
		$(tgt).closest('.imgcont_media_unit').find('img')[0].style.width = str(tgt.value) + 'px';
		// evee.preventDefault()
	}

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
			for (var nvtut of document.querySelectorAll('.nav_tutorial')){
				// downscale it first and then compare to the query
				var string = $(nvtut).attr('asset_idx');
				var downscaled = lizard.delnthchar(string, 4, true);
				// if we found a match - try loading the article
				if (load_loc == downscaled)
				{
					console.log('Found match inside index');
					console.timeEnd('Indexing Done');
					console.groupEnd('Indexing');
					article_loader(string)
					return
				}
			}
			console.log('No match for', load_loc, 'was found inside index');
		}

		console.timeEnd('Indexing Done');
		console.groupEnd('Indexing');
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
	            // todo: error handling
	            img.src = '';
	            resolve(img);
	        };
	    }
	});
}

async function satisfy_image_queue()
{
	console.groupCollapsed('Image Queue Process');
	for (var im of window.imgqu){
		var imgbox = im['to'].find('.tut_step_content');
		
		// wait for image to load
		console.time('Loaded Img');
		var theimg = await cache_image(im['content']['imgurl']);
		console.timeEnd('Loaded Img');

		// apply style
		$(theimg).css('width', im['content']['imgsize'] + 'px');

		// wrap image into a container
		var imgcont = $('<div class="imgcont_media_unit"></div>');
		imgcont.append(theimg);

		// append image to the box
		imgbox.append(imgcont);
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
// takes full id
async function article_loader(a_id=null, force=false)
{
	
	console.time('Full Article Load');
	window.imgqu = [];
	// deal with ids
	if (a_id == null || a_id == undefined || a_id == ''){return null}
	// if (full == false){
	// 	a_id = lizard.delnthchar(a_id);
	// }

	// set current page id
	window.current_id = a_id;

	// reset code-related stuff
	window.boxes_code_storage = [];

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
				<div class="tut_step_content"></div>
			</div>
		`);

		// set text
		emptybox.find('.tut_step_head_text').html(tbox['text']);

		// todo: legacy fallback...
		emptybox.find('.tut_step_head_text').css({
			'border-color': tbox['border_c'] || null,
			'border-width': tbox['border_w'] || null
		});

		// set border style
		emptybox.find('.tut_step_head_text')[0].style.borderBlock = tbox['border']

		// set whether border is there or not
		// todo: this can be acvieved with css
		// tbox['hasborder'] ? emptybox[0].setAttribute('border_enabled', true) : null
		tbox['hasborder'] ? $(emptybox).attr('border_enabled', true) : null

		// mark as code
		tbox['iscode'] ? $(emptybox).attr('iscode', true) : null
		// mark as vdc code
		tbox['isvdccode'] ? $(emptybox).attr('isvdccode', true) : null

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
			// but before that - write down original text
			window.boxes_code_storage.push({
				'box': boxtext,
				'content': boxtext.innerHTML
			})

			// execute the trick
			boxtext.textContent = boxtext.innerText;

			// specify highlight language
			boxtext.classList.add('language-python');

			// mark as code
			boxtext.closest('.tut_step').setAttribute('iscode', true)

			// execute highlight
			hljs.highlightElement(boxtext);
		}

	}
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

	activate_edit_mode({altKey: true})

	console.timeEnd('Full Article Load');
}





































// ============================================================
// ============================================================
//                        Article Saver
// ============================================================
// ============================================================

async function send_article_text(txt, arcl_id)
{
	return new Promise(function(resolve, reject){
		fetch('htbin/manager.py?do=save_text&article_id=' + arcl_id, {
		    'headers': {
		        'accept': '*/*',
		        'cache-control': 'no-cache',
		        'pragma': 'no-cache'
		    },
		    'body': txt,
		    'method': 'POST',
		    'mode': 'cors',
		    'credentials': 'omit'
		})
		.then(function(response) {
		    // console.log(response.status);
		    response.json().then(function(data) {
		    	resolve(data)
		    });
		});
	});
}


async function send_article_image(imgb, imagename, arcl_id)
{
	return new Promise(function(resolve, reject){

		var prms = new URLSearchParams({
			do: 'save_img',
			article_id: arcl_id,
			media_id: imagename
		})

		fetch('htbin/manager.py?' + prms.toString(), {
		    'headers': {
		        'accept': '*/*',
		        'cache-control': 'no-cache',
		        'pragma': 'no-cache'
		    },
		    'body': imgb,
		    'method': 'POST',
		    'mode': 'cors',
		    'credentials': 'omit'
		})
		.then(function(response) {
		    // console.log(response.status);
		    response.json().then(function(data) {
		    	resolve(data)
		    });
		});
	});
}


async function read_as_bytes(file)
{
	return new Promise(function(resolve, reject){
		var reader = new FileReader();
	    reader.readAsArrayBuffer(file, 'UTF-8');
	    reader.onload = function (evt) {
	    	// convert read result to blob
			var boobs = new Blob([reader.result], {type: file.type});
			resolve(boobs)
		};
	});
}


async function article_saver()
{
	console.group('Article Save');
	console.time('Full Save');

	// giga sexy das knopf
	var savebtn = document.querySelector('#article_save_btn')
	savebtn.style.pointerEvents = 'none';
	savebtn.src = '';
	savebtn.src = 'assets/btn_faster.apng';
	savebtn.style.backgroundImage = `url('assets/btnidle.png'), url('assets/indicator_red.png')`;

	// vis feedback
	// a wrapper around the base is needed for padding and height 100% to work properly
	$('#save_feedback').remove()
	$('#word_btns').append(`
		<div id="save_feedback">
			<div id="save_feedback_feed"></div>
		</div>
	`);

	fbi.console_log('Saving Article...')
	fbi.console_log('Cached basic info:')
	// basic info
	var article = {
		'atitle': $('.arcl_header_p').text(),
		'boxes': [],
		'selfid': window.current_id
	}

	console.log('Basic info', article); fbi.console_log(article)

	console.log('Compiling Article Text...');
	console.time('Done Compiling Article Text in')
	window.imgsave_queue = [];
	// process boxes one by one
	for (var box of document.querySelectorAll('.tut_step')){
		console.log('Processing box', box); fbi.console_log('Processing a box...', {'margin-top': '15px'})
		// write down general info about the box
		var mkbox = {
			'border': getComputedStyle($(box).find('.tut_step_head_text')[0]).borderBlock,
			'hasborder': $(box).find('.box_edit_enable_border')[0].checked,
			'chapter': $(box).find('.boxedit_chapter').val().trim(),
			'text': $(box).find('.tut_step_head_text')[0].innerHTML,
			'iscode': box.hasAttribute('iscode'),
			'isvdccode': box.hasAttribute('isvdccode'),
			'contents': []
		}
		console.log('Wrote down basic info and text', mkbox); fbi.console_log('Cached basic info and text of a box')

		// process media one by one
		// even though this is 100% reliable now - process images AFTER the article text
		for (var boxm of box.querySelectorAll('.imgcont_media_unit')){
			fbi.console_log('Cache media unit of a box', {'padding-left': '15px'})
			var img_unit = {
				'imgsize': $(boxm).find('.edit_img_size').val(),
			}

			// if it's a link - do not queue the save
			// if it's a file - queue file save for later
			if ($(boxm).find('.edit_img_ctrl_islink input')[0].checked == true){
				fbi.console_log('Media unit is URL', {'padding-left': '15px'})
				img_unit['imgurl'] = $(boxm).find('.edit_img_ctrl_link ').val()
				fbi.console_log(`Ripped URL: ${img_unit['imgurl']}`, {'padding-left': '15px'})
			}else{
				fbi.console_log('Media unit is a file', {'padding-left': '15px'})
				// this is kind of a "promise"
				// "I swear that this is the final url and that it will not change later"
				var f_input = $(boxm).find('.edit_img_ctrl_file')[0];
				img_unit['imgurl'] = `content/${window.current_id}/data/${f_input.files[0].name}`;
				// queue processing
				// todo: queue files right away
				window.imgsave_queue.push(f_input);
				fbi.console_log('Queued media file for processing later', {'padding-left': '15px'})
			}
			mkbox['contents'].push(img_unit)
		}
		fbi.console_log('Cached a box')
		article['boxes'].push(mkbox)
	}

	// save file
	fbi.console_log('Saving article text to a file...')
	var saved_text_to_server = await send_article_text(JSON.stringify(article), window.current_id)
	console.timeEnd('Done Compiling Article Text in'); console.log(saved_text_to_server); fbi.console_log('Done saving article text to a file'); fbi.console_log(saved_text_to_server); 


	console.log('Processing All Images...'); fbi.console_log('Start processing media')
	console.time('Processed All Images in')
	for (var pr_img of window.imgsave_queue){
		fbi.console_log('Reading media as bytes...')
		var raw_img = await read_as_bytes(pr_img.files[0])
		fbi.console_log('Saving media to server...')
		var test = await send_article_image(raw_img, lizard.base64EncArr(lizard.strToUTF8Arr(pr_img.files[0].name)), window.current_id)
		console.log('img save', test); fbi.console_log(test)

	}
	console.timeEnd('Processed All Images in'); fbi.console_log('Processed all media units')

	fbi.console_log('Article save complete', {'color': 'lime'})
	document.querySelector('#article_save_btn').style.backgroundImage = `url('assets/btnidle.png'), url('assets/indicator_green.png'), url('assets/indicator_red.png')`;
	console.timeEnd('Full Save');
	console.groupEnd('Article Save');
	$('#save_feedback').css('display', 'none');
	savebtn.style.pointerEvents = null;
}