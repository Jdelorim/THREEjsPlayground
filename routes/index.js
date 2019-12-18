module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index", {title: "TRASHTRASH"});
    });
    app.get("/1", (req, res) => {
        res.render("cubeIteration", {title: "TRASHTRASH 3D"});
    });
    app.get("/2", (req, res) => {
        res.render("simpleVr", {title: "TRASHTRASH VR"});
    });
    app.get("/3", (req, res) => {
        res.render("meshAudio", {title: 'TRASHTRAH'});
    });
}