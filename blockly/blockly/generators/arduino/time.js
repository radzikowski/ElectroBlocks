'use strict';

goog.provide('Blockly.Arduino.time');

goog.require('Blockly.Arduino');

Blockly.Arduino['time_seconds'] = function(block) {
    Blockly.Arduino.functionNames_['secondsArduinoBeenOn'] = 'double secondsArduinoBeenOn() {\n' + '\treturn millis() / 1000;\n'
    + '}\n';

    return ['secondsArduinoBeenOn()', Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['delay_block'] = function(block) {
    var delay = Blockly.Arduino.valueToCode(block, 'DELAY', Blockly.Arduino.ORDER_ATOMIC) || 1;
    delay = Math.ceil(Math.abs(delay) * 1000);

    return 'delay(' + delay + ');\n';
};