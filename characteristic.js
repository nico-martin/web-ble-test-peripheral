const bleno = require("bleno");
const Characteristic = bleno.Characteristic;
const events = require("events");
const em = new events.EventEmitter();

module.exports = (uuid) => {
  let value = new Buffer([0]);
  const UPDATE_EVENT = `VALUE_UPDATE_${uuid}`;

  return new Characteristic({
    uuid,
    properties: ["read", "write", "notify"],
    onReadRequest: (offset, callback) =>
      callback(Characteristic.RESULT_SUCCESS, value),
    onSubscribe: (maxValueSize, updateValueCallback) =>
      em.on(UPDATE_EVENT, (data) => updateValueCallback(data)),
    onWriteRequest: (data, offset, withoutResponse, callback) => {
      em.emit(UPDATE_EVENT, data);
      value = data;
      callback(Characteristic.RESULT_SUCCESS);
    },
  });
};
