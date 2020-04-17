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

var all = []; // id and start price
var resp = "/basket?";
var busket = [];
//todo: basket start normal counts+prices, total cost basket fix
function recount () //пересчитать элементы
{ var sum = ''; $(".good_count_input").each(function () { //для каждого элемента с вводом
   if($(this).val()<1)$(this).val(1); //проверка на корректность
   var this_price = parseInt($(this).attr('id'))+"_price"; //парсим цену
   let tmp = {id:parseInt($(this).attr('id')), price:parseInt($("#"+this_price).text()),count:parseInt($(this).val())};//временный объект
   all.push(tmp);//добавление в массив
   //$("#"+this_price).text($(this).val()*tmp.price+'$');
   if(window.location.pathname === "/basket"); //если корзина
      //$(".total_cost").text(parseInt($(".total_cost").text())+parseInt($(this).val()*tmp.price)); //добавление?

})}
$( document ).ready(function(){
      $(".total_cost").text(0);
      $(".good_count_input").each(function () {
         if($(this).val()<1)$(this).val(1);
         var this_price = parseInt($(this).attr('id'))+"_price";
         let tmp = {id:parseInt($(this).attr('id')), price:parseInt($("#"+this_price).text()),count:parseInt($(this).val()),start_price:parseInt($("#"+this_price).text())};
         var good = all.find(item => item.id === tmp.id);
         if(good)
         {
            $("#"+this_price).text(good.start_price*good.count+'$');
         }
         else
         {
            all.push(tmp);
            $("#"+this_price).text(tmp.count*tmp.start_price+'$');
         }
         if(window.location.pathname === "/basket")
         {
            console.log("summing costs");

            //recount every count
            var sum =0;
            $(".price").each(function () {
               var price = parseInt($(this).text());
               sum+=price;
               console.log(price);
            });
            $(".total_cost").text(sum);
         }
      });
         //var this_price = parseInt($(this).attr('id'))+"_price";
         //$("#"+this_price).text($(this).val()*parseInt($("#"+this_price).text())+'$');
      //});
   //recount()
});

$('body').on("click",".add_good_in_backet",function() //добавляет в корзину товар
{
   var temp = parseInt($(this).attr('id'));
   var id = parseInt($(this).attr('id'));
   var count = parseInt($('#'+temp+'_count').val());
   var start_cost = parseInt($(".total_cost").text());
   var this_price = parseInt($(this).attr('id'))+"_price";
   var price = parseInt($("#"+this_price).text());
   $(".total_cost").text(price+start_cost);
   var good = busket.find(item => item.id === id);
   if (good)
   {
      good.count += count;
      resp = "/basket?";
      busket.forEach(function(item,i,busket){
         resp+="basket[id]="+item.id+"&basket[count]="+item.count+"&";});
         let json = JSON.stringify({"atr":busket});
         $("a").attr("href", "/basket?atr="+json);

   }
   else {
      busket.push({id: id, count: count});
      let json = JSON.stringify({"atr":busket});
      $("a").attr("href", "/basket?atr="+json);
   }


});
function changes() //обновляет значения в цене
{
   if($(this).val()<1)$(this).val(1);
   var this_price = parseInt($(this).attr('id'))+"_price";
   let tmp = {id:parseInt($(this).attr('id')), price:parseInt($("#"+this_price).text()),count:parseInt($(this).val())};
   var good = all.find(item => item.id === tmp.id);
   if(good)
   {
      good.count = tmp.count;
      $("#"+this_price).text(good.start_price*good.count+'$');//$(this).val()
   }
   else
   {
      all.push(tmp);
      $("#"+this_price).text(tmp.count*tmp.price+'$');
   }
   if(window.location.pathname === "/basket") //если запуск из корзины, то при изменении обновляем общую стоимость
   {
      console.log("summing costs");
      var sum =0;
      all.forEach(function (item) {
         sum+=parseInt(item.start_price)*(item.count);
         console.log("sums "+sum);
      });
      $(".total_cost").text(sum);
   }
}

$('body').on("keydown",".good_count_input",changes);//изменения полей
$('body').on("change",".good_count_input",changes);

$('body').on("mouseenter",".add_good_in_backet",function() //подсвечивание зеленым цветом при наведении
{
   if(window.location.pathname !== "/basket") {
      var start_cost = parseInt($(".total_cost").text());
      var this_price = parseInt($(this).attr('id')) + "_price";
      var price = parseInt($("#" + this_price).text());
      $(".total_cost").css({"color": "green"});
      $(".total_cost").text(price + start_cost);
   }
});
$('body').on("mouseleave",".add_good_in_backet",function()
{
   if(window.location.pathname !== "/basket") {
   var start_cost = parseInt($(".total_cost").text());
   var this_price = parseInt($(this).attr('id'))+"_price";
   var price = parseInt($("#"+this_price).text());
   $(".total_cost").css({"color":""});
   $(".total_cost").text(-price+start_cost);
   }
});
