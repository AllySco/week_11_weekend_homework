var app = function(){
  var url2 = "http://api.highcharts.com/highcharts";
  var url = "http://nflarrest.com/api/v1/team";
  var request2 = new XMLHttpRequest();
  var request = new XMLHttpRequest();
  request.open( "GET", url );
  request2.open( "GET", url2 );

  request.addEventListener( "load", function() {
    handleData( request.responseText );
  });
    loadChart();
  request.send();
  loadFromStorage();
}

var findTeamByAcronym = function( value, teams ) {
  for (team of teams ) {
    if ( team.Team == value ) {
      return team;
    }
  }  
}

var handleData = function( teams ) {
  teams = JSON.parse( teams );
  createTeamDropdown( teams );
  populateTeamDropdown( teams );
}

var createTeamDropdown = function( teams ) {
  var dropdown = document.createElement( "select" );
  var option = document.createElement( "option" );
  option.text = "Choose a team";
  dropdown.options.add( option );
  option.disabled = true;
  option.selected = true;

  dropdown.addEventListener( "change", function(event) {
    var value = event.target.selectedOptions[0].value;
    var team = findTeamByAcronym( value, teams );
    createTeam( team );
    saveTeam( team );
  })
  var div = document.querySelector( "#select");
  append( div, dropdown )
}

var append = function() {
  for ( var i = 0; i < arguments.length - 1; i++ ) {
    arguments[i].appendChild( arguments[i + 1] );
  }
}

var populateTeamDropdown = function( teams ) {
  var select = document.querySelector( "select" )
  for ( team of teams ) {
    var option = document.createElement( "option" );
    option.value = team.Team;
    option.text = team.Team;
    select.options.add( option );
  }
}

var createTeam = function( team ) {
  var list = document.createElement( "dl" );
  var fullName = document.createElement( "dt" );
  var division = document.createElement( "dd" );
  var arrests = document.createElement( "dd" );
  var teamDiv = document.querySelector( "#team" );

  fullName.innerText = team.Team_preffered_name;
  fullName.className = "name";


  division.innerText = team.Team_Conference_Division;
  arrests.innerText = team.arrest_count;

  append( fullName, division );
  append( fullName, arrests );
  append( list, fullName );
  teamDiv.insertBefore(list, teamDiv.childNodes[0] );
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

var loadChart = function() {
  var teamData = [
  {
    name: team.Team_preffered_name,
    data: team.arrest_count
  }
  ]
  var teamNames = [team.Team_preffered_name
  ]
  new ColumnChart( 'NFL Arrests', teamData, teamNames );
}

window.addEventListener('load', app);