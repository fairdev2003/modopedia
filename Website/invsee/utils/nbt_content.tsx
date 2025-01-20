"use_client";

export const NbtContent = (mod: string, item_data: any, color: string) => {
  if ("mana" in item_data.nbt_data) {
    return (
      <div>
        <div className="">
          {"mana" in item_data.nbt_data &&
          item_data.display_name.includes("Terra Shatterer") ? (
            <div></div>
          ) : null}

          {item_data.display_name === "Band of Mana" ||
          item_data.display_name === "Greater Band of Mana" ||
          item_data.display_name === "Mana Tablet" ||
          item_data.display_name.includes("Terra Shatterer") ? (
            <div className="mb-5 mt-[5rem]">
              <div>
                <div className="flex gap-2">
                  <p className="text-[2px]" style={{ color: color }}>
                    {Tier_Check(item_data).grade}
                  </p>
                  <p className="text-white text-[2px]"> {" | "} </p>
                  {item_data.nbt_data.mana >= 1000000000 ? (
                    <p className="text-blue-500 text-[2px]">Max</p>
                  ) : (
                    <p className="text-blue-500 text-[2px]">
                      {item_data.nbt_data.mana}/{Tier_Check(item_data).max_mana}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  if ("internalCurrentPower" in item_data.nbt_data) {
    return (
      <div className="text-white">
        {item_data.nbt_data["internalCurrentPower"]}/200000 AE
      </div>
    );
  }
};

const Tier_Check: any = (item_data: any) => {
  if (item_data.display_name.includes("Terra Shatterer")) {
    if (item_data.nbt_data.mana <= 9999) {
      const object = {
        grade: "D",
        max_mana: 10000,
      };

      return object;
    }
    if (item_data.nbt_data.mana <= 999999) {
      const object = {
        grade: "C",
        max_mana: 100000,
      };

      return object;
    }
    if (item_data.nbt_data.mana <= 9999999) {
      const object = {
        grade: "B",
        max_mana: 1000000,
      };

      return object;
    }
    if (item_data.nbt_data.mana <= 99999999) {
      const object = {
        grade: "A",
        max_mana: 10000000,
      };

      return object;
    }
    if (item_data.nbt_data.mana <= 999999999) {
      const object = {
        grade: "S",
        max_mana: 100000000,
      };

      return object;
    }
    if (item_data.nbt_data.mana >= 100000000) {
      const object = {
        grade: "SS",
        max_mana: "Infinity",
      };

      return object;
    }
  }
  if (item_data.display_name === "Band of Mana") {
    const object = {
      grade: "SS",
      max_mana: "500000",
    };

    return object;
  }
  if (item_data.display_name === "Greater Band of Mana") {
    const object = {
      grade: "SS",
      max_mana: "2000000",
    };

    return object;
  }
  if (item_data.display_name === "Mana Tablet") {
    const object = {
      grade: "SS",
      max_mana: "500000",
    };
    return object;
  }
};
