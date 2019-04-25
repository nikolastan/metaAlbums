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

    updateTop10(arrayOfAlbums)
    {
        const top10container = document.getElementById("top10");
        top10container.innerHTML = "";
        const title = document.createElement("h3");
        title.innerHTML = "Top 10 Rated Albums";
        top10container.appendChild(title);
        for(let i=0; i<=arrayOfAlbums.length-1; i++)
        {
            let albumContainer = document.createElement("div");
            albumContainer.className = "albumTop10";
            top10container.appendChild(albumContainer);
            let number = document.createElement("h2");
            number.className = "position";
            number.innerHTML = i+1;
            number.innerHTML += ".";
            albumContainer.appendChild(number);
            arrayOfAlbums[i].drawAlbum(albumContainer);
        }
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

            const cover = document.createElement("input");
            cover.id = "coverInp";
            cover.placeholder = "Link to album cover";
            form.appendChild(cover);

            const submit = document.createElement("button");
            submit.id = "submit";
            submit.innerHTML = "Submit";
            form.appendChild(submit);

            const cancel = document.createElement("button");
            cancel.id = "cancel";
            cancel.innerHTML = "Cancel";
            cancel.onclick = (ev) => { form.style.display = "none"; }
            form.appendChild(cancel);

            form.style.display = "none";
    }

    resetForm()
    {
        const form = document.getElementById("form");
        const titleInp = document.getElementById("titleInp");
        const artistInp = document.getElementById("artistInp");
        const yearInp = document.getElementById("yearInp");
        const ratingInp = document.getElementById("ratingInp");
        const tagsInp = document.getElementById("tagsInp");
        const coverInp = document.getElementById("coverInp");
        const submitBtn = document.getElementById("submit");

        titleInp.value = "";
        artistInp.value = "";
        yearInp.value = "";
        ratingInp.value = "";
        tagsInp.value = "";
        coverInp.value = "";
        submitBtn.disabled = true;

        titleInp.style.backgroundColor = "";
        artistInp.style.backgroundColor = "";
        coverInp.style.backgroundColor = "";

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
        const head = document.createElement("h3");
        head.innerHTML = "Random Album";
        host.appendChild(head);
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
        
        let label = document.createElement("h3");
        label.innerHTML = "Number of albums in database: ";
        numberContainer.appendChild(label);
        label = document.createElement("h2");
        label.id = "numberOfAlbums";
        numberContainer.appendChild(label);
    }

    updateNumberOfAlbums(number, host)
    {
        var numberOfAlbums = document.getElementById("numberOfAlbums");
        if(numberOfAlbums == null)
        {
            this.numberOfAlbums(host);
            var numberOfAlbums = document.getElementById("numberOfAlbums");
        }

        numberOfAlbums.innerHTML = number;
    }
}