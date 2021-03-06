
'use strict';

goog.provide('Blockly.Arduino.servo');

goog.require('Blockly.Arduino');

function servoSetup(pin) {
    Blockly.Arduino.libraries_['define_servo'] = '#include <Servo.h>\n';
    Blockly.Arduino.libraries_['var_servo' + pin] = 'Servo servo_' + pin + ';\n';
    Blockly.Arduino.setupCode_['setup_servo_' + pin] = '\tservo_' + pin + '.attach(' + pin + ');\n';

}

Blockly.Arduino['servo_move'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var degrees = Blockly.Arduino.valueToCode(block, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
    servoSetup(pin);

    return 'servo_' + pin + '.write(' + degrees + ');\n';
};

Blockly.Arduino['servo_read_degrees'] = function (block) {
    var pin = block.getFieldValue('PIN');

    servoSetup(pin);
    return ['servo_' + pin + '.read()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['servo_move_adafruit_tico'] = function (block) {
    var pin = block.getFieldValue('PIN');
    var degree = Blockly.Arduino.valueToCode(block, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.libraries_['servo_move_adafruit_'] = '#include <Adafruit_TiCoServo.h>\n';
    Blockly.Arduino.libraries_['var_servo_adafruit_' + pin]
        = 'Adafruit_TiCoServo servo_adafruit' + pin + ';\n';
    Blockly.Arduino.setupCode_['setup_servo_adafruit' + pin] =
        '\tservo_adafruit' + pin + '.attach(' + pin + ');\n';

    return 'servo_adafruit' + pin + '.write(' + degree + ');\n';
};