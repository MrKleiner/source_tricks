$(document).ready(function(){
  $(".tut_head_button_splr").click(function(){
    // $(".tut_step_content").toggleClass("tut_step_content_closed");
    $(".tut_img").toggleClass("tut_step_content_slide_up");
    $(".tut_step_content").toggleClass("tut_step_content_closed");
     });
  
  $(".tut_head_button_splr_01").click(function(){
    $(".tut_step_content_01").toggleClass("tut_step_content_closed");
     });
  
  $(".tut_head_button_splr_02").click(function(){
    $(".tut_step_content_02").toggleClass("tut_step_content_closed");
     });
  
  $(".tut_head_button_splr_03").click(function(){
    $(".tut_step_content_03").toggleClass("tut_step_content_closed");
     });
});