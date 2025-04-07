package com.inv.invsee.events;

import appeng.api.networking.GridHelper;
import appeng.api.networking.GridServices;
import appeng.api.networking.IGridNode;
import com.google.common.base.Splitter;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.inv.invsee.InvSee;
import com.inv.invsee.inventories.mc.PlayerHandler;
import com.inv.invsee.socket.SocketIOClient;
import com.mojang.blaze3d.platform.InputConstants;
import com.mojang.logging.LogUtils;
import io.socket.client.Socket;
import net.minecraft.client.KeyMapping;
import net.minecraft.core.BlockPos;
import net.minecraft.core.Direction;
import net.minecraft.network.chat.Component;
import net.minecraft.world.Container;
import net.minecraft.world.entity.animal.Sheep;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.block.entity.ChestBlockEntity;
import net.minecraftforge.event.TickEvent;
import net.minecraftforge.event.entity.living.LivingHurtEvent;
import net.minecraftforge.event.entity.player.PlayerInteractEvent;
import net.minecraftforge.event.server.ServerStartedEvent;
import net.minecraftforge.eventbus.api.EventPriority;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import org.lwjgl.glfw.GLFW;



import javax.security.auth.login.LoginException;
import java.util.EventListener;
import java.util.List;
import org.slf4j.Logger;


@Mod.EventBusSubscriber(modid = InvSee.MODID)
public class events implements EventListener {

    @SubscribeEvent
    public static void LivingHurtEvent(LivingHurtEvent event) {
        if (event.getEntity() instanceof Sheep) {
            if (event.getSource().getEntity() instanceof Player player) {

                var player_info = PlayerHandler.getPlayerInfo(player);

                Socket socket = SocketIOClient.Socket();
                socket.emit("send_inv", player_info);
            }

}}
    private static final Logger LOGGER = LogUtils.getLogger();

    public static int number_of_items_in_inventory = 0;

    public static void onRightClickBlock(PlayerInteractEvent.RightClickBlock event) {
        if (event.getSide().isServer()) {
            number_of_items_in_inventory = 0;
            Player player = event.getEntity();
            Level world = event.getLevel();
            BlockPos pos = event.getPos();

            BlockEntity tileEntity = world.getBlockEntity(pos);


            Socket socket = SocketIOClient.Socket();



            socket.emit("test_message", PlayerHandler.getPlayerInfo(event.getEntity()));


            if (player.isHolding(Items.STICK)) {

                if (tileEntity instanceof Container container && tileEntity != null) {
                    player.sendSystemMessage(Component.literal(tileEntity.getBlockState().getBlock().getName().getString()));

                    System.out.println(container.getItem(0));
                    int container_size = container.getContainerSize();

                    for (int i = 0; i < container.getContainerSize(); i++) {



                        ItemStack stack = container.getItem(i);

                        number_of_items_in_inventory = number_of_items_in_inventory + stack.getCount();
                        String itemName = stack.isEmpty() ? "Empty" : stack.getDisplayName().getString();
                        int count = stack.getCount();
                        if (event.getSide().isServer()) {
                            if (!stack.isEmpty()) {
                                player.sendSystemMessage(Component.literal("Slot " + i + ": " + itemName + " x" + count));
                            }

                        }
                    }
                    player.sendSystemMessage(Component.literal(number_of_items_in_inventory + "/" + container_size * 64));
                } if (tileEntity.getBlockState().getBlock().getDescriptionId().equals("block.ae2.controller")) {
                    IGridNode gridnode = GridHelper.getExposedNode(event.getLevel(), event.getPos(), event.getEntity().getDirection());
                    gridnode.getGrid().getStorageService().getInventory().getAvailableStacks().forEach((item) -> {
                        event.getEntity().sendSystemMessage(Component.literal(item.toString()));
                    });
                    event.getEntity().sendSystemMessage(Component.literal("==============================="));

                }
                if (player.isHolding(Items.WOODEN_HOE)) {
                    player.sendSystemMessage(Component.literal("siuras"));
                }

            }
        }



    }



}



