process.env["BLENO_DEVICE_NAME"] = "Web BLE Test";

const bleno = require("bleno");
const characteristic = require("characteristic");

const bluetoothService = async () => {
  const service = {
    uuid: "0xff0a",
    characteristics: [
      characteristic("0xff0b"),
      characteristic("0xff0c"),
      characteristic("0xff0d"),
      characteristic("0xff0e"),
    ],
  };

  bleno.on("stateChange", (state) => {
    if (state === "poweredOn") {
      bleno.startAdvertising("Scroll Hat Matrix", [service.uuid]);
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
