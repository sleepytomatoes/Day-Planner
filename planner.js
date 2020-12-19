
  // dateFns.isToday(new Date())
  // //=> true

  // var test = dateFns.isToday(new Date())
  // console.log(test)



  // const date = new Date();
  // const today = new Intl.DateTimeFormat("en-GB", { dateStyle: "full"}).format();
  // var hours = eachHourOfInterval({
  //   start: new Date(2020, 11, 18, 9),
  //   end: new Date(2020, 11, 18, 17)
  // });
  // console.log(hours); // error: eachHourOfInterval is not defined
  // var content = $("#timeContent").textContent;
  // var timeOfDay = $(".time-slot");
  // var saveButton = $("#save");
  // $("#currentDay").append(today);
  
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

  const subContainer = $('.sub-container');
  const currentDay = $('#currentDay')
  const formattedDate = dateFns.format(new Date(), 'MM/DD/YYYY')
  currentDay.text(formattedDate)
  console.log(dateFns.format(new Date(), 'MM/DD/YYYY'))
 
  const result = dateFns.isFuture(new Date())

  let todayRightNow = new Date(),
  msSinceMidnight = todayRightNow.getTime() - todayRightNow.setHours(0,0,0,0);

  const militaryHour = msSinceMidnight / 3600000;

  let startingTime = 9;

  const notes = [{
    index: 0,
    note: ""
  }, {
    index: 1,
    note: ""
  }, {
    index: 2,
    note: ""
  }]

  for (i=0; i < 9; i++) {
    const rowHTML = `
    <div class="row-container">
    <div class="small-column time-column">
    ${formatTime(startingTime, i)}
    </div>
      <div class="medium-column"> 
        <textarea id="row-${i}" class="input-field ${getColorCode(militaryHour, getMilitaryTime(startingTime, i))}"></textarea>
      </div>
      <div class="small-column button-column">
        <button type="submit" id="button-${i}" class="button">Save <i class="fa fa-chevron-circle-right"></i></button>
      </div>
    </div>
    `
    subContainer.append(rowHTML)
    let buttonId = $(`#button-${i}`)
    // let newNote = $(`row-${i}`).value
    buttonId.on("click", saveNote(i, newNote))
  }

  function formatTime (startingTime, i) {
    const newTime = startingTime + i;
    if (newTime <= 11) {
      return `${newTime}:00AM`;
    } else if (newTime > 11) {
      return `${militaryToStandard(newTime)}:00PM`;
    }
  }

  function militaryToStandard (newTime) {
    if (newTime > 12) {
      return newTime - 12
    } else if (newTime = 12) {
      return newTime
    }
  }

  
function getColorCode (currentHour, rowHour) {
  if (currentHour > rowHour) {
    return "past"
  } else if (currentHour < rowHour) {
    return "future"
  } else if (Math.floor(currentHour) === rowHour) {
    return "present"
  }
    
}

function getMilitaryTime (startingTime, i) {
  const newTime = startingTime + i;
  return newTime
}

function saveNote (i, newNote) {

  notes[i].note = newNote
  console.log(i)

  renderNotes()
}

function renderNotes () {
  notes.forEach((note, i) => {
    const rowText = $(`row-${i}`)
    rowText.text(note)
  })
}