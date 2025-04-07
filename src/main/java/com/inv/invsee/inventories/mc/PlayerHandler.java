package com.inv.invsee.inventories.mc;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.inv.invsee.utils.ItemInfo;
import net.minecraft.commands.arguments.NbtTagArgument;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.NbtUtils;
import net.minecraft.network.chat.Component;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import top.theillusivec4.curios.api.CuriosApi;
import com.inv.invsee.utils.ItemInfo;

import javax.swing.plaf.IconUIResource;

public class PlayerHandler {
    public static JsonObject getPlayerInfo(Player player) {

        JsonObject player_info = new JsonObject();
        player_info.addProperty("name", player.getDisplayName().getString());
        player_info.addProperty("uuid", player.getUUID().toString());

        // player inventory method used
        player_info.add("inventory", getPlayerInventory(player));

        return player_info;
    }
    public static int getPlayerInfoCommand(Player player) {

        player.sendSystemMessage(Component.literal(getPlayerInfo(player).toString()));

        return 1;
    }


    public static JsonObject getItemInMainHand(Player player) {
        JsonObject item_data = new JsonObject();
        var entry = player.getMainHandItem();
        JsonArray enchants = new JsonArray();



        var nbt_data = ItemInfo.NBTHandler(entry);

        String rarity = entry.getRarity().toString().toLowerCase();

        item_data.addProperty("display_name", entry.getHoverName().getString());
        item_data.addProperty("amount", entry.getCount());
        item_data.add("nbt_data", nbt_data);
        item_data.addProperty("rarity", rarity);
        item_data.addProperty("category", categoryHandler(entry));
        item_data.addProperty("creative_category", entry.getItem().getItemCategory().getDisplayName().getString());;



        item_data.addProperty("registry_name", entry.getItem().getDescriptionId().replace("block.", "").replace("item.", "").replace(".", "__"));

        if (entry.isDamageableItem()) {
            item_data.addProperty("type", "damageable");

            item_data.addProperty("max_durability", entry.getMaxDamage());
            item_data.addProperty("durability_left", entry.getDamageValue() - entry.getDamageValue());
        } else {
            if (entry.isStackable()) {
                item_data.addProperty("type", "block/item");
            } else {
                item_data.addProperty("type", "other");
            }
        }

        if (entry.isEnchanted()) {
            for (var enchanted_entry : entry.getEnchantmentTags()) {
                enchants.add(enchanted_entry.toString().replace("s}", "}").replace("id", "\"id\"").replace("lvl", "\"lvl\""));
            }
        }

        item_data.add("enchants", enchants);


        return item_data;
    }

    public static JsonArray getPlayerInventory(Player player) {

        JsonArray inventory = new JsonArray();
        JsonArray enchants = new JsonArray();

        for (var entry : player.getInventory().items) {
            JsonObject single_item_data = new JsonObject();

            String nbt_data = entry.getTags().toString();

            single_item_data.addProperty("display_name", new ItemStack(entry.getItem()).getDisplayName().getString());
            single_item_data.addProperty("amount", entry.getCount());

            single_item_data.addProperty("registry_name", entry.getItem().getDescriptionId().replace("block.", "").replace("item.", "").replace(".", "__"));

            player.sendSystemMessage(Component.literal(nbt_data));

            if (entry.isDamageableItem()) {
                single_item_data.addProperty("type", "damageable");

                single_item_data.addProperty("max_durability", entry.getMaxDamage());
                single_item_data.addProperty("durability_left", entry.getDamageValue() - entry.getDamageValue());
            } else {
                if (entry.isStackable()) {
                    single_item_data.addProperty("type", "block/item");
                } else {
                    single_item_data.addProperty("type", "other");
                }
            }

            if (entry.isEnchantable() && entry.isEnchanted()) {
                for (var enchanted_entry : entry.getEnchantmentTags()) {
                    enchants.add(enchanted_entry.toString());
                }
            }

            single_item_data.add("enchants", enchants);
            inventory.add(single_item_data);



        }

        return inventory;
    }

    public static JsonObject getPlayerCuriosSlots(Player player) {

        JsonObject curios = new JsonObject();

        var curios_equipped = CuriosApi.getCuriosHelper().getEquippedCurios(player).cast();
        player.sendSystemMessage(Component.literal(curios_equipped.toString()));

        return curios;
    }

    public static String categoryHandler(ItemStack item) {

        String[] tool_criteria = {"pick", "pickaxe", "axe", "truncator", "paxel", "shatterer", "shovel", "hoe" , "hammer", "tool", "spyglass", "flint and steel", "compass" };
        String[] weapons_criteria = { "bow", "crosbow", "sword", "blade", "dagger" };
        String[] armor_criteria = { "chestplate", "helmet", "leggings", "helmet" };
        String[] tech_mod_criteria = { "Applied Energistics 2" };


        for (String tool : tool_criteria) {
            if (item.getHoverName().toString().toLowerCase().contains(tool.toLowerCase())) {
                return "Tool";
            }
        }
        for (String armor : armor_criteria) {
            if (item.getHoverName().toString().toLowerCase().contains(armor.toLowerCase())) {
                return "Armor";
            }
        }
        for (String weapon : weapons_criteria) {
            if (item.getHoverName().toString().toLowerCase().contains(weapon.toLowerCase())) {
                return "Weapon";
            }
        }
        for (String tech_mod : tech_mod_criteria) {
            if (item.getItem().getItemCategory().getDisplayName().getString().toLowerCase().contains(tech_mod.toLowerCase())) {
                return "Tech";
            }
        }

        return "Other";
    }

}
