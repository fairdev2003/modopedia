package com.inv.invsee.commands;

import com.google.common.base.Splitter;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;

import java.util.List;

public class CommandFunction {
    public Object GetPlayerData(Player player) {
        JsonArray array = new JsonArray();

        JsonObject player_data = new JsonObject();

        JsonArray inventory = new JsonArray();

        for (ItemStack stack : player.getInventory().items) {
            if (!stack.isEmpty()) {


                JsonObject one_item = new JsonObject();

                List<String> pieces = Splitter.on(".").splitToList(stack.getDescriptionId());

                one_item.addProperty("tag_name", (pieces.get(1) + ":" + pieces.get(2)));
                one_item.addProperty("count", stack.getCount());
                one_item.addProperty("Name", stack.getDisplayName().getString());
                if (stack.isDamageableItem()) {
                    one_item.addProperty("durability", stack.getMaxDamage() - stack.getDamageValue());
                    one_item.addProperty("max_durability", stack.getMaxDamage());
                }


                inventory.add(one_item);
            }

            player_data.addProperty("player_name", player.getName().getString());
            player_data.addProperty("uuid", player.getUUID().toString());
            player_data.addProperty("health", player.getHealth());
            player_data.add("inventory", inventory);


        }
        return (player_data.toString());
    }
}
