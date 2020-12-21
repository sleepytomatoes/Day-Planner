
  const subContainer = $('.sub-container');
  const currentDay = $('#currentDay')
  const formattedDate = dateFns.format(new Date(), 'MMMM/DD/YYYY')
  currentDay.text(formattedDate)
 
  const result = dateFns.isFuture(new Date())

  let todayRightNow = new Date(),
  msSinceMidnight = todayRightNow.getTime() - todayRightNow.setHours(0,0,0,0);

  // military time will be used as a starting point from which to format the time format desired
  const militaryHour = msSinceMidnight / 3600000;

  let startingTime = 9;

  // object with which to format saved notes in local storage
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

// Dynamically creates 9 rows for each hour in the work day using the object literal method
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
    // appends rows to container 
    subContainer.append(rowHTML)
    // variable for button created set equal to each individual button
    let buttonId = $(`#button-${i}`)
    let newNote = $(`row-${i}`).value
    buttonId.on("click", saveNote(i, newNote))
  }

  // this function takes in each time slot, and appends AM or PM respectively
  function formatTime (startingTime, i) {
    const newTime = startingTime + i;
    if (newTime <= 11) {
      return `${newTime}:00AM`;
    } else if (newTime > 11) {
      return `${militaryToStandard(newTime)}:00PM`;
    }
  }

  // used within the function above, takes military time and converts to standard
  function militaryToStandard (newTime) {
    if (newTime > 12) {
      return newTime - 12
    } else if (newTime = 12) {
      return newTime
    }
  }

  // this function checks to see if each individual row is in the past, present, or future and assigns classes accordingly
function getColorCode (currentHour, rowHour) {
  if (currentHour > rowHour) {
    return "past"
  } else if (currentHour < rowHour) {
    return "future"
  } else if (Math.floor(currentHour) === rowHour) {
    return "present"
  }
    
}

// this function creates military time as a starting point
function getMilitaryTime (startingTime, i) {
  const newTime = startingTime + i;
  return newTime
}

// this function sets up variables to be used for local storage
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