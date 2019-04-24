export class Builder
{
    constructor()
    {
        this.noResults(false);
    }

    noResults(choice)
    {
        const noResults = document.getElementById("noResults");
        const table = document.getElementById("searchResults");
        if(choice === true)
        {
            noResults.className = "";
            table.innerHTML = "";
        }
        else
            noResults.className = "hide";
    }

    drawTable(arrayOfAlbums)
    {
        this.noResults(false);
        const tableHeadHTML = "<thead><tr><th></th><th>Title</th><th>Artist</th><th>Year</th><th>Rating</th></thead>";
        const table = document.getElementById("searchResults");
        if(table.innerHTML !== tableHeadHTML)
            table.innerHTML = tableHeadHTML;
        arrayOfAlbums.forEach(element  => {
            element.drawAlbumTable(table);
        });
    }

    newAlbumHandlers()
    {
        const newAlbumButtons = document.getElementsByClassName("newAlbum");
        Array.from(newAlbumButtons).forEach(element => {
            element.onclick = (ev) => window.open("./newalbum.html", 'New Album Entry', 'height=500,width=400' ).focus();
        });
    }

    randomAlbum(host)
    {
        const albumContainer = document.createElement("div");
        albumContainer.id = "randomAlbum";
        host.appendChild(albumContainer);
    }

    updateRandomAlbum(album)
    {
        const randomAlbumContainer = document.getElementById("randomAlbumContainer");
        var albumContainer = document.getElementById("randomAlbum");
        if(albumContainer == null)
        {
            this.randomAlbum(randomAlbumContainer);
            albumContainer = document.getElementById("randomAlbum");
        }
        album.drawAlbum(albumContainer);
    }

    numberOfAlbums(host)
    {
        const numberContainer = document.createElement("div");
        numberContainer.className = "numberContainer";
        host.appendChild(numberContainer);
        let label = document.createElement("label");
        label.innerHTML = "Number of albums in database: ";
        numberContainer.appendChild(label);
        label = document.createElement("h2");
        label.id = "numberOfAlbums";
        numberContainer.appendChild(label);
    }

    updateNumberOfAlbums(number)
    {
        const container = document.getElementById("sub");
        var numberOfAlbums = document.getElementById("numberOfAlbums");
        if(numberOfAlbums == null)
        {
            this.numberOfAlbums(container);
            var numberOfAlbums = document.getElementById("numberOfAlbums");
        }

        numberOfAlbums.innerHTML = number;
    }

    /* drawTimeSpent()
    {

    } */
}