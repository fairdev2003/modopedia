package com.inv.invsee.commands;

import com.google.common.base.Splitter;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.inv.invsee.InvSee;
import com.inv.invsee.inventories.mc.PlayerHandler;
import com.inv.invsee.socket.SocketIOClient;

import io.socket.client.IO;
import io.socket.client.Socket;
import net.minecraft.network.chat.Component;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.client.event.ClientChatEvent;
import net.minecraftforge.client.event.ClientChatReceivedEvent;
import net.minecraftforge.event.ServerChatEvent;
import net.minecraftforge.event.TickEvent;
import net.minecraftforge.event.entity.living.LivingDeathEvent;
import net.minecraftforge.event.entity.player.PlayerEvent;
import net.minecraftforge.event.server.ServerStartingEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.loading.FMLServiceProvider;

import java.net.URI;
import java.util.List;
import java.util.Objects;
import java.util.Timer;
import java.util.TimerTask;

@Mod.EventBusSubscriber(modid = InvSee.MODID)
public class SendInventories {

    private static SocketIOClient socket;

    private static int seconds = 60;

    @SubscribeEvent()
    public static void onPlayerJoin(PlayerEvent.PlayerLoggedInEvent event) {

//        Timer timer = new Timer();
//        timer.schedule(new TimerTask() {
//            @Override
//            public void run() {
//                if (seconds == 0) {
//                    var uuid = event.getEntity().getUUID();
//                    var player = event.getEntity().getServer().getPlayerList().getPlayer(uuid);
//                    socket.emit("send_inv", PlayerHandler.getPlayerInfo(player));
//                    seconds = 60;
//                } else {
//                    seconds = seconds - 1;
//                }
//
//            }
//        }, 0, 1000);


        Socket socket = SocketIOClient.Socket();

        JsonObject join_object = new JsonObject();

        String player_name = event.getEntity().getName().getString();
        String uuid = event.getEntity().getUUID().toString();

        String message = String.format("%s joined the game", player_name);


        join_object.addProperty("user_name", player_name);
        join_object.addProperty("uuid", uuid);
        join_object.addProperty("type", "player_joined");
        join_object.addProperty("message", message);


        socket.emit("send_message", join_object);

    }

    @SubscribeEvent()
    public static void onPlayerLeave(PlayerEvent.PlayerLoggedOutEvent event) {

        SocketIOClient.Connect("http://localhost:3005");
        Socket socket = SocketIOClient.Socket();

        JsonObject left_object = new JsonObject();

        String player_name = event.getEntity().getName().getString();
        String uuid = event.getEntity().getUUID().toString();

        String message = String.format("%s left the game", player_name);


        left_object.addProperty("user_name", player_name);
        left_object.addProperty("uuid", uuid);
        left_object.addProperty("type", "player_left");
        left_object.addProperty("message", message);


        socket.emit("send_message", left_object);

    }

    @SubscribeEvent()
    public static void chatService(ServerChatEvent.Submitted event) {
        System.out.println(event.getMessage());

        Socket socket = SocketIOClient.Socket();

        JsonObject chat_object = new JsonObject();

        String player_name = event.getPlayer().getName().getString();
        String uuid = event.getPlayer().getUUID().toString();
        String message = String.format("%s", event.getMessage().getString());

        chat_object.addProperty("user_name", player_name);
        chat_object.addProperty("uuid", uuid);
        chat_object.addProperty("type", "player_chat");
        chat_object.addProperty("message", message);

        socket.emit("send_message", chat_object);
    }

    @SubscribeEvent()
    public static void onPlayerDeath(LivingDeathEvent event) {
        if (event.getEntity() instanceof Player player) {
            Socket socket = SocketIOClient.Socket();
            System.out.println("working here");

            String player_name = event.getEntity().getDisplayName().getString();
            String uuid = event.getEntity().getUUID().toString();
            String source = event.getSource().getLocalizedDeathMessage(event.getEntity()).getString().replace( player_name, player_name);

            JsonObject death_object = new JsonObject();
            death_object.addProperty("user_name", player_name);
            death_object.addProperty("message", source);
            death_object.addProperty("type", "player_death");
            death_object.addProperty("uuid", uuid);

            socket.emit("send_message", death_object);

        }

    }

    /// function i will use
    private static String getData(PlayerEvent event) {
        if (event.getEntity() instanceof Player) {
            Player player = (Player) event.getEntity();
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

            return player_data.toString();
    }
        return null;
    }

    /// klamra sie tu konczy
}
