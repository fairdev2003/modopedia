import mongoose from "mongoose";

const CraftingSchema = new mongoose.Schema({
  final_product: {
    type: String,
    required: true,
  },
  crafting_items: {
    type: Array,
    required: true,
  },
});

const WeaponType = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  damage: {
    type: Number,
    required: true,
  },
  attack_speed: {
    type: Number,
    required: true,
  },
  durability: {
    type: Number,
    required: true,
  },
  range: {
    type: Number,
    required: true,
  },
  special_effects: {
    type: Array,
    required: false,
  },
});

const ArmorType = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  armor: {
    type: Number,
    required: true,
  },
  durability: {
    type: Number,
    required: true,
  },
  special_effects: {
    type: Array,
    required: false,
  },
});

const ToolType = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  durability: {
    type: Number,
    required: true,
  },
  special_effects: {
    type: Array,
    required: false,
  },
  mining_speed: {
    type: Number,
    required: false,
  },
});

const BlockType = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  hardness: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  special_effects: {
    type: Array,
    required: false,
  },
});

const BasicInfo = new mongoose.Schema({
  stack_size: {
    type: Number,
    required: true,
  },
  item_type: {
    type: WeaponType || ArmorType || ToolType || BlockType,
    required: false,
  },
  categories: {
    type: Array,
    required: false,
  },
});

const ItemSchema = new mongoose.Schema(
  {
    item_name: {
      type: String,
      required: true,
    },
    item_tag: {
      type: String,
      required: true,
    },
    mod_tag: {
      type: String,
      required: true,
    },
    crafting: {
      type: Array,
      required: false,
    },
    created_by: {
      type: String,
      required: true,
    },
    user_thumbs: {
      type: Array,
      required: false,
    },
    likes: {
      type: Number,
      required: false,
    },
    dislikes: {
      type: Number,
      required: false,
    },
    comments: {
      type: Array,
      required: false,
    },
    short_description: {
      type: String,
      required: false,
    },
    wiki_elements: {
      type: Array,
      required: false,
    },
    external_links: {
      type: Array,
      required: false,
    },
    tutorials: {
      type: Array,
      required: false,
    },
    images: {
      type: Array,
      required: false,
    },
    updates: {
      type: Array,
      required: false,
    },
    basic_info: {
      type: BasicInfo,
      required: false,
    },
  },
  { timestamps: true, id: true },
);

const Item = mongoose.models.Test || mongoose.model("Test", ItemSchema);

export default Item;
