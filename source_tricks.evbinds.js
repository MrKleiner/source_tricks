document.addEventListener('click', tr_event => {


	// ==========================================
	// 	core core
	// ==========================================

	if (event.target.closest('.imgmax')){window.bootlegger.core.maximize_image(event.target.closest('.imgmax'))}
	if (event.target.closest('#img_fullscreen')){window.bootlegger.core.remove_fullscreen_img(event.target.closest('#img_fullscreen'))}


});


