package com.inv.invsee.events;

import com.inv.invsee.InvSee;
import com.inv.invsee.commands.BruhCommand;
import net.minecraftforge.event.RegisterCommandsEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;

@Mod.EventBusSubscriber(modid = InvSee.MODID)
public class ModEventListener {

    @SubscribeEvent
    public static void registerCommands(RegisterCommandsEvent event) {
        BruhCommand.register(event.getDispatcher());
    }
}
