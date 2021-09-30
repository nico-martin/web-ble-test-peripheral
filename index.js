process.env["BLENO_DEVICE_NAME"] = "Web BLE Test";

const bleno = require("bleno");
const characteristic = require("./characteristic");

const bluetoothService = async () => {
  const service = {
    uuid: "ff0a",
    characteristics: [
      characteristic("ff0b"),
      characteristic("ff0c"),
      characteristic("ff0d"),
      characteristic("ff0e"),
    ],
  };

  bleno.on("stateChange", (state) => {
    if (state === "poweredOn") {
      bleno.startAdvertising("Web BLE Test", [service.uuid]);
    } else {
      bleno.stopAdvertising();
    }
  });

  bleno.on("advertisingStart", (err) => {
    if (err) {
      console.log("advertisingStart error", err);
      return;
    }

    bleno.setServices([service]);
  });

  bleno.on("disconnect", () => {
    console.log("disconnected from client");
  });
};

bluetoothService();
