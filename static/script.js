

$(document).ready(function() {

  console.log(teams);

  const homeTeam = document.getElementById('home');
  const awayTeam = document.getElementById('away');

  const searchTeams = searchText => {

    // get matches to current text input
    let matches = teams.filter(team => {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return team.match(regex);
    });

    if (searchText === '') {
      matches = [];
    }
    
    // only show top 5 results
    if (matches.length > 5) {
      matches = matches.slice(0,5);
    }
    
    console.log(matches);
    return matches;
  }

  
  // TODO: Merge homeTeams() and awayTeams() into one function.
  const homeTeams = searchText => {
    const matches = searchTeams(searchText);
    if (matches.length > 0) {
      
      const html = matches.map(match =>
        `
        <div class="autoComplete" onclick="home.value = '${match}';homeMatches.innerHTML = '';">
          ${match}
        </div>
        `
        ).join("");

    
      homeMatches.innerHTML = html;
    }
    else {
      homeMatches.innerHTML = '';
    }
  }
  const awayTeams = searchText => {
    const matches = searchTeams(searchText);
    if (matches.length > 0) {
      
      const html = matches.map(match =>
        `
        <div class="autoComplete" onclick="away.value = '${match}';awayMatches.innerHTML = '';">
          ${match}
        </div>
        `
        ).join("");

    
      awayMatches.innerHTML = html;
    }
    else {
      awayMatches.innerHTML = '';
    }
  }

  homeTeam.addEventListener('input', () => homeTeams(homeTeam.value));
  awayTeam.addEventListener('input', () => awayTeams(awayTeam.value));


	$('form').on('submit', function(event) {

		$.ajax({
			data : {
				a : $('#home').val(),
				b : $('#away').val()
			},
			type : 'POST',
			url : '/process'
		})
		.done(function(data) {
      console.log(data);
      $('#para').text(data);
      $('#home_pc').text(Math.round(data[0]*100));
      $('#draw_pc').text(Math.round(data[1]*100));
      $('#away_pc').text(Math.round(data[2]*100));
      $(".results-container").show();

		});

		event.preventDefault();

	});

});

