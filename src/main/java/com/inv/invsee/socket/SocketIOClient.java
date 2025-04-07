package com.inv.invsee.socket;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.inv.invsee.inventories.mc.PlayerHandler;
import io.socket.client.IO;
import io.socket.client.Socket;
import net.minecraft.network.chat.Component;
import net.minecraft.world.entity.player.Player;
import net.minecraftforge.server.ServerLifecycleHooks;

public class SocketIOClient {

    private static Socket socket;

    public static void Connect(String serverUrl) {

        try {
            IO.Options options = new IO.Options();
            options.forceNew = true;
            socket = IO.socket(serverUrl, options);

            socket.on(Socket.EVENT_CONNECT_ERROR, args -> System.out.println("Connection error"));

            socket.on(Socket.EVENT_CONNECT, args -> {
                System.out.println("Connected to the Socket.IO server");
            });

            socket.connect();

            socket.on("hello", args -> {
                Player player = ServerLifecycleHooks.getCurrentServer().getPlayerList().getPlayers().get(0);
                String chat_message = args[0].toString();
                player.sendSystemMessage(Component.literal(chat_message));
            });
            socket.on("get_server_info", args -> {
                JsonArray player_list = new JsonArray();
                JsonObject server_info = new JsonObject();

                int count = ServerLifecycleHooks.getCurrentServer().getPlayerList().getPlayerCount();
                int max_players = ServerLifecycleHooks.getCurrentServer().getMaxPlayers();
                double ticks = ServerLifecycleHooks.getCurrentServer().getAverageTickTime();

                server_info.addProperty("count", count);
                server_info.addProperty("max_players", max_players);
                server_info.addProperty("ticks", ticks);

                for (var player : ServerLifecycleHooks.getCurrentServer().getPlayerList().getPlayers()) {
                    player_list.add(PlayerHandler.getPlayerInfo(player));
                }

                server_info.add("players_online", player_list);

                System.out.println(server_info);
                socket.emit("send_server_data", server_info);
                socket.off("get_server_info");
                socket.off("send_server_data");
            });



        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static Socket Socket() {
        return socket;
    }
}
