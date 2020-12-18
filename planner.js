
  // dateFns.isToday(new Date())
  // //=> true

  // var test = dateFns.isToday(new Date())
  // console.log(test)



  const date = new Date();
  const today = new Intl.DateTimeFormat("en-GB", { dateStyle: "full"}).format();
  var hours = eachHourOfInterval({
    start: new Date(2020, 11, 18, 9),
    end: new Date(2020, 11, 18, 17)
  });
  console.log(hours); // error: eachHourOfInterval is not defined
  var content = $("#timeContent").textContent;
  var timeOfDay = $(".time-slot");
  var saveButton = $("#save");
  $("#currentDay").append(today);
  
  // var savedTimeContent = localStorage.getItem("savedTimeContent");
  
  // content.textContent = savedTimeContent;

  // saveButton.click(function() {
  //   content.textContent = savedTimeContent;
  //   localStorage.setItem("savedTimeContent", content)
  // });

  //  if isFuture(timeOfDay) {
  //    timeOfDay.css('background-color', 'green');
  //  }
  // if (timeOfDay.value) {
    
  // }