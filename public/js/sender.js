var XSSdestroy = new RegExp("");

var namein = $('#name_input').val()+'';

var theme = $('#theme_input').val();



function send_form()
{
    $(".errormsg").remove();
    $('#theme_input').css({"border":"","border-radius":""});
    $('#name_input').css({"border":"","border-radius":""});
    $('#email_input').css({"border":"","border-radius":""});
    $('#text_input').css({"border":"","border-radius":""});
    var name = /^[A-Za-zа-яА-я\s]+$/;
    var theme = /^[A-Za-zа-яА-я0-9\.\,\-\_\?\(\)\%\$\!\s]+$/;
    var mail = /^[0-9A-Za-z\_\.]+@[A-Za-z]+\.+[A-Za-z]+$/;
    var text = /^[A-Za-zа-яА-я0-9\.\,\-\_\?\(\)\%\$\!\s]+$/;

    var namein = $('#name_input').val();
    var mailin = $('#email_input').val();
    var themein = $('#theme_input').val();
    var textin = $('#text_input').val();


    if(!name.test(namein))
    {
        $('#name_label').after("<span class='errormsg' style='color:red; font-size: .8rem; padding-left: 1rem'>Введите корректное имя</span>");
        $('#name_input').css({"border":"1.5px solid red","border-radius":".3rem"});
    }
    if(!theme.test(themein))
    {
        $('#theme_label').after("<span class='errormsg' style='color:red; font-size: .8rem; padding-left: 1rem'>Введите корректную тему</span>");
        $('#theme_input').css({"border":"1.5px solid red","border-radius":".3rem"});
    }
    if(!mail.test(mailin))
    {
        $('#email_label').after("<span class='errormsg' style='color:red; font-size: .8rem; padding-left: 1rem'>Введите корректный Email</span>");
        $('#email_input').css({"border":"1.5px solid red","border-radius":".3rem"});
    }
    if(!text.test(textin))
    {
        $('#text_label').after("<span class='errormsg' style='color:red; font-size: .8rem; padding-left: 1rem'>Введите корректную тему</span>");
        $('#text_input').css({"border":"1.5px solid red","border-radius":".3rem"});
    }

    /*alert();
    alert(mail.test(mailin));
    alert(theme.test(themein));
    alert(text.test(textin));*/
}