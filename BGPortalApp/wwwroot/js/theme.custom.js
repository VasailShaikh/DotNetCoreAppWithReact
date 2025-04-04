/* Add here all your JS customizations */


$(document).ready(function () {
    $('.veticla-selection input').click(function () {
    $('.veticla-selection input:not(:checked)').parent().removeClass("active");
    $('.veticla-selection input:checked').parent().addClass("active");
  
   }); 
 });
 $(document).ready(function() {
  $('.dropdown-menu').click(function(e) {
    e.stopPropagation();
  });
})



$(".gradeX .edit-row2").one('click', function(){
  $(this).parent().parent().after("<tr class='test'><td colspan='3'> <form class='form-inline info_add_form'><div class='form-group'><input type='text' class='form-control' placeholder='Name' value=''><button class='btn btn-primary'>Update</button><button class='btn btn-primary'>Cancel</button></div></form></td></tr>");
});


//disable row start

  $('.switch input:checkbox').change(function(){
    if($(this).is(":checked")) {
        $(this).parent().parent().parent().parent().addClass("grey");
    } else {
      $(this).parent().parent().parent().parent().removeClass("grey");
    }
});

//disable row end




$('.all').on('click', function(e){
  $this = this;  
  $.each($(this).parents('table').find('input'), function(i, item){
    $(item).prop('checked', $this.checked);
  });
  });
  
  

  //  Show hide update panel //
  $(".edit-click").click('click', function(){
    debugger
       $("#addPrjoectDiv").hide();
       $("#updatePrjoectDiv").show();

  });

  $(".cancelEdit-click").click('click', function(){
    debugger
    $("#addPrjoectDiv").show();
    $("#updatePrjoectDiv").hide();

});
$(".replogo").click('click', function(){
  debugger
     $("#uploadlogo").show();

});

$(".edit-click1").click('click', function(){
  debugger
     $("#updatePrjoectDiv1").show();

});
  // End //

// Add Client //

  $(".add-client").click(function(){
    $(".add-new-client").slideDown(500);
    $(".client-info").slideUp(500);
  });
  $(".cancel-client").click(function(){
    $(".add-new-client").slideUp(500);
  }); 

  $(".add-client-info").click(function(){
    $(".client-info").slideDown(500);
    $(".add-new-client").slideUp(500);
  });
  $(".cancel-client-info").click(function(){
    $(".client-info").slideUp(500);
  });

  // Add Client end//

  // Edit name //


  //$(".edit-name").click(function(){

   // console.log($(this).parent().addClass('edited-action'));
  //  console.log($(this).parent().parent().children("td:nth-child(2)").find('input').addClass('edited'));


   // $(".name-field").prop('disabled', false);
   // $(".save-row").removeClass("hidden");
   // $(".edit-name").addClass("hidden")
  //});


//  $(".save-row").click(function(){

   // console.log($(this).parent().removeClass('edited-action'));
   // console.log($(this).parent().parent().children("td:nth-child(2)").find('input').removeClass('edited'));


   // $(".name-field").prop('disabled', false);
    //$(".save-row").removeClass("hidden");
    //$(".edit-name").addClass("hidden")
 // });




  //$(".save-row").click(function(){
   // $(".name-field").prop('disabled', true);
   // $(".save-row").addClass("hidden");
   // $(".edit-name").removeClass("hidden")
 // });



 $(function () {

  $('body').on('click', '.list-group .list-group-item', function () {
      $(this).toggleClass('active');
  });
  $('.list-arrows button').click(function () {
      var $button = $(this), actives = '';
      if ($button.hasClass('move-left')) {
          actives = $('.list-right ul li.active');
          actives.clone().appendTo('.list-left ul');
          actives.remove();
      } else if ($button.hasClass('move-right')) {
          actives = $('.list-left ul li.active');
          actives.clone().appendTo('.list-right ul');
          actives.remove();
      }
  });
  $('.dual-list .selector').click(function () {
      var $checkBox = $(this);
      if (!$checkBox.hasClass('selected')) {
          $checkBox.addClass('selected').closest('.well').find('ul li:not(.active)').addClass('active');
          $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
      } else {
          $checkBox.removeClass('selected').closest('.well').find('ul li.active').removeClass('active');
          $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
      }
  });
  $('[name="SearchDualList"]').keyup(function (e) {
      var code = e.keyCode || e.which;
      if (code == '9') return;
      if (code == '27') $(this).val(null);
      var $rows = $(this).closest('.dual-list').find('.list-group li');
      var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
      $rows.show().filter(function () {
          var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
          return !~text.indexOf(val);
      }).hide();
  });

});

 