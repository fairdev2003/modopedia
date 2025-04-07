package com.inv.invsee.utils;

import com.google.gson.JsonObject;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.world.item.ItemStack;

public class ItemInfo {

    public static JsonObject NBTHandler(ItemStack item) {

        CompoundTag compound = item.getOrCreateTag();
        System.out.println(compound);

        JsonObject object = new JsonObject();

        for (var o : compound.getAllKeys()) {
            if (o.equals("Modifier")) {
                object.addProperty("Modifier", compound.getString("Modifier"));
            }
            if (o.equals("mana")) {
                object.addProperty("mana", compound.getInt("mana"));
            }
            if (o.equals("internalCurrentPower")) {
                object.addProperty("internalCurrentPower", compound.getDouble("internalCurrentPower"));
            }
            if (o.equals("Blood")) {
                object.addProperty("Blood", compound.getInt("Blood"));
            }
            if (o.equals("Energy")) {
                object.addProperty("Energy", compound.getInt("Energy"));
            }



        }

        return object;
    }

}
