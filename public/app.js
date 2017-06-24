var app = function() {
  var url = "http://nflarrest.com/api/v1/team";
  var request = new XMLHttpRequest();
  request.open( "GET", url );

  request.addEventListener( "load", function() {
    handleData(request.responseText );
  console.log( this.responseText )
  });
  request.send();
  loadFromStorage();
}

var findTeambyTeamAcronym = function( value, teams ) {
  for ( team of teams ) {
    if ( team.Team == value ) {
      return team;
    }
  }
}

var handleData = function( teams ) {
  team = JSON.parse( teams )
  createDropdown( teams );
  populateDropdown( teams );
}

var createDropdown = function( teams ) {
  var dropdown = document.createElement( "select" );
  var option = document.createElement( "option" );
  option.text = "Select a team";
  dropdown.options.add( option );

  option.disabled = true;
  option.selected = true;

  dropdown.addEventListener( "change", function( event ) {
    var value = event.target.selectedOptions[0].value;
    var team = findTeambyTeamAcronym( value, teams );
    createTeam( team );
    saveTeam( team );
  })
  var div = document.querySelector( "#select" );
  append( div, dropdown );
}

var append = function() {
  for ( var i = 0; i < arguments.length - 1; i++ ) {
    arguments[i].appendChild( arguments[i + 1] );
  }
}

populateDropdown = function( teams ) {
  var select = document.querySelector( "select" );
  for ( team of teams ) {
    var option = document.createElement( "option" );
    option.value = team.Team;
    option.text = team.Team_preffered_name;
    select.options.add( option );
  } 
}

var createTeam = function( team ) {
  var list = document.createElement( "ul" );
  var city = document.createElement( "li" );
  var name = document.createElement( "li" );
  var conference = document.createElement( "li" );
  var division = document.createElement( "li" );
  var arrests = document.createElement( "li" );
  var teamDiv = document.querySelector( "#team" );

  city.innerText = "City: " + team.Team_city;
  name.innerText = "Team name: " + team.Team_name;
  conference.innerText = "Conference: " + team.Team_Conference;
  division.innerText = "Division: " + team.Team_Conference_Division;
  arrests.innerText = "Arrests: " + team.arrest_count;

  apppend( list, arrests );
  apppend( list, division );
  apppend( list, conference );
  apppend( list, name );
  apppend( list, city );
  if ( teamDiv.childElementCount > 0 ){
    teamDiv.insertBefore(list, teamDiv.childNodes[0] );
  } else {
    append( teamDiv, list );
  }
}

var saveTeam = function( team ) {
  var teamString = JSON.stringify( team );
  localStorage.setItem( "team", teamString );
}

var loadFromStorage = function() {
  if ( localStorage.team ) {
    var stringTeam = localStorage.team;
    if ( stringTeam ) {
      var team = JSON.parse(localStorage.team);
      createTeam( team );
    }
  }
}



window.addEventListener('load', app);