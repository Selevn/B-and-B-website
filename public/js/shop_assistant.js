var cards = [];
var basket = [];
function recount() {
        let sum = 0;
        cards.forEach(function(item,i,cards)//summing all
        {
            sum+=parseInt(item.start_price)*parseInt(item.count);
        });
        $(".total_cost").text(sum);//changes total cost
        cards.forEach(function (item,i,cards) {

            $("#"+item.id+"_price").text(parseInt(item.start_price)*parseInt(item.count)+'$');
        })

}
function load(){ //как только загрузили странцу - в cards записали объекты
    $(".card").each(function(){
        let obj = {};
        obj.id = $(this).find(".card-id").text();
        obj.name = $(this).find(".card-title").text();
        obj.text = $(this).find(".card-text").text();
        obj.category = $(this).find(".card-subtitle").text();
        obj.price = $(this).find(".price").text();
        obj.start_price = $(this).find(".price").text();
        obj.count = $(this).find(".good_count_input").val();
        cards.push(obj);
    });
    if(window.location.pathname === "/basket")
        recount();
}
$( document ).ready(load());
//выводит карты с предметами
function print_item(item) {
    if(window.location.pathname === "/basket")
            var type_of_fa = "ban";
        else
            var type_of_fa = "shopping-cart";
        $('.goods_row').append('<div class="col-lg-4 card_holder">\n' +
            '                <div class="card">\n' +
            '                    <div class="card-body">\n' +
            '                        <div class="card-id" style="display:none">' + item.id + '</div>\n' +
            '                    <div class="card-title"><h5 >' + item.name + '</h5></div>\n' +
            '                        <h6 class="card-subtitle mb-2 text-muted">' + item.category + '</h6>\n' +
            '                        <hr>\n' +
            '                        <p class="card-text">' + item.text + '</p>\n' +
            '\n' +
            '                    </div>\n' +
            //'                    <div class="card-footer"><span class="price" id="'+item.id+'_price">' + item.price + '</span><span class="fa fa-shopping-cart buy add_good_in_backet" id="'+this.id+'_good"></span><input value = "1" class="good_count_input" id="'+item.id+'_count" type = "number" maxlength="4" max="3000" min="1"></span></div>\n' +
            '<div class="card-footer"><span class="price" id="'+item.id+'_price">'+item.price+'</span><span class="fa fa-'+type_of_fa+' buy add_good_in_backet " id="'+item.id+'_good"></span><input value = "'+item.count+'" class="good_count_input" id="'+item.id+'_count" type = "number" maxlength="4" max="3000" min="1"></div>\n' +
            '                </div>\n' +
            '            </div>'
        );

}

function nameSort(a,b)
{
    if (a.name>b.name) return 1;
    else if (a.name===b.name) return 0;
    else  return -1;

}
function priceSort(a,b)
{
    if (parseInt(a.price)>parseInt(b.price)) return 1;
    else if (parseInt(a.price)===parseInt(b.price)) return 0;
    else  return -1;
}
function catSort(a,b)
{
    if (a.category>b.category) return 1;
    else if (a.category===b.category) return 0;
    else  return -1;
}

function sorting_and_showing(comparation, type) {//отсортировали и вывели
    cards.sort(comparation);
    if (type === 0)
        cards.reverse();

    $(".card_holder").remove();//удаляем карты
    var sum=0;
    cards.forEach(function (item, i, cards) {
        print_item(item);
    });
}

var cost_flag=0,name_flag=0,cat_flag = 0;
$(".name_sort").on("click",function () {
    if(name_flag===0)
    {
        name_flag = 1;
        sorting_and_showing(nameSort,1)
    }
    else
    {
        name_flag = 0;
        sorting_and_showing(nameSort,0)
    }
});
$(".cat_sort").on("click",function () {
    if(cat_flag===0)
    {
        cat_flag = 1;
        sorting_and_showing(catSort,1)
    }
    else
    {
        cat_flag = 0;
        sorting_and_showing(catSort,0)
    }
});
$(".cost_sort").on("click",function () {
    if(cost_flag===0)
    {
        cost_flag = 1;
        sorting_and_showing(priceSort,1)
    }
    else
    {
        cost_flag = 0;
        sorting_and_showing(priceSort,0)
    }
});
//блок выше обрабатывает сортировку


//поиск элементов и вывод их
function find() {
    $(".card_holder").remove();
    let search = $("#search_goods").val();
    cards.forEach(function (item,i,cards) {
        if (item.name.indexOf(search)!=-1||item.category.indexOf(search)!=-1||item.text.indexOf(search)!=-1)
            print_item(item);
    });
}

//вызов поиска
$("#search_goods").on("keydown",find);
$(".search_but").on("click",find);


$('body').on("click",".add_good_in_backet", function() //добавляет в корзину товар
{

    if (window.location.pathname !== "/basket") {
        var id = parseInt($(this).attr('id'));
        var element;
        cards.forEach(function (item, i, cards) {
            if (parseInt(item.id) == id) {
                element = item;
            }
        });
        $(".total_cost").text(parseInt($(".total_cost").text()) + (parseInt(element.count) * parseInt(element.start_price))); // добавили в тотал цену
        var good = basket.find(item => item.id === id); //ищем есть ли он уже в корзине
        if (good)//if founded
            good.count = parseInt(element.count);//edit element in basket (?)
        else
            basket.push({id: parseInt(element.id), count: parseInt(element.count)});
        let json = JSON.stringify({"atr": basket});
        $(".basket_a").attr("href", "/basket?atr=" + json);
    }
    else
    {
        //deleting
        var id = parseInt($(this).attr('id'));
        var i=0;
        cards.forEach(function (item)
        {

           if(parseInt(item.id)===parseInt(id))
               {
                   $(".card_holder").remove();
                   cards.splice(i,1);
                   cards.forEach(function (item, i, cards) {
                       print_item(item);
                   });
               }
            i++;
        });
        $(".card_holder").remove();
        cards.splice(i,1);
        cards.forEach(function (item, i, cards) {
            print_item(item);
        });
        recount();
    }
});

function changes() //обновляет значения в цене при их изменениях
{
    if($(this).val()<1)$(this).val(1); //incorrect data fix
    var id = parseInt($(this).attr('id')); // taking id
    var element;
    cards.forEach(function(item,i,cards){
        if(parseInt(item.id) == id)
        {
            element = item;
        }
    });
    element.count = parseInt($(this).val()); // store new element count
        $("#"+id+"_price").text(parseInt(element.start_price)*parseInt(element.count)+'$');//cost change

    if(window.location.pathname === "/basket") //if calls from basket, with changes change total price
    {
        //seems, there no all items. Just selected. so we able to sum all obj from cards
        let sum = 0;
        cards.forEach(function(item,i,cards)//summing all
        {
            sum+=parseInt(item.start_price)*parseInt(item.count);
        });
        $(".total_cost").text(sum);//changes total cost
    }
}
//changes conditions
$('body').on("keydown",".good_count_input",changes);
$('body').on("change",".good_count_input",changes);

$('body').on("mouseenter",".add_good_in_backet",function() //greenification update of total cost
{
    if(window.location.pathname !== "/basket") {
        var id = parseInt($(this).attr('id'));
        var element;
        cards.forEach(function(item,i,cards){
            if(parseInt(item.id) == id)
            {
                element = item;
            }
        });
        $(".total_cost").css({"color": "green"});
        $(".total_cost").text(parseInt($(".total_cost").text())+ parseInt(element.count)*parseInt(element.price));
    }
});
function unhover()
{
    if(window.location.pathname !== "/basket") {
        var id = parseInt($(this).attr('id'));
        var element;
        cards.forEach(function(item,i,cards){
            if(parseInt(item.id) == id)
            {
                element = item;
            }
        });
        $(".total_cost").css({"color": ""});
        $(".total_cost").text(parseInt($(".total_cost").text())- parseInt(element.count)*parseInt(element.price));
    }
}
$('body').on("mouseleave",".add_good_in_backet",unhover);

function send_data() {

    var mail = /^[0-9A-Za-z\_\.]+@[A-Za-z]+\.+[A-Za-z]+$/;
    var mailin = $('#user_mail').val();
    if(!mail.test(mailin))
    {
        $('#user_mail').css({"border-color":"red"});
    }
    else {
        $('#user_mail').css({"border-color":""});
        var http = new XMLHttpRequest();
        var url = '/mailsend';
        http.open('POST', url, true);
        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                alert("Заказ успешно принят! Проверьте почтовый ящик.");
                //alert(http.responseText);
            }
        };
//Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        var sending_data = [];
        sending_data.push({mail: $('#user_mail').val()});
        cards.forEach(function (item, i, cards) {
            sending_data.push({id: item.id, count: item.count});
        });
        let json = JSON.stringify(sending_data);

        http.send("atr=" + json);
    }
}