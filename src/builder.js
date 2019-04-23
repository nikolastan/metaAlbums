export class Builder
{
    constructor()
    {
        this.hideSearchNoResults();
    }

    hideSearch()
    {
        const sub = document.getElementById("sub");
        const noResults = document.getElementById("noResults");
        sub.className = "hide";
        noResults.className = "";
    }

    hideNoResults()
    {
        const sub = document.getElementById("sub");
        const noResults = document.getElementById("noResults");
        sub.className = "";
        noResults.className = "hide";
    }

    hideSearchNoResults()
    {
        const sub = document.getElementById("sub");
        const noResults = document.getElementById("noResults");
        sub.className = "hide";
        noResults.className = "hide";
    }

    drawTable(arrayOfAlbums)
    {
        this.hideNoResults();
        const tableHeadHTML = "<thead><tr><th></th><th>Title</th><th>Artist</th><th>Year</th></thead>";
        const table = document.getElementById("searchResults");
        if(table.innerHTML !== tableHeadHTML)
            table.innerHTML = tableHeadHTML;
        arrayOfAlbums.forEach(element  => {
            element.drawAlbumTable(table);
        });
    }

    noResults()
    {
        const newAlbum = document.getElementById("newAlbum");
        this.hideSearch();
        newAlbum.onclick = (ev) => window.open("./newalbum.html", 'New Album Entry', 'height=500,width=400' ).focus();
    }

    /* drawTimeSpent()
    {

    } */
}