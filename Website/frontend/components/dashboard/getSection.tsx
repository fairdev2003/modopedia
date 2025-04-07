import AccountSettings from "./sections/AccountSettings";
import Users from "./sections/Users";
import Tags from "./sections/Tags";
import Items from "./sections/Items";
import Mods from "./sections/Mods";
import Overview from "./sections/Overview";
import CraftingSection from "./sections/CraftingSection";
import Workspace from "./sections/Workspace";

interface SectionProps {
  section: any;
}

export default function GetSection({ section }: SectionProps) {
  return (
    <section>
      {section === "overview" ? <Overview /> : null}
      {section === "mods" ? <Mods /> : null}
      {section === "items" ? <Items /> : null}
      {section === "tags" ? <Tags /> : null}
      {section === "allies" ? <Users /> : null}
      {section === "account-settings" ? <AccountSettings /> : null}
      {section === "crafting" ? <CraftingSection /> : null}
      {section === "workspace" ? <Workspace /> : null}
    </section>
  );
}
