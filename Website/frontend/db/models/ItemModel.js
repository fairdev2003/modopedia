import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema(
  {
    item_name: {
      type: String,
      required: true,
    },
    tag_name: {
      type: String,
      required: true,
    },
    item_image: {
      type: String,
      required: true,
    },
    crafting_recipes: {
      type: Array,
      required: false,
    },
    wiki_elements: {
      type: Array,
      required: false,
    },
    mod_tag: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Item = models.ItemSchema;

export default Item;
