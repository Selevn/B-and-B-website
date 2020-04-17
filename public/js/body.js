
var click_count=0;


$('body').on("click",function () {
    click_count++;
    if(click_count>3)
    {
        $(".mouse_click_div").remove();
        click_count=0;
    }
    $('body').append('<div  style="top:'+(event.clientY)+'px;left:'+(event.clientX)+'px" class="mouse_click_div"></div>')
})

$(".narrow_input").on('click',function () {
    $("#"+this.id).append('<div  style="top:'+(event.clientY)+'px;left:'+(event.clientX)+'px" class="input_click_div"></div>')
});
$(".narrow_input").on('blur',function () {
    $("#"+this.id).css({"border-bottom":"",})
});
