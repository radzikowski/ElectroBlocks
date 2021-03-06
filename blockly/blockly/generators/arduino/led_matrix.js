'use strict';

goog.provide('Blockly.Arduino.led_matrix');

goog.require('Blockly.Arduino');

function setupLedMatrix() {
    Blockly.Arduino.libraries_['define_led_matrix'] = '#include <LedControlMS.h>;\n';
    Blockly.Arduino.libraries_['led_matrix_setup'] = "LedControl lc = LedControl(12,11,10,1);\n";

    Blockly.Arduino.setupCode_['led_matrix'] = "\tlc.shutdown(0,false); \n\tlc.setIntensity(0,8);\n\tlc.clearDisplay(0);\n";
}

Blockly.Arduino['led_matrix_make_draw'] = function(block) {
    setupLedMatrix();

    var code = '\n\t//START CODE TO DRAW BLOCK ' + block.id + '\n';

    for (var i = 1; i <= 8; i += 1) {
        for (var j = 1; j <= 8; j += 1) {
           var lightState = block.getFieldValue(i + ',' + j).toLowerCase();
           code += '\tlc.setLed(0, ' + i + ', ' + j + ', ' + lightState + ');\n';
        }
    }

    code += '\n\t//FINISH CODE TO DRAW BLOCK ' + block.id + '\n'

    return code;
};

Blockly.Arduino['led_matrix_turn_one_on_off'] = function(block) {
    setupLedMatrix();

    var row = parseInt(Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_ATOMIC));
    var column = parseInt(Blockly.Arduino.valueToCode(block, 'COLUMN', Blockly.Arduino.ORDER_ATOMIC));

    column = column > 0 ? (column - 1) : 0;
    row = row > 0 ? (row - 1) : 0;

    var state = block.getFieldValue('STATE') == 'ON' ? 'true' : 'false';

    return '\tlc.setLed(0, ' + row + ', ' + column + ', ' + state + ');\n';
};