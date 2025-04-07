package com.inv.invsee.commands;

import com.google.common.base.Splitter;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.inv.invsee.inventories.mc.PlayerHandler;
import com.inv.invsee.socket.SocketIOClient;
import com.mojang.brigadier.CommandDispatcher;
import com.mojang.brigadier.context.CommandContext;
import io.socket.client.Socket;
import net.minecraft.commands.CommandSourceStack;
import net.minecraft.commands.Commands;
import net.minecraft.core.BlockPos;
import net.minecraft.network.chat.Component;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.phys.Vec3;

import java.io.*;
import java.net.*;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public class BruhCommand {
    public static void register(CommandDispatcher<CommandSourceStack> dispatcher){
        dispatcher.register(Commands.literal("inventory").then(Commands.literal("me").executes((command) -> {
            ItemStack item = command.getSource().getPlayer().getMainHandItem();

            command.getSource().getPlayer().sendSystemMessage(Component.literal(item.serializeNBT().toString()));
            return 1;
        })));
        dispatcher.register(Commands.literal("share").executes((command) -> {

            Player player = command.getSource().getPlayer();

            JsonObject item_data = PlayerHandler.getItemInMainHand(player);

            Socket socket = SocketIOClient.Socket();

            JsonObject data = new JsonObject();

            data.add("item_data", item_data);
            data.addProperty("uuid", player.getUUID().toString());
            data.addProperty("type", "share_item");
            data.addProperty("user_name", player.getDisplayName().getString());

            socket.emit("send_inv", data);

            return 1;
        }));


    }

    private static int all(CommandContext<CommandSourceStack> command) throws IOException {
        if(command.getSource().getEntity() instanceof Player){
            Player player = (Player) command.getSource().getEntity();
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
            player.sendSystemMessage(Component.literal("Wysłano dane o graczu do serwera"));

            sendAsyncData(String.valueOf(player_data));

        }
        return 1;
    }

    // Method to get the block's inventory that the player is looking at
    private static int chest_data(CommandContext<CommandSourceStack> command) {
        //RAY END POINT - TO WHERE IT WILL TRAVEL TO
        var rayLength = 100;
        Vec3 playerRotation = command.getSource().getPlayer().getViewVector(0);
        Vec3 rayPath = playerRotation.scale(rayLength);

        Player player = command.getSource().getPlayer();
        var world = player.level;

        Vec3 from = command.getSource().getPlayer().getEyePosition(0);
        Vec3 to = from.add(rayPath);

        Block block = world.getBlockState(new BlockPos(from.x - 2, from.y - 2, from.z)).getBlock();

        System.out.println(block.getName());
        System.out.println(from);

        return 1;


    }
    public static void sendAsyncData(String data) {
        CompletableFuture.runAsync(() -> {
            try {
                try {
                    String url = "http://localhost:8001/print_data";

                    URL obj = new URL(url);

                    HttpURLConnection con = (HttpURLConnection) obj.openConnection();

                    con.setRequestMethod("POST");

                    con.setRequestProperty("Content-Type", "application/json");
                    con.setRequestProperty("User-Agent", "Mozilla/5.0");

                    con.setDoOutput(true);

                    try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                        wr.writeBytes(data);
                        wr.flush();
                    }

                    int responseCode = con.getResponseCode();
                    System.out.println("Response Code: " + responseCode);
                    con.disconnect();

                    try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
                        String inputLine;
                        StringBuilder response = new StringBuilder();

                        while ((inputLine = in.readLine()) != null) {
                            response.append(inputLine);
                        }

                        System.out.println("Response: " + response.toString());

                    }

                } catch (IOException e) {
                    e.printStackTrace();
                }
                Thread.sleep(5000);

            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}


