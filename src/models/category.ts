/**
 * Define the model for a category, a category will have two properties, a name, and a theme colour
 */

class CategoryModel {
    protected name: String;
    protected themeColour: String;
    protected average: Number;
    private id: Number;
    public progress: Number;

    constructor(name: String, themeColour: String, id: Number, average: Number) {
        this.name = name;
        this.themeColour = themeColour;
        this.id = id;
        this.progress = 0;
        this.average = average;
    }
}

export default CategoryModel