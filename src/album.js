export class Album
{
    constructor(id, title, artist, year, rating)
    {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.rating = rating;
        if(this.rating === null)
            this.rating = 'No rating yet!';
    }
}