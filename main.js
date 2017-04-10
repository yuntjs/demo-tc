$(document).ready(function(){
  var token = config.MY_KEY,
  productID = $('div.plugin')[0].getAttribute('data-celery'),
  arrOfTotals,
  backers,
  totalAmount = 0,
  goal = 500,
  amount,percentage;

  function setPercentage(){
    percentage = Math.floor((totalAmount / goal) * 100)
  }

  function viewAmount(){
    $('span.amount').html("$"+totalAmount);
  }

  function viewGoal(){
    $('span.goal').html("$"+goal);
  }

  function viewPercentage(){
    $('span.percentage').html(percentage+"%");
  }

  function viewBackers(){
    $('span.backers').html(backers);
  }

  function viewProgressBar(percentage){
    $('.progress-bar').attr("aria-valuenow" , percentage);
    $('.progress-bar').css("width" , percentage+'%');
    $('.progress-bar').html(percentage+"%");
  }

  function setViews(){
    viewAmount();
    viewGoal();
    viewPercentage();
    viewBackers();
    viewProgressBar(percentage);
  }


//-----------------------------------------------------------------------------------------------------------
  // Function that takes all the amount in a given order
  function setTotalAmount(orders){
    totalAmount = orders.reduce(function(total, order){
      return total + order.linetotal;
    }, 0) / 100;
  }

  $.ajax({
    url: 'https://api-sandbox.trycelery.com/v2/orders?line_items.product_id='+productID,
    method: 'GET',
    dataType: 'json',
    success: function(response){
      arrOfTotals = response.data;
      backers = arrOfTotals.length;

      //uses above function to set new total
      setTotalAmount(arrOfTotals);

      //sets the view on html page
      setPercentage();
      setViews();
    },
    error: function(err){
      console.err(err);
    },
    beforeSend: function(xhr, settings) {
      xhr.setRequestHeader('Authorization', token);
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
  });

//-----------------------------------------------------------------------------------------------------------

})
