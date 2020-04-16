$( "#accordion" ).accordion({
  collapsible: true,
  heightStyle: "fill"
});

function slide(n) {
  if(n === 1){
    $('#dot').animate({left: '2px'}, 300);
    $('#content1').show();
    $('#content2').hide();
    $('#content3').hide();
  } else if(n === 2){
    $('#dot').animate({left: '40px'}, 300);
    $('#content1').hide();
    $('#content2').show();
    $('#content3').hide();
  } else{
    $('#dot').animate({left: '77.5px'}, 300);
    $('#content1').hide();
    $('#content2').hide();
    $('#content3').show();
  }
  
}

let cafeArray = [];
let hallArray = [];
let clubArray = [];

let getRequest = $.get('https://blmak.github.io/BigMusicClubConclomerateDates.json', function(data, status) {
  if(status === 'success'){
    data.forEach(function(event){
      if(event.venue === "Little Café"){
        cafeArray.push(event);
      } else if(event.venue === "Big Hall"){
        hallArray.push(event);
      } else{
        clubArray.push(event);
      }
    });
    insertEvent(cafeArray, '#cafeEvent', '#event1', '#time1');
    insertEvent(hallArray, '#hallEvent', '#event2', '#time2');
    insertEvent(clubArray, '#clubEvent', '#event3', '#time3');
  
    
  } else {
    console.log('fail');
  }
})

function insertEvent(eventArray, eventDiv, eventName, eventTime) {
  let content = '';
  sortArray(eventArray);
  eventArray.forEach(function(event){
    content += `<div class='eventContent'>
                      <p>Artist: ${event.artist}</p>
                      <p>City: ${event.city} &nbsp; State: ${event.state}</p>
                      <p>Price: ${event.price} &nbsp; Currency: ${event.currency}</p>
                      <p>Date: ${event.date} &nbsp; Show time: ${event.show_time}</p>
                      <a href='#'>Performer's website</a>
                    </div>`;
  })
  
  if(Date.parse(new Date()) > Date.parse(eventArray[eventArray.length - 1].date)){
    $(eventDiv).append(content);
    $(eventDiv).prev().append(' - no upcoming event')
    $(eventName).text('There is no upcoming event right now');
    $(eventTime).html('&nbsp;');
  } else {
    $(eventDiv).append(content);
    $(eventName).text(eventArray[0].artist);
    $(eventTime).text(eventArray[0].date + " " + eventArray[0].show_time);
  }
}

function sortArray(array) {
  array.sort(function(a, b){
    var x = a.date.toLowerCase();
    var y = b.date.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });
}



