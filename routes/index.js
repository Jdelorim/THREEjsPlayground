module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index", {title: "TRASHTRASH"});
    });
    app.get("/1", (req, res) => {
        res.render("simpleVr", {title: "TRASHTRASH VR"});
    });
}