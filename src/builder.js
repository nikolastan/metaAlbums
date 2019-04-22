const tableHeadHTML = "<thead><tr><th></th><th>Title</th><th>Artist</th><th>Year</th></thead>";
const sub = document.getElementById("sub");

export class Builder
{

    drawTable(arrayOfAlbums)
    {
        sub.style.display = "block";
        const table = document.getElementById("searchResults");
        if(table.innerHTML !== tableHeadHTML)
            table.innerHTML = tableHeadHTML;
        arrayOfAlbums.forEach(element  => {
            //console.log(element);
            element.drawAlbumTable(table);
        });
    }

    noResults()
    {
        sub.style.display = "none";
    }
}