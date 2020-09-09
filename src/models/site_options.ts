/**
 * Define the model for site options, this will have two properties, a key and a value so site
 * options can be stored in the database and are not hardcoded into the application
 */
class SiteOptions {
    protected key: String;
    public value: String;

    constructor(key: String, value: String) {
        this.key = key;
        this.value = value;
    }
}

export default SiteOptions