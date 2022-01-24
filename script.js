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


	// reset article header border color to default
    const resethb = event.target.closest('.arcl_h_border_editor_reset');
    if (resethb) { $('.article_head').css('border-color', '#FF00A8') }

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

    // helper color picker
    const cmaker = event.target.closest('.color_maker');
    if (cmaker) { color_maker_helper() }

    // Header bat border picker
    const adhd = event.target.closest('.arcl_h_border_editor_inp');
    if (adhd) { $('.article_head').css('border-color', $(adhd).val()) }



});


document.addEventListener('focusout', event => {
    console.log('focusout_registered');
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



document.addEventListener('paste', event => {

	const imgpaster = event.target.closest('.c_image_url');
	if (imgpaster)
	{
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        console.log(JSON.stringify(items)); // might give you mime types
        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function (event) {
                    console.log(reader.result);
                    // var boobs = new Blob([reader.result], {type: etgt.files[0].type });
                    var boobs = new Blob([reader.result], {type: blob.type });
                    // create actual blob url
					var urlCreator = window.URL || window.webkitURL;
					var imageUrl = urlCreator.createObjectURL(boobs);
					
					$(imgpaster).closest('.tut_step_content').find('img')[0].src = imageUrl
					console.log(reader.result.length)

					// todo: (doesnt has to do anything with async) Why buffer? You can easily read blob as buffer later...
					// todo: make guid gen and assignation a separate function
					// todo: ffs organize this finally...
					var today = new Date();
					guidgen = CryptoJS.SHA256(today.getTime().toString() + liz3_rndwave(512, 'flac', '')).toString();
					$(imgpaster).closest('.image_editor').find('.c_image_input').attr('uuid', guidgen)
					window[guidgen] = reader.result

					$(imgpaster).closest('.image_editor').find('.imguseurl').prop('checked', false);

					// set file back to whatever
					// todo: this whole file thing is very poorly made now (it was organised when there was no paste whatsoever)
					// what if... a global image bank with abstract structure?
					// like a subfolder in the root or something
					// anyway, it now also has to account for url downloads from imgur or whatever

					var filez = new File([blob],'pasted'+liz3_rndwave(8, 'flac', ''),{type: blob.type });
					var containerz = new DataTransfer();
					containerz.items.add(filez);
					$(imgpaster).closest('.image_editor').find('.c_image_input')[0].files = containerz.files;

                }; 
                // reader.readAsDataURL(blob);
                // reader.readAsArrayBuffer(etgt.files[0], 'UTF-8');
                reader.readAsArrayBuffer(blob, 'UTF-8');
                console.log(blob)
            }
        }
	}

});


// todo: pro tip
/*
https://i.imgur.com/0bWuUB4.png
*/

/*
	// RAW BASE 64 !!!!!
	var dataURI = 'Qk3QAAAAAAAAAD4AAAAoAAAAEAAAABIAAAABAAQAAAAAAJIAAAASCwAAEgsAAAIAAAACAAAAAAAAAP///wAQAAAAAAAAAQAAAAAAAAAAAAAAERAAAAAAAAAQAAAAAAAAABEQAAAAAAAAABAAAAAAAAAAEAAAAAAAABEQAAAAEAAAAAAAAAEQAAAAAAAAAQAAAAAAAAAAAAAAEREQAAAAAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAEAAAAAAAABEQAAAAEAAAAAAAAAEAAA==';
	var base64Response = await fetch(`data:image/bmp;base64,` + dataURI);

	var blob = await base64Response.blob();

	var filez = new File([blob],'lel.bmp',{type:"image/bmp"});
	var containerz = new DataTransfer();
	
	// container.items.add(file);
	containerz.items.add(filez);
	//document.getElementById('lizards_pussy2').files = container.files;
	$0.files = containerz.files;
*/


function eval_ebox_margin()
{
	// todo: remove this function from everywhere
	return
	$('.at_border_edit_box').css('margin-right', '-' + ($('.at_border_edit_box').outerWidth(true) + 10).toString() + 'px');
}





// imortant todo: https://stackoverflow.com/questions/60581285/execcommand-is-now-obsolete-whats-the-alternative


// important todo:
// new editor:

/*
var ses = window.getSelection()
var nas = ses.getRangeAt(0)
nas.insertNode($('<a style="color:orange;">START</a>')[0])
nas.setStart(nas.endContainer, nas.endOffset)
nas.insertNode($('<a style="color:orange;">END</a>')[0])
// Extract html from the most parent node
// replace placeholders (START, END) with <> </>
// dont forget to generate super long random string instead of START and END
*/



















// box - box element
// mouse - x pos of cursor
function guibox(box, mousex, mousey)
{

	// DOES IT ACTUALLY MAKE ANY SENSE TO MEASURE THIS DYNAMICALLY ?????????????????????????????????????????????????????
	// $(".bmenu_root").removeClass("class_hidden");
	var boxy_thing = $(box)
	// wtf
	var cs_x = mousex;
	var cs_y = mousey;
	var calc_menu_y = cs_y;
	var calc_menu_x = cs_x;

	if (parseInt(cs_x) > ( window.innerWidth - boxy_thing.outerWidth(true) ) )
	{
	    var calc_menu_x = parseInt(cs_x) - ((parseInt(cs_x) + boxy_thing.outerWidth(true)) - window.innerWidth) - 20;
	    console.log('calc x is ' + calc_menu_x + ' original x is ' + cs_x);
	}

	if (parseInt(cs_y) > ( window.innerHeight - boxy_thing.outerHeight(true) ) )
	{
	    var calc_menu_y = parseInt(cs_y) - ((parseInt(cs_y) + boxy_thing.outerHeight(true)) - window.innerHeight) -  20;
	    console.log('calc is ' + calc_menu_y + ' original is ' + cs_y);
	}

	 console.log('calc is ' + calc_menu_y + 'original is ' + cs_y);

	boxy_thing
	    .css({
	    left: calc_menu_x,
	    top: calc_menu_y,
	});

}


// encode
function u8btoa(st) {
    return btoa(unescape(encodeURIComponent(st)));
}
// decode
function u8atob(st) {
    return decodeURIComponent(escape(atob(st)));
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

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
			// todo: create a smart nth returner function. DOne

			// can't have shit in js...
		    $('.nav_tutorial').each(function(){
		    	// check every id
		    	// downscale it first and then compare to the query
				var string = $(this).attr('asset_idx');
				var saltedString = delnthchar(string, 4, true)
				if (load_loc == saltedString)
				{
					// async !!!!
					pgloader(string)
				}

		    });
		}
		// cvready()
		// set min width thingies
		// todo: this is duplicated in page loader
		$('body').css('min-width', 1360 + $('.rquick_index').outerWidth(true));
		// $('.folder_name').prepend('<div class="folder_triangle"><div class="folder_triangle_ico"></div></div>');
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
			$('.nav-side').css('width', (parseInt($('.nav-side').css('width')) + 100).toString()+'px')
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
					<div class="format_buttons">
						<div wrapopts="bold" class="frmtbtns">B</div>
						<div wrapopts="italic" class="frmtbtns">I</div>
						<div wrapopts="underline" class="frmtbtns">U</div>
						<div wrapopts="strikeThrough" class="frmtbtns">str</div>
						<div wrapopts="forecolor" class="frmtbtns">C</div>
						<div wrapopts="createlink" class="frmtbtns">L</div>
						<div wrapopts="removeformat" class="frmtbtns">RM</div>
					</div>
				</div>

			`;
			// todo: catch the moment when user clicks that button and then simply replace <b> with whatever
			// or repurpose <font>... font[color="whatever"]{ padding: 2px } 
			// (color accepts any value)
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
					<div class="imgrow">
						<input class="c_image_url" type="text">
						<input class="imguseurl" type="checkbox">
						<input checked class="imgdlurl" type="checkbox">
					</div>
					<input class="c_image_size" type="number">
					<div class="image_deleter">Delete</div>
				</div>
			`;

			window.ctg_btns = 
			`

				<div fman_act="shuf" class="ctg_button shuffle_ctg_item">
					<div class="shuffle_ctg_item_top"><div class="btnsico"></div></div>
					<div class="shuffle_ctg_item_bot"><div class="btnsico"></div></div>
				</div>
				<div fman_act="mv_tut" class="ctg_button move_ctg_item"><div class="btnsico"></div></div>
				<div fman_act="del_tut" class="ctg_button del_ctg_item"><div class="btnsico"></div></div>
			`;

			window.folder_btns =
			`
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

			window.folder_htm = 
			`
				<div id_folder_name="nil" class="nav_folder">
					<div class="folder_name">
						<div class="folder_triangle"><div class="folder_triangle_ico"></div></div>
						<div contenteditable class="fname_text">Sample Text (MLG)</div>` + window.folder_btns + `</div>
					<div class="folder_content">
					</div>
				</div>
			`;

			var arcl_h_border_editor = 
			`
				<div class="arcl_h_border_editor">
					<input class="arcl_h_border_editor_inp" type="color">
					<div class="arcl_h_border_editor_reset">Reset</div>
				</div>

			`;


			$('.tut_step_head').append(border_edit_m);
			$('.tut_step').append(img_adder);
			$('.tut_step_content').append(img_editor);
			// todo: combine into one string
			$('.rquick_index').append('<div class="add_box">Add block</div>');
			$('.rquick_index').append('<div class="cum_on_a_lizard e_hidden">Save page</div>');
			$('.rquick_index').append('<div class="preview_page">Preview</div>');
			$('.rquick_index').append('<input type="text" class="frmtbtns textlink_input">');
			$('.rquick_index').append('<div class="imgeditjs"><input type="color" class="color_maker"><p style="color: white; padding: 3px; font-size: 19px;"></p></div>');
			$('.arcl_header').append(arcl_h_border_editor);
			$('.nav_tutorial').append(ctg_btns);
			$('.folder_name').append(folder_btns);

			// $('.fname_text, .tut_name_text').attr('contenteditable', true);

			$('.nav-side').append('<div fman_act="cancel" class="ctg_button ctg_cancel_operation">Cancel</div>')
			$('.nav_stuff_box').append('<div fman_act="rootpaste" class="e_hidden ctg_button ctg_rootpaste">Paste To Root</div><div fman_act="rootnewdir" class="ctg_button add_new_dir_to_root">Add New Dir To Root</div>')

			
			
			// read chapter, if any
		    $('.tut_step').each(function(){
		    	if(this.hasAttribute('id')){
		    		// todo: make this look better
		    		$(this).find('.tut_step_head').after($('<input class="section_name" type="text">').val($(this).attr('id')));
		    	}else{
		    		$(this).find('.tut_step_head').after('<input class="section_name" type="text">');
		    	}
		    });

		    // some width adjusements
		    eval_ebox_margin()
			

			// if an image has width style - show it
			// and show urls
			console.log($('.tut_step_content'));

			// tits = $('.tut_step_content');



		    $('.tut_step_content').each(function(){

				console.log(this);
				var ime = $(this).find('img');
				var target_f = $(this).find('.c_image_size');
				$(this).find('.c_image_url').val(ime.attr('src'));
				$(this).find('.imguseurl').prop('checked', true);
				$(this).find('.imgdlurl').prop('checked', false);
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
		    $('.page_content').css('min-width', 100 + 1360 + $('.rquick_index').outerWidth(true));
		}
		if (window.blender_edit_mode == true)
		{
			// todo: add a special class to all the editor elements for faster delete
			$('.ctg_button, .arcl_h_border_editor, .preview_page, .imgeditjs, .frmtbtns, .add_box, .cum_on_a_lizard, .at_border_edit_box, .image_editor, .image_adder_btn, .section_name').remove();
			$('.nav-side').removeAttr('style');
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


		var today = new Date();
		guidgen = CryptoJS.SHA256(today.getTime().toString() + liz3_rndwave(512, 'flac', '')).toString();
		$(etgt).attr('uuid', guidgen)
		window[guidgen] = reader.result

		// console.log(window[etgt])

		$(etgt).closest('.tut_step_content').find('.imguseurl').prop('checked', true);

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
	eval_ebox_margin()

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
	// todo: this now coud be toggled
	if (window.preview_mode == false){
		window.preview_mode = true

		// eval_to_colors()
	}else if(window.preview_mode == true){
		window.preview_mode = false
		// eval_to_code()
	}
}


function folder_toggler(etgt, evee, orign)
{
	console.log(orign)
	if(!$(orign)[0].hasAttribute('contenteditable') && !evee.altKey)
	{
		$(etgt).siblings('.folder_content').toggleClass('e_hidden');
		$(etgt).find('.folder_triangle_ico').toggleClass('folder_tri_closed');
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
	// 	<div class="shuffle_ctg_item_top"><div class="btnsico"></div></div>
	// 	<div class="shuffle_ctg_item_bot"><div class="btnsico"></div></div>
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



function wraptext(etgt)
{
	/*
	if ($(window.getSelection().anchorNode).closest('.single_lizrd_looking_for_sex').length > 0)
	{
		surroundSelection('<st bold strike color="#64DAFF">', '</st>')
	}
	*/
	var opts = null
	if ($(etgt)[0].hasAttribute('wrapdata')){
		var opts = $(etgt).attr('wrapdata');
	}
	// special needs
	if ($(etgt).attr('wrapopts') == 'forecolor'){
		var opts = $('.color_maker').val();
	}
	// oof, special needs again
	// at this point... create an action dictionary for every possible input...
	if ($(etgt).attr('wrapopts') == 'createlink'){
		var opts = $('.textlink_input').val();
	}
	// but like... who cares...
	if ($(etgt).attr('wrapopts') == 'removeformat'){
		// removeformat
		document.execCommand('unlink', false, null);
	}



	// strikeThrough
	console.log(opts)
	console.log($(etgt).attr('wrapopts'))
	document.execCommand($(etgt).attr('wrapopts'), false, opts);
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
	$(etgt).text($(etgt).text());
	$(etgt).css('user-select', '');
}

function ctg_name_actuator(etgt, evee)
{
	if(evee.altKey)
	{
		$(etgt).attr('contenteditable', true).focus();
		$(etgt).css('user-select', 'text');
	}else{
		if ($(etgt).hasClass('tut_name_text') && !$(etgt)[0].hasAttribute('contenteditable') && !window.blender_edit_mode)
		{
			pgloader($(etgt).closest('.nav_tutorial').attr('asset_idx'))
		}
	}
}


// well, it as such a cute little function before the url loader story...
function img_preview_set_url(etgt)
{
	if($(etgt).closest('.image_editor').find('.imgdlurl')[0].checked)
	{
		fetch($(etgt).val())
				.then(function(response) {
				console.log(response.status);
				response.arrayBuffer().then(function(data) {
					console.log(data);
                    var boobs = new Blob([data], {type: 'image/' + $(etgt).val().split('.').at(-1)});
                    // create actual blob url
					var urlCreator = window.URL || window.webkitURL;
					var imageUrl = urlCreator.createObjectURL(boobs);
					$(etgt).closest('.tut_step_content').find('img')[0].src = imageUrl

					var today = new Date();
					guidgen = CryptoJS.SHA256(today.getTime().toString() + liz3_rndwave(512, 'flac', '')).toString();
					$(etgt).closest('.image_editor').find('.c_image_input').attr('uuid', guidgen)
					window[guidgen] = data


					// set file back
					// todo: duplicated code
					var filez = new File([boobs],'loaded'+liz3_rndwave(8, 'flac', ''),{type: boobs.type });
					var containerz = new DataTransfer();
					containerz.items.add(filez);
					$(etgt).closest('.image_editor').find('.c_image_input')[0].files = containerz.files;


				});
		});

	}else{
		var image_slot = $(etgt).closest('.tut_step_content').find('img');
		$(image_slot)[0].src = $(etgt).val();
	}

}





function pgloader(pgx)
{

	function pgload(ct, ref_index, rscode)
	{


		if (rscode == 404)
		{
			$('.tut_step').remove();
			$('.rquick_index').empty();
			$('.arcl_header_p').text('Error: DE-GFAL. (page does not exist)');
			window.current_zid = ref_index
			$('.nav_tutorial .tut_name_text').removeAttr('style');
			$('.nav_tutorial[asset_idx="' + ref_index + '"] .tut_name_text').css('border-left', '2px solid #63b6d7');

		}else{
			window.current_zid = ref_index
			$('.nav_tutorial .tut_name_text').removeAttr('style');
			$('.nav_tutorial[asset_idx="' + ref_index + '"] .tut_name_text').css('border-left', '2px solid #63b6d7');
			console.log('.nav_tutorial[asset_idx="' + ref_index + '"] .tut_name_text')
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
							<div class="tut_step_head_text"></div>
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
			$('.page_content').css('min-width', 1360 + $('.rquick_index').outerWidth(true));
		}

	    // Construct URLSearchParams object instance from current URL querystring.
	    var queryParams = new URLSearchParams(window.location.search);
	     
	    // Set new or modify existing parameter value. 
	    queryParams.set('lt', delnthchar(window.current_zid, 4, true));
	     
	    // Replace current querystring with the new one.
	    // only keep hastag if it's actually present on the page
	    // fun fact: JQuery shat itself

	    var addhash = ''
	    /*
	    
	    if (document.getElementById(decodeURI(window.location.hash).replace('#', '')) != null){
	    	var addhash = window.location.hash
	    	// even though I like chrome more - mozilla is extra giga chad in this situation
	    }
	    history.replaceState(null, null, '?'+queryParams.toString() + addhash);
	    // ok now THIS is annoying...
	    if (addhash != ''){
	    	document.getElementById(decodeURI(window.location.hash).replace('#', '')).scrollIntoView();
	    }
	    */
	    
	    if (document.getElementById(decodeURI(window.location.hash).replace('#', '')) != null){
	    	var addhash = window.location.hash

			setTimeout(function() {
			    document.getElementById(decodeURI(window.location.hash).replace('#', '')).scrollIntoView()
			}, 200);

	    	
	    	// even though I like chrome more - mozilla is extra giga chad in this situation
	    }
	    history.replaceState(null, null, '?'+queryParams.toString() + addhash);


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
				if ($(this).find('.c_image_input')[0].hasAttribute('gn_name'))
				{
					var mkimgname = $(this).find('.c_image_input').attr('gn_name')
				}else{
					var mkimgname = CryptoJS.MD5(liz3_rndwave(256, 'flac', '')).toString() + '.' + $(this).find('.c_image_input')[0].files[0].type.split('/').at(-1);
					// save generated name
					$(this).find('.c_image_input').attr('gn_name', mkimgname);
				}

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
async function getfetch(specific)
{

	var totalhax = await fetch($(this).find(''));
	var blob = await totalhax.arrayBuffer();

}
*/


function article_compiler_py()
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

	// create python payload
	var payload = {
		'arcl': '',
		'imgs': [],
		'iddqd': window.current_zid
	}

	// collect our rubbish

	var constructed_article = {
		'atitle': 'nil',
		'boxes': [],
		'selfid': window.current_zid

	}


	// save title
	constructed_article['atitle'] = $('.arcl_header_p').text();

	// var zip = new JSZip();
	// var tut_data = zip.folder('content/' + window.current_zid + '/data');

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
	    	if ($(this).find('.imguseurl')[0].checked && !$(this).find('.imgdlurl')[0].checked)
	    	{
	    		// todo: use true/false instead
    			makecont['imguseurl'] = '1';
    			makecont['imgurl'] = $(this).find('.c_image_url').val();
	    	}else{
	    		// make name
	    		// todo: make a check for malformed file input data (like unspecified files etc)
				var today = new Date();
				if ($(this).find('.c_image_input')[0].hasAttribute('gn_name'))
				{
					var mkimgname = $(this).find('.c_image_input').attr('gn_name')
				}else{
					// it just seems cool to do it the total hax way (md5 hash n shit)
					var mkimgname = CryptoJS.MD5(liz3_rndwave(256, 'flac', '')).toString() + '.' + $(this).find('.c_image_input')[0].files[0].type.split('/').at(-1);
					// save generated name
					$(this).find('.c_image_input').attr('gn_name', mkimgname);
				}

/*				// var reader = new FileReader();
				var reader = new FileReaderSync();
				reader.readAsArrayBuffer($(this).find('.c_image_input')[0].files[0], 'UTF-8');
				reader.onload = function (evt) {
				    tut_data.file(mkimgname, reader.result);
				    console.log('ohno')
				}
*/
				// place the image into the folder
				// tut_data.file(mkimgname, window[$(this).find('.c_image_input')[0]]);
				var im = {}
				console.log(arrayBufferToBase64(window[$(this).find('.c_image_input').attr('uuid')]))
				im['dat'] = arrayBufferToBase64(window[$(this).find('.c_image_input').attr('uuid')]);
				im['nm'] = mkimgname;
				payload['imgs'].push(im);

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
    // zip.file('content/' + window.current_zid + '/' + window.current_zid, JSON.stringify(constructed_article));
    payload['arcl'] = u8btoa(JSON.stringify(constructed_article));

    // also construct index
    // nav_stuff_box
	var make_index_html = $('.nav_stuff_box')[0].cloneNode(true);
	$(make_index_html).find('.ctg_button').remove();
	$(make_index_html).find('.tut_name_text').removeAttr('style');
    // zip.file('content_index.sex', html_beautify($(make_index_html).html().replaceAll('\t', '').replaceAll('\n', '')));
    payload['ctlg'] = u8btoa(html_beautify($(make_index_html).html().replaceAll('\t', '').replaceAll('\n', '')));
    
    var blob = new Blob([JSON.stringify(payload)], {type: 'text/plain'});
    $('.cum_on_a_lizard').css('outline', '3px solid cyan');
	fetch("htbin/manager.py", {
		"headers": {
			"accept": "*/*",
			"cache-control": "no-cache",
			"pragma": "no-cache"
		},
		"referrerPolicy": "strict-origin-when-cross-origin",
		"body": blob,
		"method": "POST",
		"mode": "cors",
		"credentials": "omit"
	})
	// .then(response => response.text())
	// .then(data => console.log(data));
	.then(function(response) {
		console.log(response.status);
		response.text().then(function(data) {
			if(data.includes('youve_succesfully_came_all_over_a_lizard')){
				$('.cum_on_a_lizard').css('outline', '3px solid green');
			}else{
				$('.cum_on_a_lizard').css('outline', '3px solid red');
				console.log(data)
			}
		});
	});





    /*
	zip.generateAsync({type:'blob'})
	.then(function(content) {
	    // see FileSaver.js
	    saveAs(content, window.current_zid + '.zip');
	});
	*/
	console.log('ohfuck')

}




/*
zip.generateAsync({type:"blob"})
.then(function(content) {
    // see FileSaver.js
    saveAs(content, "exampled.zip");
});*/



function imgmax(etgt)
{
	$('.imgzoom').removeClass('e_hidden');
	document.querySelector('body').style.overflow = 'hidden'
	$('.imgzoom img')[0].src = $(etgt)[0].src
	var imgw = $('.imgzoom img').width()
	// downscale image if doesnt fit
	if(window.innerWidth < imgw)
	{
		$('.imgzoom img').css('width', imgw * (window.innerWidth / imgw))
		$('.imgzoom img').css('height', 'auto')
	}
}

function imgmin()
{
	$('.imgzoom').addClass('e_hidden');
	$('.imgzoom img').removeAttr('style');
	document.querySelector('body').style.overflow = 'visible'
}

function is_e(el, is)
{
	return $(el).hasClass(is)

}

// takes text input as an input
function ctg_name_apply(etgt, evee)
{
	if (evee.keyCode == 13)
	{
		$(etgt).removeAttr('contenteditable');
		$(etgt).blur();
	}
}



function color_maker_helper()
{
	$('.color_maker').siblings('p').text($('.color_maker').val());
}


/*
function cvready()
{
	var canvas = document.getElementsByTagName('canvas')[0];
	// canvas.width = 800;
	// canvas.height = 600;

	// canvas.width = $('canvas').width();
	// canvas.height = $('canvas').height();

	var heightRatio = 1;
	// canvas.width = canvas.width * heightRatio;


	var gkhead = new Image;

	window.onload = function(){
    
		    var ctx = canvas.getContext('2d');
		    trackTransforms(ctx);
		  
    function redraw(){

          // Clear the entire canvas
          var p1 = ctx.transformedPoint(0,0);
          var p2 = ctx.transformedPoint(canvas.width,canvas.height);
          ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

          ctx.save();
          ctx.setTransform(1,0,0,1,0,0);
          ctx.clearRect(0,0,canvas.width,canvas.height);
          ctx.restore();

          ctx.drawImage(gkhead,0,0);

        }
        redraw();

      var lastX=canvas.width/2, lastY=canvas.height/2;

      var dragStart,dragged;

      canvas.addEventListener('mousedown',function(evt){
          document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
          lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
          lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
          dragStart = ctx.transformedPoint(lastX,lastY);
          dragged = false;
      },false);

      canvas.addEventListener('mousemove',function(evt){
          lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
          lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
          dragged = true;
          if (dragStart){
            var pt = ctx.transformedPoint(lastX,lastY);
            ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
            redraw();
                }
      },false);

      canvas.addEventListener('mouseup',function(evt){
          dragStart = null;
          if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
      },false);

      var scaleFactor = 1.1;

      var zoom = function(clicks){
          var pt = ctx.transformedPoint(lastX,lastY);
          ctx.translate(pt.x,pt.y);
          var factor = Math.pow(scaleFactor,clicks);
          ctx.scale(factor,factor);
          ctx.translate(-pt.x,-pt.y);
          redraw();
      }

      var handleScroll = function(evt){
          var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
          if (delta) zoom(delta);
          return evt.preventDefault() && false;
      };
    
      canvas.addEventListener('DOMMouseScroll',handleScroll,false);
      canvas.addEventListener('mousewheel',handleScroll,false);
	};

	gkhead.src = 'assets/2killsphillip_getreal.png';
	
	// Adds ctx.getTransform() - returns an SVGMatrix
	// Adds ctx.transformedPoint(x,y) - returns an SVGPoint

	function trackTransforms(ctx){
      var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
      var xform = svg.createSVGMatrix();
      ctx.getTransform = function(){ return xform; };

      var savedTransforms = [];
      var save = ctx.save;
      ctx.save = function(){
          savedTransforms.push(xform.translate(0,0));
          return save.call(ctx);
      };
    
      var restore = ctx.restore;
      ctx.restore = function(){
        xform = savedTransforms.pop();
        return restore.call(ctx);
		      };

      var scale = ctx.scale;
      ctx.scale = function(sx,sy){
        xform = xform.scaleNonUniform(sx,sy);
        return scale.call(ctx,sx,sy);
		      };
    
      var rotate = ctx.rotate;
      ctx.rotate = function(radians){
          xform = xform.rotate(radians*180/Math.PI);
          return rotate.call(ctx,radians);
      };
    
      var translate = ctx.translate;
      ctx.translate = function(dx,dy){
          xform = xform.translate(dx,dy);
          return translate.call(ctx,dx,dy);
      };
    
      var transform = ctx.transform;
      ctx.transform = function(a,b,c,d,e,f){
          var m2 = svg.createSVGMatrix();
          m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
          xform = xform.multiply(m2);
          return transform.call(ctx,a,b,c,d,e,f);
      };
    
      var setTransform = ctx.setTransform;
      ctx.setTransform = function(a,b,c,d,e,f){
          xform.a = a;
          xform.b = b;
          xform.c = c;
          xform.d = d;
          xform.e = e;
          xform.f = f;
          return setTransform.call(ctx,a,b,c,d,e,f);
      };
    
      var pt  = svg.createSVGPoint();
      ctx.transformedPoint = function(x,y){
          pt.x=x; pt.y=y;
          return pt.matrixTransform(xform.inverse());
      }
	}
	

}
*/