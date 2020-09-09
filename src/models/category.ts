/**
 * Define the model for a category, a category will have two properties, a name, and a theme colour
 */

class CategoryModel {
    protected name: String;
    protected themeColour: String;

    constructor(name: String, themeColour: String) {
        this.name = name;
        this.themeColour = themeColour;
    }
}

export default CategoryModel