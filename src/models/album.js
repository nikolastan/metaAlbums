export class Album
{
    constructor(id, title, artist, year, rating, cover)
    {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.rating = rating;
        if(this.rating === null)
            this.rating = 'No rating yet!';
        this.cover = cover;
    }

    drawAlbumTable(host)
    {
        if(!host)
            throw new Error("Invalid host for appending!");
        const albumContainer = document.createElement("tr");
        albumContainer.className = "albumContainerTable";
        host.appendChild(albumContainer);

        let albumData = document.createElement("td");
        albumContainer.appendChild(albumData);
        const cover = document.createElement("img");
        cover.className = "albumCover";
        cover.src = this.cover;
        cover.alt = this.artist + " - " + this.title;
        albumData.appendChild(cover);

        albumData = document.createElement("td");
        albumContainer.appendChild(albumData);
        albumData.innerHTML = this.title;

        albumData = document.createElement("td");
        albumContainer.appendChild(albumData);
        albumData.innerHTML = this.artist;

        albumData = document.createElement("td");
        albumContainer.appendChild(albumData);
        albumData.innerHTML = this.year;

        albumData = document.createElement("td");
        albumContainer.appendChild(albumData);
        albumData.innerHTML = this.rating;
    }

    drawAlbum(host)
    {
        if(!host)
            throw new Error("Invalid host for appending!");
        const cover = document.createElement("img");
        cover.className = "albumCover";
        cover.src = this.cover;
        cover.alt = this.artist + " - " + this.title;
        host.appendChild(cover);
        const albumData = document.createElement("div");
        albumData.className = "albumData";
        host.appendChild(albumData);

        var title = document.createElement("label");
        albumData.appendChild(title);
        title.innerHTML = this.title;

        var artist = document.createElement("label");
        albumData.appendChild(artist);
        artist.innerHTML = this.artist;

        var year = document.createElement("label");
        albumData.appendChild(year);
        year.innerHTML = this.year;

        var rating = document.createElement("label");
        albumData.appendChild(rating);
        rating.innerHTML = this.rating;
    }
}