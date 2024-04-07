function findCountries(e){
    e.preventDefault();
    
    // get the value from the country name input
    let countryName = document.getElementById('countryInput')?.value;
    
    // build the url for the api request
    const url = `https://restcountries.com/v3.1/name/${countryName}`
    
    // Make the HTTP get request to the above url and log the data
    fetch(url)
        .then( res => res.json() )
        .then( data => displayCountry(data) )
        .catch( err => console.error(err) )
        
}

const searchButton = document.getElementById('countrySearch');
searchButton.addEventListener('click', findCountries);

// Callback function for findCountry that will accept country data and insert into the display table
function displayCountry(data){
    console.log(data)
    // Get the table from the HTML
    let table = document.getElementById('country-table');
    

    // Clear out the table of any current data
    table.innerHTML = '';

    if (!data.length){
        table.innerHTML = '<h1>No Country Info Here</h1>'
        return
    }

    // Set up table headers
    const thead = document.createElement('thead');
    table.append(thead); // Add the thead as a child to the table
    let tr = document.createElement('tr');
    thead.append(tr); // add the table row as a child the table header
    const tableHeadings = ['Flag', 'Language 1','Language 2', 'Language 3', 'Capital', 'Currency'];
    tableHeadings.forEach( heading => {
        let th = document.createElement('th');
        // `th.scope` is assigned the string 'col'. This attribute specifies that all cells in the column should be a header for a group of cells. This effectively marks the `th` element as a column header within the HTML table structure.
        th.scope = 'col';
        th.innerHTML = heading;
        tr.append(th)
    } );

    // Create the table body and populate with country data
    let tbody = document.createElement('tbody');
    table.append(tbody);

    // Write a row for each countries in data
    for (let country of data){
        let tr = document.createElement('tr');
        tbody.append(tr);

        newDataCell(tr, country.flag);
        
        const languageValue = Object.values(country.languages)
//        for (l in languageValue){
//            
//            const language = languageValue[l];
//            newDataCell(tr, language)
//        }
        newDataCell(tr, languageValue[0])
        newDataCell(tr, languageValue[1])
        newDataCell(tr, languageValue[2])
        newDataCell(tr, country.capital);
        
        const moneyValue = Object.values(country.currencies)
        const money = moneyValue[0].name
        
        newDataCell(tr, money);
    }
}

// Helper Function for creating a new data cell for a table row
function newDataCell(tr, value){
    let td = document.createElement('td');
    td.innerHTML = value ?? '-'
    tr.append(td)
}
