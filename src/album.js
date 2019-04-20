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
        cover.className = "albumCoverTable";
        cover.src = this.cover;
        cover.alt = this.artist + " - " + this.title;
        albumData.appendChild(cover);

        albumData = document.createElement("td");
        albumContainer.appendChild(albumData);
        const title = document.createElement("label");
        title.className = "albumContentTable";
        title.innerHTML = this.title;
        albumData.appendChild(title);

        albumData = document.createElement("td");
        albumContainer.appendChild(albumData);
        const artist = document.createElement("label");
        artist.className = "albumContentTable";
        artist.innerHTML = this.artist;
        albumData.appendChild(artist);

        albumData = document.createElement("td");
        albumContainer.appendChild(albumData);
        const year = document.createElement("label");
        year.className = "albumContentTable";
        year.innerHTML = this.year;
        albumData.appendChild(year);
    }
}