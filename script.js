window.blender_edit_mode = false
window.preview_mode = false

document.addEventListener('click', event => {
    console.log('click_registered');
  
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
    if (ectgnames){
    	var ses = ectgnames
    }
    if (ectgnames_t){
    	var ses = ectgnames_t
    }
    if (ectgnames || ectgnames_t) { ctg_name_actuator(ses, event) }




	// wrapper
    const wrapper = event.target.closest('.mkbold_text');
    if (wrapper) { wraptext() }

	// saver
    const saveshit = event.target.closest('.cum_on_a_lizard');
    if (saveshit) { article_compiler() }



});

document.addEventListener('change', event => {
    console.log('change_registered');
  
    // border top colour
    const btopcol = event.target.closest('.top_border_color_inp');
    if (btopcol) { set_border_top_col(btopcol, false) }

    // image preview
    const imgprev = event.target.closest('.c_image_input');
    if (imgprev) { img_preview(imgprev) }

    // set size of the image
    const imgprev_size = event.target.closest('.c_image_size');
    if (imgprev_size) { img_preview_set_size(imgprev_size) }


    // image url
    const imgprev_url = event.target.closest('.c_image_url');
    if (imgprev_url) { img_preview_set_url(imgprev_url) }

    // image use url
    // const imgprev_useurl = event.target.closest('.imguseurl');
    // if (imgprev_useurl) { img_preview_use_url(imgprev_useurl) }



});


document.addEventListener('focusout', event => {
    console.log('focusout_registered');
	// focusout
    // border top colour
    const ctgnames = event.target.closest('.fname_text');
    const ctgnames_t = event.target.closest('.tut_name_text');
    if (ctgnames){
    	var sas = ctgnames
    }
    if (ctgnames_t){
    	var sas = ctgnames_t
    }
    if (ctgnames || ctgnames_t) { ctg_name_bitlocker(sas) }
	// $('.fname_text, .tut_name_text').attr('contenteditable', true);
});

// st - input string OR array
// nth - every n character
// use - if set to true, will return every n character
// if set to false or not set, will return a string with every n character deleted
// smartass: Works with arrays too
function delnthchar(st, nth, use)
{
	if (st.toString() == ''){ return ''}

	if (Array.isArray(st))
	{
		var todel = st;
	}else{
		var todel = st.toString().split('');
	}

	var nthc = 1
	var delres = []
	for (var count in todel)
	{
		if (use)
		{
			if (nthc != nth)
			{
				nthc += 1
			}else{
				delres.push(todel[count])
				var nthc = 1
			}
		}else{
			if (nthc != nth)
			{
				delres.push(todel[count])
				nthc += 1
			}else{
				var nthc = 1
			}
		}
	}
	return delres.join('')

}


$(document).ready(function(){

	function ihatethen(dt)
	{
		$('.nav_stuff_box').append(dt);
		// load shit if it was linked to
		var urlParams = new URLSearchParams(window.location.search);
		var load_loc = urlParams.get('lt');
		// if not null (exists) - load the tut
		if (load_loc != null)
		{
			// we dont want huge fucking urls. We use every 4th character of an id
			// and hope that there are no collisions...
			// todo: create a smart nth returner function

			// can't have shit in js...
		    $('.nav_tutorial').each(function(){
		    	// check every id
		    	// downscale it first and then compare to the query
				var string = $(this).attr('asset_idx');
				var saltedString = delnthchar(string, 4, true)
				if (load_loc == saltedString)
				{
					pgloader(string)
				}

		    });
		}
	}



	fetch("content_index.sex", {
		"headers": {
			"accept": "*/*",
			"cache-control": "no-cache",
			"pragma": "no-cache"
		},
		"referrerPolicy": "strict-origin-when-cross-origin",
		"body": null,
		"method": "GET",
		"mode": "cors",
		"credentials": "omit"
	})
	.then(response => response.text())
	// .then(data => $('.nav_stuff_box').append(data));
	.then(data => ihatethen(data));
	// YEA, one more fucking .then will do the shit, but I dont wanna
	// cuz like... one more fucking .then and THEN I'm gonna fucking kill myself

/*    xmlDoc = $.parseXML(tml);
	// fuckjq = $(xmlDoc)
	// console.log(fuckjq)
	window.fuckvmix = xmlDoc;
	console.log(xmlDoc);
	
	var pootis = $(xmlDoc).find('inputs[title="28_08_2021_beach_title.xaml"]').end().find('text[name="top_pair"]').text();*/
});




function surroundSelection(textBefore, textAfter) {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            var startNode = range.startContainer, startOffset = range.startOffset;

            var startTextNode = document.createTextNode(textBefore);
            var endTextNode = document.createTextNode(textAfter);

            var boundaryRange = range.cloneRange();
            boundaryRange.collapse(false);
            boundaryRange.insertNode(endTextNode);
            boundaryRange.setStart(startNode, startOffset);
            boundaryRange.collapse(true);
            boundaryRange.insertNode(startTextNode);

            // Reselect the original text
            range.setStartAfter(startTextNode);
            range.setEndBefore(endTextNode);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}

function htmlDecode(input){
  var e = document.createElement('textarea');
  e.innerHTML = input;
  // handle case of empty input
  var fuck = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  $(e).remove();
  return fuck
}

function htmlenc(inp)
{
	return $('<div/>').text(inp).html();
}

function liz3_rndwave(length, method, addchars) {
    var result           = '';
	var addon_chars = '';
	if (typeof addchars == 'undefined')
	{
		var addon_chars = '';
	}else{
		var addon_chars = addchars.toString().replaceAll(' ', '');
	}
	switch (method) {
		case 'flac':
			var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-()=+*#/!&?<>$~' + addon_chars;
			break;

		case 'num':
			var characters = '1234567890' + addon_chars;
			break;

		case 'def':
			var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-' + addon_chars;
			break;

		default:
			var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-' + addon_chars;
			// console.log(`Sorry, we are out of ${expr}.`);
			break;
	}
	
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}








function img_toggler(etgt)
{
    // $(etgt).closest('.tut_step').find('img').toggleClass('e_hidden');
    $(etgt).closest('.tut_step').find('.tut_step_content').toggleClass('e_hidden');
    $(etgt).closest('.tut_step').find('.image_adder_btn').toggleClass('e_unclickable');
}


function activate_edit_mode(evee)
{
	if (evee.altKey)
	{
		if (window.blender_edit_mode == false)
		{
			// window.blender_edit_mode = true
			console.log('enter edit mode')
			// make article header editable
			$('.arcl_header_p').attr('contenteditable', true);
			// make articles editable
			$('.tut_step_head_text')
			.attr('contenteditable', true)
			.addClass('single_lizrd_looking_for_sex');
			window.border_edit_m = 
			`
				<div class="at_border_edit_box">
					<label class="enable_border_checkbox"><input checked type="checkbox" class="at_border_top_ena_ch">Enable border</label>
					<input class="top_border_color_inp" type="color">
					<div class="suggest_border_colors">
						<div bgcol="#64DAFF" style="background-color: #64DAFF" class="border_color_suggestion"></div>
						<div bgcol="#64FF86" style="background-color: #64FF86" class="border_color_suggestion"></div>
						<div bgcol="#a064ff" style="background-color: #a064ff" class="border_color_suggestion"></div>
					</div>
					<div class="iliketomoveit">
						<div class="article_movetop"><div class="mv_triangle"></div></div>
						<div class="article_movebot"><div class="mv_triangle"></div></div>
					</div>
					<div class="delete_box">Del</div>
					<div class="mkbold_text">B</div>
				</div>

			`;
			var img_adder = 
			`
				<div class="image_adder_btn">Add Image</div>
			`;

/*			window.img_editor = 
			`
				<div class="image_editor">
					<input class="c_image_input" type="file" accept=".png,.jpeg,.jpg,.jfif,.bmp">
					<input class="c_image_size" type="number" class="image_sizer">
					<div class="image_deleter">Delete</div>
				</div>
			`;
			*/
			window.img_editor = 
			`
				<div class="image_editor">
					<div class="imgrow"><input class="c_image_input" type="file" accept="image/png, image/gif, image/jpeg, image/bmp, image/webp"></div>
					<div class="imgrow"><input class="c_image_url" type="text"><input class="imguseurl" type="checkbox"></div>
					<input class="c_image_size" type="number">
					<div class="image_deleter">Delete</div>
				</div>
			`;

			window.ctg_btns = 
			`
				<div fman_act="mv_tut" class="ctg_button move_ctg_item">M</div>
				<div fman_act="del_tut" class="ctg_button del_ctg_item">D</div>
			`;

			window.folder_btns =
			`
				<div fman_act="add_tut" class="ctg_button add_ctg_tut">AT</div>
				<div fman_act="add_fld" class="ctg_button add_ctg_folder">AD</div>
				<div fman_act="mv_fld" class="ctg_button move_ctg_item">M</div>
				<div fman_act="del_fld" class="ctg_button del_ctg_item">D</div>
				<div fman_act="paste_elem" class="ctg_button paste_btn e_hidden">Here</div>

			`;

			window.folder_htm = 
			`
				<div id_folder_name="nil" class="nav_folder">
					<div class="folder_name"><div contenteditable class="fname_text">Sample Text (MLG)</div>` + window.folder_btns + `</div>
					<div class="folder_content">
					</div>
				</div>
			`;


			$('.tut_step_head').append(border_edit_m);
			$('.tut_step').append(img_adder);
			$('.tut_step_content').append(img_editor);
			$('.rquick_index').append('<div class="add_box">Lizard Sex</div>');
			$('.rquick_index').append('<div class="cum_on_a_lizard e_hidden">Cum on a sexy lizard</div>');
			$('.rquick_index').append('<div class="preview_page">Preview</div>');

			$('.nav_tutorial').append(ctg_btns);
			$('.folder_name').append(folder_btns);

			// $('.fname_text, .tut_name_text').attr('contenteditable', true);

			$('.nav-side').append('<div fman_act="cancel" class="ctg_button ctg_cancel_operation">Cancel</div>')
			$('.nav_stuff_box').append('<div fman_act="rootpaste" class="e_hidden ctg_button ctg_rootpaste">Paste To Root</div><div fman_act="rootnewdir" class="ctg_button add_new_dir_to_root">Add New Dir To Root</div>')

			$('.tut_step_head').after('<input class="section_name" type="text">');



			// if an image has width style - show it
			// and show urls
			console.log($('.tut_step_content'));

			// tits = $('.tut_step_content');



		    $('.tut_step_content').each(function(){

				console.log(this);
				var ime = $(this).find('img');
				var target_f = $(this).find('.c_image_size');
				$(this).find('.c_image_url').val(ime[0].src);
				$(this).find('.imguseurl').prop('checked', true);
				if ($(ime)[0].hasAttribute('style'))
				{
					if ($(ime).attr('style').includes('width'))
					{
						$(target_f).val(parseFloat($(ime).css('width')));
					}
				}

		    });
		    
		    window.preview_mode = false
		    toggle_page_preview()
		}
		if (window.blender_edit_mode == true)
		{
			// todo: add a special class to all the editor elements for faster delete
			$('.ctg_button, .preview_page, .add_box, .cum_on_a_lizard, .at_border_edit_box, .image_editor, .image_adder_btn, .section_name').remove();
			if (window.preview_mode == false)
			{
				toggle_page_preview()
			}
			window.blender_edit_mode = false
		}else{
			window.blender_edit_mode = true
		}

		
	}
}

// borders
function enable_border_top(etgt)
{
	var cont = $(etgt).closest('.tut_step_head').find('.tut_step_head_text');
	var ch = $(etgt).find('input');
	console.log(cont)
	console.log(ch)

	// if border is there - set border width to 0
	console.log(ch[0].checked)
	if (!ch[0].checked)
	{
		$(cont).css('border-width', '0px');
	}

	// if not checked - try to pull previous state
	if (ch[0].checked)
	{
		if (cont[0].hasAttribute('bwidth'))
		{
			$(cont).css('border-width', $(cont).attr('bwidth') + 'px');
		}else{
			$(cont).css('border-width', '5px');
		}
		
	}
}

function set_border_top_col(etgt, sug)
{

	if(!sug)
	{
		$(etgt).closest('.tut_step_head').find('.tut_step_head_text').css('border-color', $(etgt).val());
		
	}
	if(sug)
	{
		console.log($(etgt).css('background'))
		$(etgt).closest('.tut_step_head').find('.tut_step_head_text').css('border-color', $(etgt).css('background-color'));
		$(etgt).closest('.tut_step_head').find('.top_border_color_inp').val($(etgt).attr('bgcol'));
	}

}


function box_mover(etgt, side)
{
	var soolja_box = $(etgt).closest('.tut_step')

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



function img_preview(etgt)
{

	var image_slot = $(etgt).closest('.tut_step_content').find('img');
	console.log(image_slot)
    var reader = new FileReader();
    reader.readAsArrayBuffer(etgt.files[0], 'UTF-8');
    reader.onload = function (evt) {
		// var boobs = new Blob([new Uint8Array(reader.result)], {type: $('#lizards_pussy')[0].files[0] });
		var boobs = new Blob([reader.result], {type: etgt.files[0].type });
		
		var urlCreator = window.URL || window.webkitURL;
		var imageUrl = urlCreator.createObjectURL(boobs);
		
		$(image_slot)[0].src = imageUrl
		console.log(reader.result.length)

		window[etgt] = reader.result

/*		console.log(reader.result);
		window.softimage = new Image();
		window.softimage.src = imageUrl;
		$('body').append(window.softimage);
		$('body').append('\n');
		console.log(reader.result.length)*/
		// document.getElementById('lizards_pussy2').setAttribute('value', reader.result);
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

}


function delete_bbox(etgt, evee)
{
	if(evee.altKey)
	{
		$(etgt).closest('.tut_step').remove();
	}
}

function toggle_page_preview()
{
	/*
	at_border_edit_box
	image_adder_btn
	image_editor
	add_box
	cum_on_a_lizard
	section_name
	*/

	$('.at_border_edit_box, .image_adder_btn, .image_editor, .add_box, .cum_on_a_lizard, .section_name').toggleClass('e_hidden');
	if (window.preview_mode == false){
		window.preview_mode = true
		eval_to_colors()
	}else if(window.preview_mode == true){
		window.preview_mode = false
		eval_to_code()
	}
}


function folder_toggler(etgt, evee, orign)
{
	console.log(orign)
	if(!$(orign)[0].hasAttribute('contenteditable') && !evee.altKey)
	{
		$(etgt).siblings('.folder_content').toggleClass('e_hidden');
	}
}



function catalogue_manager(etgt, evee)
{
	console.log(etgt);

	if($(etgt).attr('fman_act') == 'mv_tut')
	{
		window.func_movelinear = $(etgt).closest('.nav_tutorial');
		$('.ctg_button').addClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').removeClass('e_hidden');
	}

	if($(etgt).attr('fman_act') == 'mv_fld')
	{
		window.func_movelinear = $(etgt).closest('.nav_folder');
		$('.ctg_button').addClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').removeClass('e_hidden');
		$(etgt).closest('.nav_folder').find('.paste_btn').addClass('e_hidden');
	}

	if($(etgt).attr('fman_act') == 'paste_elem')
	{
		$(etgt).closest('.folder_name').siblings('.folder_content').append(window.func_movelinear);
		window.func_movelinear = 'nil';
		$('.ctg_button').removeClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').addClass('e_hidden');
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
		var rndname = CryptoJS.MD5(today.getTime() + liz3_rndwave(16, 'num', '')).toString();
		// console.log(CryptoJS.MD5('shit').toString());
		$(etgt).closest('.folder_name').siblings('.folder_content').append($('<div class="nav_tutorial"><div class="tut_name_text">How to lizard sex</div>' + window.ctg_btns + '</div>').attr('asset_idx', rndname));
	}



	$('.ctg_cancel_operation').removeClass('e_hidden');
}



function wraptext()
{
	if ($(window.getSelection().anchorNode).closest('.single_lizrd_looking_for_sex').length > 0)
	{
		surroundSelection('<st bold strike color="#64DAFF">', '</st>')
	}
	
}



function eval_to_colors()
{

	// htmlDecode
	// $('.tut_step_head_text')
	iwant2die()
    $('.tut_step_head_text').each(function(){
        var appendant = htmlDecode($(this).html());
        $(this).empty();
        $(this).append(appendant);
    });

    $('st').each(function(){
    	$(this).css('color', $(this).attr('color'));
    });


}

function iwant2die()
{
/*	var wrapperNodes = document.querySelectorAll('.tut_step_head_text span')
	for (var fuck in wrapperNodes)
	{
		wrapperNodes[fuck].replaceWith(...wrapperNodes[fuck].childNodes)
	}
*/

    $('.tut_step_head_text span').each(function(){
		this.replaceWith(...this.childNodes)
    });


}


function eval_to_code()
{
	// $($0).replaceWith(htmlenc($($0)[0].outerHTML.replaceAll('=""', '')))
	iwant2die()
    $('st').each(function(){
    	$(this).removeAttr('style');
        var convertor = htmlenc($(this)[0].outerHTML.replaceAll('=""', ''));
        $(this).replaceWith(convertor);
    });

}



function ctg_name_bitlocker(etgt)
{
	$(etgt).removeAttr('contenteditable');
}

function ctg_name_actuator(etgt, evee)
{
	if(evee.altKey)
	{
		$(etgt).attr('contenteditable', true).focus();
	}else{
		if ($(etgt).hasClass('tut_name_text') && !$(etgt)[0].hasAttribute('contenteditable') && !window.blender_edit_mode)
		{
			pgloader($(etgt).closest('.nav_tutorial').attr('asset_idx'))
		}
	}
}



function img_preview_set_url(etgt)
{
	var image_slot = $(etgt).closest('.tut_step_content').find('img');
	$(image_slot)[0].src = $(etgt).val();
}



function pgloader(pgx)
{

	function pgload(ct, ref_index, rscode)
	{


		if (rscode == 404)
		{
			$('.tut_step').remove();
			$('.rquick_index').empty();
			$('.arcl_header_p').text('Does not exist. Go fuck a lizard');
			window.current_zid = ref_index
		}else{
			window.current_zid = ref_index
			console.log(ct);
			$('.rquick_index').empty();
			$('.tut_step').remove();
			window.cpage_src = JSON.parse(ct);

			// set title
			$('.arcl_header_p').text(cpage_src['atitle']);

			// build boxes
			for (var zbox in cpage_src['boxes'])
			{
				// create empty box
				var ebox = 
				`
					<div class="tut_step">
						<div class="tut_step_head">
							<p class="tut_step_head_text"></p>
						</div>
					</div>
				`;
				var emptybox = $(ebox);

				// set headtext
				$(emptybox).find('.tut_step_head_text').append(cpage_src['boxes'][zbox]['text']);
				// set border
				$(emptybox).find('.tut_step_head_text')
					.css('border-color', cpage_src['boxes'][zbox]['border_c'].split(')')[0] + ')')
					.css('border-width', cpage_src['boxes'][zbox]['border_w'])
				// set chapter if any
				// todo: also append the chapter to the box from the right. Done
				if (cpage_src['boxes'][zbox]['chapter'] != ''){
					$(emptybox).attr('id', cpage_src['boxes'][zbox]['chapter']);
					$('.rquick_index').append('<a href="#' + cpage_src['boxes'][zbox]['chapter'] + '" class="rqindex_item">' + cpage_src['boxes'][zbox]['chapter'] + '</a>')
				}

				// if it has content - append button
				// todo: make button evaluation a separate function and run it after the article is done
				if (cpage_src['boxes'][zbox]['contents'].length > 0){
					$(emptybox).find('.tut_step_head').append('<button class="tut_img_button"></button>')
				}

				// construct contents
				for (var bxc in cpage_src['boxes'][zbox]['contents'])
				{
					var econ = $(`
						<div class="tut_step_content">
							<img src="">
						</div>
					`);
					if (cpage_src['boxes'][zbox]['contents'][bxc]['imguseurl'] == '1')
					{
						econ.find('img')[0].src = cpage_src['boxes'][zbox]['contents'][bxc]['imgurl']
						econ.find('img').attr('orig_src', cpage_src['boxes'][zbox]['contents'][bxc]['imgurl']);
					}else{
						var mksrc = 'content/' + cpage_src['selfid'] + '/data/' + cpage_src['boxes'][zbox]['contents'][bxc]['imgn'];
						econ.find('img')[0].src = mksrc;
						econ.find('img').attr('orig_src', mksrc);
					}
					econ.find('img').css('width', cpage_src['boxes'][zbox]['contents'][bxc]['imgsize']);
					$(emptybox).append(econ);
				}

				// append box to page
				$('.article_content').append(emptybox);

			}
		}

	    // Construct URLSearchParams object instance from current URL querystring.
	    var queryParams = new URLSearchParams(window.location.search);
	     
	    // Set new or modify existing parameter value. 
	    queryParams.set('lt', delnthchar(window.current_zid, 4, true));
	     
	    // Replace current querystring with the new one.
	    history.replaceState(null, null, '?'+queryParams.toString());

	}

	// fetch('content/' + pgx + '/' + pgx, {
	// 	"headers": {
	// 		"accept": "*/*",
	// 		"cache-control": "no-cache",
	// 		"pragma": "no-cache"
	// 	},
	// 	"referrerPolicy": "strict-origin-when-cross-origin",
	// 	"body": null,
	// 	"method": "GET",
	// 	"mode": "cors",
	// 	"credentials": "omit"
	// })
	// .then(response => response.text())
	// .then(data => pgload(data, pgx) );

	fetch('content/' + pgx + '/' + pgx, {
		"headers": {
			"accept": "*/*",
			"cache-control": "no-cache",
			"pragma": "no-cache"
		},
		"referrerPolicy": "strict-origin-when-cross-origin",
		"body": null,
		"method": "GET",
		"mode": "cors",
		"credentials": "omit"
	})
	.then(function(response) {
		console.log(response.status);
		response.text().then(function(data) {
			pgload(data, pgx, response.status)
		});
	});
}








function article_compiler()
{

/*	var zip = new JSZip();
	zip.file("Hello.txt", "Hello World\n");
	var img = zip.folder("images");
	// img.file("smile.gif", imgData, {base64: true});
	zip.generateAsync({type:"blob"})
	.then(function(content) {
	    // see FileSaver.js
	    saveAs(content, "example.zip");
	});
*/

	// collect our rubbish

	var constructed_article = {
		'atitle': 'nil',
		'boxes': [],
		'selfid': window.current_zid

	}


	// save title
	constructed_article['atitle'] = $('.arcl_header_p').text();

	var zip = new JSZip();
	var tut_data = zip.folder('content/' + window.current_zid + '/data');

	// collect boxes
    $('.tut_step').each(function(){
    	var madebox = {
    		'text': $(this).find('.tut_step_head_text').html(),
    		'contents': [],
    		'border_w': $(this).find('.tut_step_head_text').css('border-width'),
    		'border_c': $(this).find('.tut_step_head_text').css('border-color'),
    		'chapter': ''
    	}

    	// chapter, if any
    	if ($(this).find('.section_name').val().trim() != '')
    	{
    		madebox['chapter'] = $(this).find('.section_name').val().trim();
    	}


	    $(this).find('.tut_step_content').each(function(){
	    	var makecont = {
	    		'imguseurl': '0',
	    		'imgsize': ''
	    	}
	    	if ($(this).find('.imguseurl')[0].checked)
	    	{
	    		// todo: use true/false instead
    			makecont['imguseurl'] = '1';
    			makecont['imgurl'] = $(this).find('.c_image_url').val();
	    	}else{
	    		// make name
				var today = new Date();
				var mkimgname = CryptoJS.MD5(liz3_rndwave(256, 'flac', '')).toString() + '.' + $(this).find('.c_image_input')[0].files[0].type.split('/').at(-1);

/*				// var reader = new FileReader();
				var reader = new FileReaderSync();
				reader.readAsArrayBuffer($(this).find('.c_image_input')[0].files[0], 'UTF-8');
				reader.onload = function (evt) {
				    tut_data.file(mkimgname, reader.result);
				    console.log('ohno')
				}
*/
				// place the image into the folder
				tut_data.file(mkimgname, window[$(this).find('.c_image_input')[0]]);

				// append this image's name and extension as well as its original one
				makecont['imgn'] = mkimgname
				// original
				makecont['imgn_original'] = $(this).find('.c_image_input')[0].files[0].name
				// format
				makecont['img_ext'] = $(this).find('.c_image_input')[0].files[0].type.split('/').at(-1);

	    	}
	    	// img width, if any
	    	if ($(this).find('.c_image_size').val().trim() != '')
	    	{
	    		makecont['imgsize'] = $(this).find('.c_image_size').val().trim()
	    	}

	    	// finally, append content
	    	madebox['contents'].push(makecont);

	    });

	    constructed_article['boxes'].push(madebox);

    });

    // once done with all the steps - stringify and save as file
    zip.file('content/' + window.current_zid + '/' + window.current_zid, JSON.stringify(constructed_article));

    // also construct index
    // nav_stuff_box
	var make_index_html = $('.nav_stuff_box')[0].cloneNode(true);
	$(make_index_html).find('.ctg_button').remove();
    zip.file('content_index.sex', html_beautify($(make_index_html).html().replaceAll('\t', '').replaceAll('\n', '')));


	zip.generateAsync({type:'blob'})
	.then(function(content) {
	    // see FileSaver.js
	    saveAs(content, window.current_zid + '.zip');
	});
	console.log('ohfuck')

}


/*
zip.generateAsync({type:"blob"})
.then(function(content) {
    // see FileSaver.js
    saveAs(content, "exampled.zip");
});*/