let item = document.getElementById("mybox")

console.log(item);



$(".card").hover(function(){
    $(this).css("box-shadow","0 15px 20px 0 rgba(0, 0, 0, 0.2), 0 15px 30px 0 rgba(0, 0, 0, 0.19)");
    $(this).effect("scale");
    }, function(){
    $(this).css("box-shadow", "0 0 0");
  });




  