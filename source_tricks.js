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









function img_toggler(etgt)
{
    // $(etgt).closest('.tut_step').find('img').toggleClass('e_hidden');
    $(etgt).closest('.tut_step').find('.tut_step_content').toggleClass('e_hidden');
    $(etgt).closest('.tut_step').find('.image_adder_btn').toggleClass('e_unclickable');
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
            pgloader($(etgt).closest('.nav_tutorial').attr('asset_idx'))
        }
    }
}



















// ============================================================
// ============================================================
//                              Page load
// ============================================================
// ============================================================

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