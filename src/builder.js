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

    newAlbumForm(host)
    {
            const form = document.createElement("div");

            form.id = "form";
            host.appendChild(form);

            const title = document.createElement("input");
            title.id = "titleInp";
            title.placeholder = "Title";
            form.appendChild(title);

            const artist = document.createElement("input");
            artist.id = "artistInp";
            artist.placeholder = "Artist";
            form.appendChild(artist);

            const year = document.createElement("input");
            year.type = "number";
            year.min = 1900;
            year.id = "yearInp";
            year.placeholder = "Year";
            form.appendChild(year);

            const rating = document.createElement("input");
            rating.type = "number";
            rating.min = 1;
            rating.max = 10;
            rating.id = "ratingInp";
            rating.placeholder = "Rating";
            form.appendChild(rating);

            const tags = document.createElement("textarea");
            tags.id = "tagsInp";
            tags.placeholder = "Tags";
            form.appendChild(tags);

            const submit = document.createElement("button");
            submit.id = "submit";
            submit.innerHTML = "Submit";
            form.appendChild(submit);

            form.style.display = "none";
    }

    newAlbumHandlers()
    {
        var form = document.getElementById("form");
        const newAlbumButtons = document.getElementsByClassName("newAlbum");
        Array.from(newAlbumButtons).forEach(element => {
            element.onclick = (ev) => { form.style.display = "flex"; }
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