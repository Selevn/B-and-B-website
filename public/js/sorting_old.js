var cards = [];

$(".card").each(function(){
    let obj = {};
    obj.id = $(this).find(".card-id").text();
    obj.name = $(this).find(".card-title").text();
    obj.text = $(this).find(".card-text").text();
    obj.category = $(this).find(".card-subtitle").text();
    obj.price = $(this).find(".price").text();
    obj.count = $(this).find(".good_count_input").val();
    cards.push(obj);
});

function refresh_cards(){
    cards = [];

    $(".card").each(function(){
        let obj = {};
        obj.id = $(this).find(".card-id").text();
        obj.name = $(this).find(".card-title").text();
        obj.text = $(this).find(".card-text").text();
        obj.category = $(this).find(".card-subtitle").text();
        obj.price = $(this).find(".price").text();
        obj.count = $(this).find(".good_count_input").val();
        cards.push(obj);
    });
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

function sorting_and_showing(comparation, type) {

    refresh_cards();

    cards.sort(comparation);
    if (type === 0)
        cards.reverse();


    $(".card_holder").remove();
    var sum=0;
    cards.forEach(function (item, i, cards) {
        sum+=parseInt(item.price);
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
            '<div class="card-footer"><span class="price" id="'+item.id+'_price">'+item.price+'</span><span class="fa fa-shopping-cart buy add_good_in_backet " id="'+item.id+'_good"></span><input value = "'+item.count+'" class="good_count_input" id="'+item.id+'_count" type = "number" maxlength="4" max="3000" min="1"></div>\n' +
            '                </div>\n' +
            '            </div>'
        );
    });
    if(window.location.pathname === "/basket")
        $(".total_cost").text(sum);
    recount();
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
function find() {
    $(".card_holder").remove();
    let search = $("#search_goods").val();
    cards.forEach(function (item,i,cards) {
        if (item.name.indexOf(search)!=-1||item.category.indexOf(search)!=-1||item.text.indexOf(search)!=-1) {
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
                '<div class="card-footer"><span class="price" id="'+item.id+'_price">'+item.price+'</span><span class="fa fa-shopping-cart buy add_good_in_backet " id="'+item.id+'_good"></span><input value = "'+item.count+'" class="good_count_input" id="'+item.id+'_count" type = "number" maxlength="4" max="3000" min="1"></div>\n' +
                '                </div>\n' +
                '            </div>'
            );
        }

    });
}
$("#search_goods").on("keydown",find);
$(".search_but").on("click",find);


