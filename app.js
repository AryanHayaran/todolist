    const express = require("express");
    const bodyParser = require("body-parser");
    // const date = require("./views/date.js");
    const mongoose = require("mongoose");
    const _ = require("lodash");
    const app = express();
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb+srv://admin:hayaran@cluster0.wnhjcxp.mongodb.net/todolist-DB", { useNewUrlParser: true });
    // mongoose.connect("mongodb://127.0.0.1:27017/todolist-DB");

    // const ItemSchema = { name: String };
    const ItemSchema = new mongoose.Schema({
        name: String
    });
    const Item = mongoose.model("Item", ItemSchema);
    const buy = new Item({ name: "buy" });
    const cook = new Item({ name: "cook" });
    const eat = new Item({ name: "eat" });
    const ListSchema = {
        name: "String",
        items: [ItemSchema]
    };
    const List = mongoose.model("List", ListSchema);
    const defaultItem = [buy, cook, eat];
    // console.log(Item.find({}));
    app.use(express.static("public"));
    const workItems = [];

    app.get("/", function(req, res) {
        Item.find({}, function(err, foundItems) {
            // console.log(foundItems);
            if (foundItems.length === 0) {
                Item.insertMany(
                    defaultItem,
                    function(err) {
                        if (err) console.log(err);
                        else console.log("successful");
                    });
            }
            res.render("list", {
                listTitle: "Today",
                newListItem: foundItems
            });

        });

    });
    app.get("/:customList", function(req, res) {
        // console.log(req.params.customList);
        const cusname = _.capitalize(req.params.customList);

        List.findOne({ name: cusname }, function(err, founditem) {
            if (!err) {
                if (!founditem) {
                    const list = new List({ name: cusname, items: defaultItem });
                    list.save();
                    res.redirect("/" + cusname);
                } else {
                    res.render("list", {
                        listTitle: founditem.name,
                        newListItem: founditem.items
                    });
                }

            }
        });
    });

    app.post("/delete", function(req, res) {
        // console.log(req.body.checkbox);
        const deleteitem = req.body.checkbox;
        const titlename = req.body.TitleName;
        if (titlename === "Today") {
            Item.deleteOne({ _id: deleteitem }, function(err) {
                if (err) console.log(err);
                else console.log("successful");
            });
            res.redirect("/");
        } else {
            List.findOneAndUpdate({ name: titlename }, {
                $pull: {
                    items: { _id: deleteitem }
                }
            }, function(err, founditem) {
                if (!err) {
                    res.redirect("/" + titlename);
                }
            });
        }

    });
    app.post("/", function(req, res) {
        const item = req.body.newItem;
        const titleName = req.body.list;

        // console.log(req.body);
        const item1 = new Item({
            name: item
        });
        if (req.body.list === "Today") {
            item1.save();
            res.redirect("/");
        } else {

            List.findOne({ name: titleName }, function(err, founditem) {
                founditem.items.push(item1);
                founditem.save();
            });
            res.redirect("/" + titleName);
        }

    });
    app.listen(3000, function() {
        console.log("server is running on port 3000");
    });