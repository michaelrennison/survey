/**
 * Define the model for a category, a category will have two properties, a name, and a theme colour
 */

class CategoryModel {
    protected name: String;
    protected themeColour: String;
    private id: Number;

    constructor(name: String, themeColour: String, id: Number) {
        this.name = name;
        this.themeColour = themeColour;
        this.id = id;
    }
}

export default CategoryModel